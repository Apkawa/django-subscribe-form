'use strict'
import $ from 'cash-dom'
import superagent from 'superagent'
import 'superagent-django-csrf'

const DEFAULT_CONFIG = {
  'form': '.subscribe-form',
}

const currentScript = document.currentScript || (function () {
  var scripts = document.getElementsByTagName('script')
  return scripts[scripts.length - 1]
})()

function getDataAttributes (el) {
  let attrs = {}
  for (let key of el.getAttributeNames()) {
    let match = key.toString().match(/^data-([-\w]+)$/)
    if (match) {
      attrs[match[1]] = el.getAttribute(key)
    }
  }
  return attrs
}

function getScriptConfig (defaults = {}) {
  return {...defaults, ...getDataAttributes(currentScript)}

}

function findInputLabel ($input_field) {
  const labels = [
    $(`label[for='${$input_field.attr('id')}']`),
    $input_field.parents('label')
  ]

  for (let label of labels) {
    if (label && label.length > 0) {
      return label
    }
  }
  return []
}

function getValue ($input_field) {
  const type = $input_field.attr('type')
  if (type === 'checkbox' || type === 'radio') {
    if (!$input_field.attr('value')) {
      const label = findInputLabel($input_field)
      if (label && label.length > 0) {
        return label[0].innerText.trim()
      }
    }
  }
  return $input_field.val()

}

function getDisplayName ($input_field) {
  const $label = findInputLabel($input_field)
  const displayNames = [
    $input_field.attr('data-display-name'),
    $label.length > 0 ? $label[0].innerText.trim() : false,
    $input_field.attr('placeholder'),
  ]
  for (let name of displayNames) {
    if (name) {
      return name
    }
  }
}

function groupInputData (inputData) {
  let inputDataMap = new Map()
  for (let l of inputData) {
    const name = l.name || l.display_name
    let g_l = inputDataMap.get(name)
    if (!g_l) {
      g_l = {...l, value: []}
    }
    if (l.value) {
      g_l.value.push(l.value)
    }
    inputDataMap.set(name, g_l)
  }
  const groupedData = []
  for (let d of inputDataMap.values()) {
    if (d.value.length <= 1) {
      d.value = d.value[0]
    }
    groupedData.push(d)
  }
  return groupedData
}

function collectDataForm (form) {
  const $form = $(form)
  const $inputs = $form.find('input, select, textarea')
  const inputData = $inputs.map((field) => {
    const $field = $(field)
    const is_file = $field.attr('type') === 'file'
    const value = getValue($field)
    const name = $field.attr('name')
    const display_name = getDisplayName($field)
    return {value, name, display_name, is_file}
  })
  return groupInputData(inputData)
}

function collectFiles ($form) {
  //http://igstan.ro/posts/2009-01-11-ajax-file-upload-with-pure-javascript.html
  const $inputs = $form.find('input[type=\'file\']')
  return $inputs.map((input) => {
    return [input.name, input.files]
  })

}

const CONFIG = getScriptConfig(DEFAULT_CONFIG)

function onSubmitForm (e) {
  e.preventDefault()
  e.stopImmediatePropagation()

  const $form = $(this)
  const formData = collectDataForm($form)
  const formFiles = collectFiles($form)
  console.log(formData)

  let request = superagent
    .post(CONFIG.endpoint)
    .set('API-Key', CONFIG.key)
    .set('Accept', 'application/json')
    .withCredentials()
    .field({'form_data': JSON.stringify(formData)})
  for (let [name, files] of formFiles) {
    for (let file of files) {
      request = request.attach(name, file)
    }
  }
  request
    .then((response) => {
      $form.trigger('subscribe_form:success', {
        event: e,
        data: formData,
        files: formFiles,
        response
      })
    })
    .catch((error) => {
      $form.trigger('subscribe_form:error', {
        event: e,
        data: formData,
        files: formFiles,
        error
      })
    })

  return false
}

$(() => {
  console.log(CONFIG)
  $(CONFIG.form).on('submit', onSubmitForm)
})