/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./subscribe.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/cash-dom/dist/cash.esm.js":
/*!*************************************************!*\
  !*** ../node_modules/cash-dom/dist/cash.esm.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* MIT https://github.com/kenwheeler/cash */


var doc = document,
    win = window,
    _Array$prototype = Array.prototype,
    filter = _Array$prototype.filter,
    indexOf = _Array$prototype.indexOf,
    map = _Array$prototype.map,
    push = _Array$prototype.push,
    reverse = _Array$prototype.reverse,
    slice = _Array$prototype.slice,
    splice = _Array$prototype.splice;
var idRe = /^#[\w-]*$/,
    classRe = /^\.[\w-]*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; // @require ./variables.js

function find(selector, context) {
  if (context === void 0) {
    context = doc;
  }

  return classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
} // @require ./find.js
// @require ./variables.js


function Cash(selector, context) {
  if (context === void 0) {
    context = doc;
  }

  if (!selector) return;
  if (selector.__cash) return selector;
  var eles = selector;

  if (isString(selector)) {
    if (context.__cash) context = context[0];
    eles = idRe.test(selector) ? context.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, context);
    if (!eles) return;
  } else if (isFunction(selector)) {
    return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
  }

  if (eles.nodeType || eles === win) eles = [eles];
  this.length = eles.length;

  for (var i = 0, l = this.length; i < l; i++) {
    this[i] = eles[i];
  }
}

function cash(selector, context) {
  return new Cash(selector, context);
}
/* PROTOTYPE */


var fn = cash.fn = cash.prototype = Cash.prototype = {
  constructor: cash,
  __cash: true,
  length: 0,
  splice: splice // Ensures a cash collection gets printed as array-like in Chrome

}; // @require core/cash.js
// @require core/variables.js

fn.get = function (index) {
  if (index === undefined) return slice.call(this);
  return this[index < 0 ? index + this.length : index];
}; // @require core/cash.js
// @require ./get.js


fn.eq = function (index) {
  return cash(this.get(index));
}; // @require core/cash.js
// @require ./eq.js


fn.first = function () {
  return this.eq(0);
}; // @require core/cash.js
// @require ./eq.js


fn.last = function () {
  return this.eq(-1);
}; // @require core/cash.js
// @require core/variables.js


fn.map = function (callback) {
  return cash(map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  }));
}; // @require core/cash.js
// @require core/variables.js


fn.slice = function () {
  return cash(slice.apply(this, arguments));
}; // @require ./cash.js


var camelCaseRe = /(?:^\w|[A-Z]|\b\w)/g,
    camelCaseWhitespaceRe = /[\s-_]+/g;

function camelCase(str) {
  return str.replace(camelCaseRe, function (letter, index) {
    return letter[!index ? 'toLowerCase' : 'toUpperCase']();
  }).replace(camelCaseWhitespaceRe, '');
}

;
cash.camelCase = camelCase; // @require ./cash.js

function each(arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (callback.call(arr[i], arr[i], i, arr) === false) break;
  }
}

cash.each = each; // @require core/cash.js
// @require core/each.js

fn.each = function (callback) {
  each(this, function (ele, i) {
    return callback.call(ele, i, ele);
  });
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.removeProp = function (prop) {
  return this.each(function (i, ele) {
    delete ele[prop];
  });
}; // @require ./cash.js


function extend(target) {
  if (target === void 0) {
    target = this;
  }

  var args = arguments,
      length = args.length;

  for (var i = length < 2 ? 0 : 1; i < length; i++) {
    for (var key in args[i]) {
      target[key] = args[i][key];
    }
  }

  return target;
}

;
cash.extend = fn.extend = extend; // @require ./cash.js

var guid = 1;
cash.guid = guid; // @require ./cash.js

function matches(ele, selector) {
  var matches = ele && (ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector || ele.oMatchesSelector);
  return !!matches && matches.call(ele, selector);
}

cash.matches = matches; // @require ./cash.js

function isFunction(x) {
  return typeof x === 'function';
}

cash.isFunction = isFunction;

function isString(x) {
  return typeof x === 'string';
}

cash.isString = isString;

function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

cash.isNumeric = isNumeric;
var isArray = Array.isArray;
cash.isArray = isArray; // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js

fn.prop = function (prop, value) {
  if (!prop) return;

  if (isString(prop)) {
    if (arguments.length < 2) return this[0] && this[0][prop];
    return this.each(function (i, ele) {
      ele[prop] = value;
    });
  }

  for (var key in prop) {
    this.prop(key, prop[key]);
  }

  return this;
}; // @require ./matches.js
// @require ./type_checking.js


function getCompareFunction(selector) {
  return isString(selector) ? function (i, ele) {
    return matches(ele, selector);
  } : selector.__cash ? function (i, ele) {
    return selector.is(ele);
  } : function (i, ele, selector) {
    return ele === selector;
  };
} // @require core/cash.js
// @require core/get_compare_function.js
// @require core/type_checking.js
// @require core/variables.js
// @require collection/get.js


fn.filter = function (selector) {
  if (!selector) return cash();
  var comparator = isFunction(selector) ? selector : getCompareFunction(selector);
  return cash(filter.call(this, function (ele, i) {
    return comparator.call(ele, i, ele, selector);
  }));
}; // @require ./type_checking.js


var splitValuesRe = /\S+/g;

function getSplitValues(str) {
  return isString(str) ? str.match(splitValuesRe) || [] : [];
} // @require core/cash.js
// @require core/get_split_values.js
// @require collection/each.js


fn.hasClass = function (cls) {
  var classes = getSplitValues(cls);
  var check = false;

  if (classes.length) {
    this.each(function (i, ele) {
      check = ele.classList.contains(classes[0]);
      return !check;
    });
  }

  return check;
}; // @require core/cash.js
// @require core/get_split_values.js
// @require collection/each.js


fn.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  if (!attrs.length) return this;
  return this.each(function (i, ele) {
    each(attrs, function (a) {
      ele.removeAttribute(a);
    });
  });
}; // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./remove_attr.js


fn.attr = function (attr, value) {
  if (!attr) return;

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0]) return;

      var _value = this[0].getAttribute(attr);

      return _value === null ? undefined : _value;
    }

    if (value === null) return this.removeAttr(attr);
    return this.each(function (i, ele) {
      ele.setAttribute(attr, value);
    });
  }

  for (var key in attr) {
    this.attr(key, attr[key]);
  }

  return this;
}; // @require core/cash.js
// @require core/each.js
// @require core/get_split_values.js
// @require collection/each.js


fn.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = force !== undefined;
  if (!classes.length) return this;
  return this.each(function (i, ele) {
    each(classes, function (c) {
      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
}; // @require core/cash.js
// @require ./toggle_class.js


fn.addClass = function (cls) {
  return this.toggleClass(cls, true);
}; // @require core/cash.js
// @require ./attr.js
// @require ./toggle_class.js


fn.removeClass = function (cls) {
  return !arguments.length ? this.attr('class', '') : this.toggleClass(cls, false);
}; // @optional ./add_class.js
// @optional ./attr.js
// @optional ./has_class.js
// @optional ./prop.js
// @optional ./remove_attr.js
// @optional ./remove_class.js
// @optional ./remove_prop.js
// @optional ./toggle_class.js
// @require ./cash.js


function unique(arr) {
  return arr.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

cash.unique = unique; // @require core/cash.js
// @require core/unique.js
// @require ./get.js

fn.add = function (selector, context) {
  return cash(unique(this.get().concat(cash(selector, context).get())));
}; // @require core/variables.js


function computeStyle(ele, prop, isVariable) {
  if (ele.nodeType !== 1) return;
  var style = win.getComputedStyle(ele, null);
  return prop ? isVariable ? style.getPropertyValue(prop) : style[prop] : style;
} // @require ./compute_style.js


function computeStyleInt(ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

var cssVariableRe = /^--/; // @require ./variables.js

function isCSSVariable(prop) {
  return cssVariableRe.test(prop);
} // @require core/camel_case.js
// @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require ./is_css_variable.js


var prefixedProps = {},
    _doc$createElement = doc.createElement('div'),
    style = _doc$createElement.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

function getPrefixedProp(prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) return prop;

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC.charAt(0).toUpperCase() + propCC.slice(1),
        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
    each(props, function (p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

;
cash.prefixedProp = getPrefixedProp; // @require core/type_checking.js
// @require ./is_css_variable.js

var numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue(prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
} // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/compute_style.js
// @require ./helpers/get_prefixed_prop.js
// @require ./helpers/get_suffixed_value.js
// @require ./helpers/is_css_variable.js


fn.css = function (prop, value) {
  if (isString(prop)) {
    var isVariable = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable);
    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable);
    if (!prop) return this;
    value = getSuffixedValue(prop, value, isVariable);
    return this.each(function (i, ele) {
      if (ele.nodeType !== 1) return;

      if (isVariable) {
        ele.style.setProperty(prop, value);
      } else {
        ele.style[prop] = value;
      }
    });
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}; // @optional ./css.js


var dataNamespace = '__cashData',
    dataAttributeRe = /^data-(.*)/; // @require core/cash.js
// @require ./helpers/variables.js

cash.hasData = function (ele) {
  return dataNamespace in ele;
}; // @require ./variables.js


function getDataCache(ele) {
  return ele[dataNamespace] = ele[dataNamespace] || {};
} // @require attributes/attr.js
// @require ./get_data_cache.js


function getData(ele, key) {
  var cache = getDataCache(ele);

  if (key) {
    if (!(key in cache)) {
      var value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase(key)] : cash(ele).attr("data-" + key);

      if (value !== undefined) {
        try {
          value = JSON.parse(value);
        } catch (e) {}

        cache[key] = value;
      }
    }

    return cache[key];
  }

  return cache;
} // @require ./variables.js
// @require ./get_data_cache.js


function removeData(ele, key) {
  if (key === undefined) {
    delete ele[dataNamespace];
  } else {
    delete getDataCache(ele)[key];
  }
} // @require ./get_data_cache.js


function setData(ele, key, value) {
  getDataCache(ele)[key] = value;
} // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/get_data.js
// @require ./helpers/set_data.js
// @require ./helpers/variables.js


fn.data = function (name, value) {
  var _this = this;

  if (!name) {
    if (!this[0]) return;
    each(this[0].attributes, function (attr) {
      var match = attr.name.match(dataAttributeRe);
      if (!match) return;

      _this.data(match[1]);
    });
    return getData(this[0]);
  }

  if (isString(name)) {
    if (value === undefined) return this[0] && getData(this[0], name);
    return this.each(function (i, ele) {
      return setData(ele, name, value);
    });
  }

  for (var key in name) {
    this.data(key, name[key]);
  }

  return this;
}; // @require core/cash.js
// @require collection/each.js
// @require ./helpers/remove_data.js


fn.removeData = function (key) {
  return this.each(function (i, ele) {
    return removeData(ele, key);
  });
}; // @optional ./data.js
// @optional ./remove_data.js
// @require css/helpers/compute_style_int.js


function getExtraSpace(ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
} // @require core/cash.js
// @require core/each.js
// @require core/variables.js


each(['Width', 'Height'], function (prop) {
  fn["inner" + prop] = function () {
    if (!this[0]) return;
    if (this[0] === win) return win["inner" + prop];
    return this[0]["client" + prop];
  };
}); // @require core/camel_case.js
// @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require css/helpers/compute_style.js
// @require css/helpers/get_suffixed_value.js
// @require ./helpers/get_extra_space.js

each(['width', 'height'], function (prop, index) {
  fn[prop] = function (value) {
    if (!this[0]) return value === undefined ? undefined : this;

    if (!arguments.length) {
      if (this[0] === win) return this[0][camelCase("outer-" + prop)];
      return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
    }

    value = parseInt(value, 10);
    return this.each(function (i, ele) {
      if (ele.nodeType !== 1) return;
      var boxSizing = computeStyle(ele, 'boxSizing');
      ele.style[prop] = getSuffixedValue(prop, value + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
    });
  };
}); // @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require css/helpers/compute_style_int.js

each(['Width', 'Height'], function (prop, index) {
  fn["outer" + prop] = function (includeMargins) {
    if (!this[0]) return;
    if (this[0] === win) return win["outer" + prop];
    return this[0]["offset" + prop] + (includeMargins ? computeStyleInt(this[0], "margin" + (!index ? 'Left' : 'Top')) + computeStyleInt(this[0], "margin" + (!index ? 'Right' : 'Bottom')) : 0);
  };
}); // @optional ./inner.js
// @optional ./normal.js
// @optional ./outer.js

function hasNamespaces(ns1, ns2) {
  for (var i = 0, l = ns2.length; i < l; i++) {
    if (ns1.indexOf(ns2[i]) < 0) return false;
  }

  return true;
} // @require core/each.js


function removeEventListeners(cache, ele, name) {
  each(cache[name], function (_ref) {
    var namespaces = _ref[0],
        callback = _ref[1];
    ele.removeEventListener(name, callback);
  });
  delete cache[name];
}

var eventsNamespace = '__cashEvents',
    eventsNamespacesSeparator = '.'; // @require ./variables.js

function getEventsCache(ele) {
  return ele[eventsNamespace] = ele[eventsNamespace] || {};
} // @require core/guid.js
// @require events/helpers/get_events_cache.js


function addEvent(ele, name, namespaces, callback) {
  callback.guid = callback.guid || guid++;
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, callback]);
  ele.addEventListener(name, callback);
} // @require ./variables.js


function parseEventName(eventName) {
  var parts = eventName.split(eventsNamespacesSeparator);
  return [parts[0], parts.slice(1).sort()]; // [name, namespaces]
} // @require core/guid.js
// @require ./get_events_cache.js
// @require ./has_namespaces.js
// @require ./parse_event_name.js
// @require ./remove_event_listeners.js


function removeEvent(ele, name, namespaces, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    if (!namespaces || !namespaces.length) {
      for (name in cache) {
        removeEventListeners(cache, ele, name);
      }
    } else {
      for (name in cache) {
        removeEvent(ele, name, namespaces, callback);
      }
    }
  } else {
    var eventCache = cache[name];
    if (!eventCache) return;
    if (callback) callback.guid = callback.guid || guid++;
    cache[name] = eventCache.filter(function (_ref2) {
      var ns = _ref2[0],
          cb = _ref2[1];
      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces)) return true;
      ele.removeEventListener(name, cb);
    });
  }
} // @require core/cash.js
// @require core/each.js
// @require collection/each.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/remove_event.js


fn.off = function (eventFullName, callback) {
  var _this2 = this;

  if (eventFullName === undefined) {
    this.each(function (i, ele) {
      return removeEvent(ele);
    });
  } else {
    each(getSplitValues(eventFullName), function (eventFullName) {
      var _parseEventName = parseEventName(eventFullName),
          name = _parseEventName[0],
          namespaces = _parseEventName[1];

      _this2.each(function (i, ele) {
        return removeEvent(ele, name, namespaces, callback);
      });
    });
  }

  return this;
}; // @require core/cash.js
// @require core/get_split_values.js
// @require core/guid.js
// @require core/matches.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/variables.js
// @require ./helpers/add_event.js
// @require ./helpers/has_namespaces.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/remove_event.js


fn.on = function (eventFullName, selector, callback, _one) {
  var _this3 = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, eventFullName[key]);
    }

    return this;
  }

  if (isFunction(selector)) {
    callback = selector;
    selector = false;
  }

  each(getSplitValues(eventFullName), function (eventFullName) {
    var _parseEventName2 = parseEventName(eventFullName),
        name = _parseEventName2[0],
        namespaces = _parseEventName2[1];

    _this3.each(function (i, ele) {
      var finalCallback = function finalCallback(event) {
        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            if (target === ele) return;
            target = target.parentNode;
            if (!target) return;
          }

          thisArg = target;
        }

        event.namespace = event.namespace || '';
        var returnValue = callback.call(thisArg, event, event.data);

        if (_one) {
          removeEvent(ele, name, namespaces, finalCallback);
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback.guid = callback.guid || guid++;
      addEvent(ele, name, namespaces, finalCallback);
    });
  });
  return this;
}; // @require core/cash.js
// @require ./on.js


fn.one = function (eventFullName, delegate, callback) {
  return this.on(eventFullName, delegate, callback, true);
}; // @require core/cash.js
// @require core/variables.js


fn.ready = function (callback) {
  var finalCallback = function finalCallback() {
    return callback(cash);
  };

  if (doc.readyState !== 'loading') {
    setTimeout(finalCallback);
  } else {
    doc.addEventListener('DOMContentLoaded', finalCallback);
  }

  return this;
}; // @require core/cash.js
// @require core/type_checking.js
// @require core/variables.js
// @require collection/each.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/variables.js


fn.trigger = function (eventFullName, data) {
  var evt = eventFullName;

  if (isString(eventFullName)) {
    var _parseEventName3 = parseEventName(eventFullName),
        name = _parseEventName3[0],
        namespaces = _parseEventName3[1];

    evt = doc.createEvent('HTMLEvents');
    evt.initEvent(name, true, true);
    evt.namespace = namespaces.join(eventsNamespacesSeparator);
  }

  evt.data = data;
  return this.each(function (i, ele) {
    ele.dispatchEvent(evt);
  });
}; // @optional ./off.js
// @optional ./on.js
// @optional ./one.js
// @optional ./ready.js
// @optional ./trigger.js
// @require core/each.js


function getValueSelectMultiple(ele) {
  var values = [];
  each(ele.options, function (option) {
    if (option.selected && !option.disabled && !option.parentNode.disabled) {
      values.push(option.value);
    }
  });
  return values;
}

function getValueSelectSingle(ele) {
  return ele.selectedIndex < 0 ? null : ele.options[ele.selectedIndex].value;
} // @require ./get_value_select_single.js
// @require ./get_value_select_multiple.js


var selectOneRe = /select-one/i,
    selectMultipleRe = /select-multiple/i;

function getValue(ele) {
  var type = ele.type;
  if (selectOneRe.test(type)) return getValueSelectSingle(ele);
  if (selectMultipleRe.test(type)) return getValueSelectMultiple(ele);
  return ele.value;
}

var queryEncodeSpaceRe = /%20/g;

function queryEncode(prop, value) {
  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value).replace(queryEncodeSpaceRe, '+');
} // @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require ./helpers/get_value.js
// @require ./helpers/query_encode.js


var skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;

fn.serialize = function () {
  var query = '';
  this.each(function (i, ele) {
    each(ele.elements || [ele], function (ele) {
      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET') return;
      if (skippableRe.test(ele.type)) return;
      if (checkableRe.test(ele.type) && !ele.checked) return;
      var value = getValue(ele);
      if (value === undefined) return;
      var values = isArray(value) ? value : [value];
      each(values, function (value) {
        query += queryEncode(ele.name, value);
      });
    });
  });
  return query.substr(1);
}; // @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/get_value.js


fn.val = function (value) {
  if (value === undefined) return this[0] && getValue(this[0]);
  return this.each(function (i, ele) {
    var isMultiple = selectMultipleRe.test(ele.type),
        eleValue = value === null ? isMultiple ? [] : '' : value;

    if (isMultiple && isArray(eleValue)) {
      each(ele.options, function (option) {
        option.selected = eleValue.indexOf(option.value) >= 0;
      });
    } else {
      ele.value = eleValue;
    }
  });
}; // @optional ./serialize.js
// @optional ./val.js
// @require core/cash.js
// @require collection/map.js


fn.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
}; // @require core/cash.js
// @require collection/each.js


fn.detach = function () {
  return this.each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
}; // @require ./cash.js
// @require ./variables.js
// @require ./type_checking.js
// @require collection/get.js
// @require manipulation/detach.js


var fragmentRe = /^\s*<(\w+)[^>]*>/,
    singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;
var containers;

function initContainers() {
  if (containers) return;
  var table = doc.createElement('table'),
      tr = doc.createElement('tr');
  containers = {
    '*': doc.createElement('div'),
    tr: doc.createElement('tbody'),
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
  };
}

function parseHTML(html) {
  initContainers();
  if (!isString(html)) return [];
  if (singleTagRe.test(html)) return [doc.createElement(RegExp.$1)];
  var fragment = fragmentRe.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
  container.innerHTML = html;
  return cash(container.childNodes).detach().get();
}

cash.parseHTML = parseHTML; // @optional ./camel_case.js
// @optional ./each.js
// @optional ./export.js
// @optional ./extend.js
// @optional ./find.js
// @optional ./get_compare_function.js
// @optional ./get_split_values.js
// @optional ./guid.js
// @optional ./matches.js
// @optional ./parse_html.js
// @optional ./unique.js
// @optional ./variables.js
// @require ./cash.js
// @require ./type_checking.js
// @require core/cash.js

fn.empty = function () {
  var ele = this[0];

  if (ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  }

  return this;
};

function insertElement(ele, child, prepend) {
  if (prepend) {
    ele.insertBefore(child, ele.childNodes[0]);
  } else {
    ele.appendChild(child);
  }
} // @require core/each.js
// @require core/type_checking.js
// @require ./insert_element.js


function insertContent(parent, child, prepend) {
  if (child === undefined) return;
  var isStr = isString(child);

  if (!isStr && child.length) {
    each(child, function (ele) {
      return insertContent(parent, ele, prepend);
    });
  } else {
    each(parent, isStr ? function (ele) {
      ele.insertAdjacentHTML(prepend ? 'afterbegin' : 'beforeend', child);
    } : function (ele, index) {
      return insertElement(ele, !index ? child : child.cloneNode(true), prepend);
    });
  }
} // @require core/cash.js
// @require core/each.js
// @require ./helpers/insert_content.js


fn.append = function () {
  var _this4 = this;

  each(arguments, function (content) {
    insertContent(_this4, content);
  });
  return this;
}; // @require core/cash.js
// @require ./helpers/insert_content.js


fn.appendTo = function (parent) {
  insertContent(cash(parent), this);
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.html = function (content) {
  if (content === undefined) return this[0] && this[0].innerHTML;
  var source = content.nodeType ? content[0].outerHTML : content;
  return this.each(function (i, ele) {
    ele.innerHTML = source;
  });
}; // @require core/cash.js
// @require collection/each.js


fn.insertAfter = function (content) {
  var _this5 = this;

  cash(content).each(function (index, ele) {
    var parent = ele.parentNode;

    _this5.each(function (i, e) {
      parent.insertBefore(!index ? e : e.cloneNode(true), ele.nextSibling);
    });
  });
  return this;
}; // @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require collection/slice.js
// @require ./insert_after.js


fn.after = function () {
  var _this6 = this;

  each(reverse.apply(arguments), function (content) {
    reverse.apply(cash(content).slice()).insertAfter(_this6);
  });
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.insertBefore = function (selector) {
  var _this7 = this;

  cash(selector).each(function (index, ele) {
    var parent = ele.parentNode;

    _this7.each(function (i, e) {
      parent.insertBefore(!index ? e : e.cloneNode(true), ele);
    });
  });
  return this;
}; // @require core/cash.js
// @require core/each.js
// @require ./insert_before.js


fn.before = function () {
  var _this8 = this;

  each(arguments, function (content) {
    cash(content).insertBefore(_this8);
  });
  return this;
}; // @require core/cash.js
// @require core/each.js
// @require ./helpers/insert_content.js


fn.prepend = function () {
  var _this9 = this;

  each(arguments, function (content) {
    insertContent(_this9, content, true);
  });
  return this;
}; // @require core/cash.js
// @require core/variables.js
// @require collection/slice.js
// @require ./helpers/insert_content.js


fn.prependTo = function (parent) {
  insertContent(cash(parent), reverse.apply(this.slice()), true);
  return this;
}; // @require core/cash.js
// @require events/off.js
// @require ./detach.js


fn.remove = function () {
  return this.detach().off();
}; // @require core/cash.js
// @require collection/each.js
// @require collection/slice.js
// @require ./after.js
// @require ./remove.js


fn.replaceWith = function (content) {
  var _this10 = this;

  return this.each(function (i, ele) {
    var parent = ele.parentNode;
    if (!parent) return;
    var $eles = i ? cash(content).clone() : cash(content);

    if (!$eles[0]) {
      _this10.remove();

      return false;
    }

    parent.replaceChild($eles[0], ele);
    cash($eles[0]).after($eles.slice(1));
  });
}; // @require core/cash.js
// @require ./replace_with.js


fn.replaceAll = function (content) {
  cash(content).replaceWith(this);
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.text = function (content) {
  if (content === undefined) return this[0] ? this[0].textContent : '';
  return this.each(function (i, ele) {
    ele.textContent = content;
  });
}; // @optional ./after.js
// @optional ./append.js
// @optional ./append_to.js
// @optional ./before.js
// @optional ./clone.js
// @optional ./detach.js
// @optional ./empty.js
// @optional ./html.js
// @optional ./insert_after.js
// @optional ./insert_before.js
// @optional ./prepend.js
// @optional ./prepend_to.js
// @optional ./remove.js
// @optional ./replace_all.js
// @optional ./replace_with.js
// @optional ./text.js
// @require core/cash.js
// @require core/variables.js


var docEle = doc.documentElement;

fn.offset = function () {
  var ele = this[0];
  if (!ele) return;
  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset - docEle.clientTop,
    left: rect.left + win.pageXOffset - docEle.clientLeft
  };
}; // @require core/cash.js


fn.offsetParent = function () {
  return cash(this[0] && this[0].offsetParent);
}; // @require core/cash.js


fn.position = function () {
  var ele = this[0];
  if (!ele) return;
  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };
}; // @optional ./offset.js
// @optional ./offset_parent.js
// @optional ./position.js
// @require core/cash.js
// @require core/matches.js
// @require core/unique.js
// @require collection/each.js
// @require collection/filter.js


fn.children = function (selector) {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.children);
  });
  result = cash(unique(result));
  if (!selector) return result;
  return result.filter(function (i, ele) {
    return matches(ele, selector);
  });
}; // @require core/cash.js
// @require core/unique.js
// @require collection/each.js


fn.contents = function () {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes);
  });
  return cash(result.length && unique(result));
}; // @require core/cash.js
// @require core/unique.js
// @require core/find.js
// @require core/variables.js


fn.find = function (selector) {
  var result = [];

  for (var i = 0, l = this.length; i < l; i++) {
    var found = find(selector, this[i]);

    if (found.length) {
      push.apply(result, found);
    }
  }

  return cash(result.length && unique(result));
}; // @require core/cash.js
// @require core/find.js
// @require core/type_checking.js
// @require collection/filter.js


fn.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return !!find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
}; // @require core/cash.js
// @require core/get_compare_function.js
// @require collection/each.js


fn.is = function (selector) {
  if (!selector || !this[0]) return false;
  var comparator = getCompareFunction(selector);
  var check = false;
  this.each(function (i, ele) {
    check = comparator(i, ele, selector);
    return !check;
  });
  return check;
}; // @require core/cash.js


fn.next = function () {
  return cash(this[0] && this[0].nextElementSibling);
}; // @require core/cash.js
// @require core/get_compare_function.js
// @require collection/filter.js


fn.not = function (selector) {
  if (!selector || !this[0]) return this;
  var comparator = getCompareFunction(selector);
  return this.filter(function (i, ele) {
    return !comparator(i, ele, selector);
  });
}; // @require core/cash.js
// @require core/unique.js
// @require collection/each.js


fn.parent = function () {
  var result = [];
  this.each(function (i, ele) {
    if (ele && ele.parentNode) {
      result.push(ele.parentNode);
    }
  });
  return cash(unique(result));
}; // @require core/cash.js
// @require core/variables.js
// @require traversal/children.js
// @require traversal/parent.js
// @require ./get.js
//FIXME Ugly file name, is there a better option?


fn.index = function (ele) {
  var child = ele ? cash(ele)[0] : this[0],
      collection = ele ? this : cash(child).parent().children();
  return indexOf.call(collection, child);
}; // @optional ./add.js
// @optional ./each.js
// @optional ./eq.js
// @optional ./filter.js
// @optional ./first.js
// @optional ./get.js
// @optional ./indexFn.js
// @optional ./last.js
// @optional ./map.js
// @optional ./slice.js
// @require core/cash.js
// @require collection/filter.js
// @require ./is.js
// @require ./parent.js


fn.closest = function (selector) {
  if (!selector || !this[0]) return cash();
  if (this.is(selector)) return this.filter(selector);
  return this.parent().closest(selector);
}; // @require core/cash.js
// @require core/matches.js
// @require core/unique.js
// @require core/variables.js
// @require collection/each.js


fn.parents = function (selector) {
  var result = [];
  var last;
  this.each(function (i, ele) {
    last = ele;

    while (last && last.parentNode && last !== doc.body.parentNode) {
      last = last.parentNode;

      if (!selector || selector && matches(last, selector)) {
        result.push(last);
      }
    }
  });
  return cash(unique(result));
}; // @require core/cash.js


fn.prev = function () {
  return cash(this[0] && this[0].previousElementSibling);
}; // @require core/cash.js
// @require collection/filter.js
// @require ./children.js
// @require ./parent.js


fn.siblings = function () {
  var ele = this[0];
  return this.parent().children().filter(function (i, child) {
    return child !== ele;
  });
}; // @optional ./children.js
// @optional ./closest.js
// @optional ./contents.js
// @optional ./find.js
// @optional ./has.js
// @optional ./is.js
// @optional ./next.js
// @optional ./not.js
// @optional ./parent.js
// @optional ./parents.js
// @optional ./prev.js
// @optional ./siblings.js
// @optional attributes/index.js
// @optional collection/index.js
// @optional css/index.js
// @optional data/index.js
// @optional dimensions/index.js
// @optional events/index.js
// @optional forms/index.js
// @optional manipulation/index.js
// @optional offset/index.js
// @optional traversal/index.js
// @require core/index.js
/* harmony default export */ __webpack_exports__["default"] = (cash);


/***/ }),

/***/ "../node_modules/component-emitter/index.js":
/*!**************************************************!*\
  !*** ../node_modules/component-emitter/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "../node_modules/superagent-django-csrf/index.js":
/*!*******************************************************!*\
  !*** ../node_modules/superagent-django-csrf/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var request = __webpack_require__(/*! superagent */ "../node_modules/superagent/lib/client.js");

// patch superagent to attach CSRF-token to all requests
try {
  var csrf = document.cookie.match(/csrftoken=(.*?)(?:$|;)/)[1];
  var end = request.Request.prototype.end;
  request.Request.prototype.end = function(fn) {
    this.set('X-CSRFToken', csrf);
    return end.call(this, fn);
  };
}
catch (err) {
  
}



/***/ }),

/***/ "../node_modules/superagent/lib/agent-base.js":
/*!****************************************************!*\
  !*** ../node_modules/superagent/lib/agent-base.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Agent() {
  this._defaults = [];
}

["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects",
 "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(fn => {
  /** Default setting for all requests from this agent */
  Agent.prototype[fn] = function(...args) {
    this._defaults.push({fn, args});
    return this;
  }
});

Agent.prototype._setDefaults = function(req) {
    this._defaults.forEach(def => {
      req[def.fn].apply(req, def.args);
    });
};

module.exports = Agent;


/***/ }),

/***/ "../node_modules/superagent/lib/client.js":
/*!************************************************!*\
  !*** ../node_modules/superagent/lib/client.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

let root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

const Emitter = __webpack_require__(/*! component-emitter */ "../node_modules/component-emitter/index.js");
const RequestBase = __webpack_require__(/*! ./request-base */ "../node_modules/superagent/lib/request-base.js");
const isObject = __webpack_require__(/*! ./is-object */ "../node_modules/superagent/lib/is-object.js");
const ResponseBase = __webpack_require__(/*! ./response-base */ "../node_modules/superagent/lib/response-base.js");
const Agent = __webpack_require__(/*! ./agent-base */ "../node_modules/superagent/lib/agent-base.js");

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

const request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = () => {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

const trim = ''.trim
  ? s => s.trim()
  : s => s.replace(/(^\s*|\s*$)/g, '');

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  const pairs = [];
  for (const key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(v => {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(const subkey in val) {
        pushEncodedKeyValuePair(pairs, `${key}[${subkey}]`, val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

request.serializeObject = serialize;

/**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  const obj = {};
  const pairs = str.split('&');
  let pair;
  let pos;

  for (let i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': JSON.stringify
};

/**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  const lines = str.split(/\r?\n/);
  const fields = {};
  let index;
  let line;
  let field;
  let val;

  for (let i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    if (index === -1) { // could be empty line, just skip it
      continue;
    }
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[\/+]json($|[^-\w])/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  let status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str) {
  let parse = request.parse[this.type];
  if (this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  const req = this.req;
  const method = req.method;
  const url = req.url;

  const msg = `cannot ${method} ${url} (${this.status})`;
  const err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  const self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', () => {
    let err = null;
    let res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    let new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      }
    } catch(custom_err) {
      new_err = custom_err; // ok() callback can throw
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (1 === arguments.length) pass = '';
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    };
  }

  const encoder = string => {
    if ('function' === typeof btoa) {
      return btoa(string);
    }
    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  const fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  const err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = () => {
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  this._end();
};

Request.prototype._end = function() {
  if (this._aborted) return this.callback(Error("The request has been aborted even before .end() was called"));

  const self = this;
  const xhr = (this.xhr = request.getXHR());
  let data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = () => {
    const readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    let status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  const handleProgress = (direction, e) => {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    const contentType = this._header['content-type'];
    let serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (const field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
};

request.agent = () => new Agent();

["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(method => {
  Agent.prototype[method.toLowerCase()] = function(url, fn) {
    const req = new request.Request(method, url);
    this._setDefaults(req);
    if (fn) {
      req.end(fn);
    }
    return req;
  };
});

Agent.prototype.del = Agent.prototype['delete'];

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = (url, data, fn) => {
  const req = request('GET', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = (url, data, fn) => {
  const req = request('HEAD', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = (url, data, fn) => {
  const req = request('OPTIONS', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn) {
  const req = request('DELETE', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = (url, data, fn) => {
  const req = request('PATCH', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = (url, data, fn) => {
  const req = request('POST', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = (url, data, fn) => {
  const req = request('PUT', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),

/***/ "../node_modules/superagent/lib/is-object.js":
/*!***************************************************!*\
  !*** ../node_modules/superagent/lib/is-object.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),

/***/ "../node_modules/superagent/lib/request-base.js":
/*!******************************************************!*\
  !*** ../node_modules/superagent/lib/request-base.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module of mixed-in functions shared between node and client code
 */
const isObject = __webpack_require__(/*! ./is-object */ "../node_modules/superagent/lib/is-object.js");

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (const key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(const option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count, fn){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

const ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
RequestBase.prototype._shouldRetry = function(err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }
  if (this._retryCallback) {
    try {
      const override = this._retryCallback(err, res);
      if (override === true) return true;
      if (override === false) return false;
      // undefined falls back to defaults
    } catch(e) {
      console.error(e);
    }
  }
  if (res && res.status && res.status >= 500 && res.status != 501) return true;
  if (err) {
    if (err.code && ~ERROR_CODES.indexOf(err.code)) return true;
    // Superagent timeout
    if (err.timeout && err.code == 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }
  return false;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {

  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    const self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise((innerResolve, innerReject) => {
      self.on('error', innerReject);
      self.on('abort', () => {
        const err = new Error('Aborted');
        err.code = "ABORTED";
        err.status = this.status;
        err.method = this.method;
        err.url = this.url;
        innerReject(err);
      });
      self.end((err, res) => {
        if (err) innerReject(err);
        else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype['catch'] = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};

/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (const key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {
  // name should be either a string or an object.
  if (null === name || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (const key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (const i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function(user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', `Basic ${base64Encoder(`${user}:${pass}`)}`);
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', `Bearer ${user}`);
      break;
  }
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on) {
  // This is browser-only functionality. Node side is no-op.
  if (on == undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n
 * @return {Request} for chaining
 */
RequestBase.prototype.maxResponseSize = function(n){
  if ('number' !== typeof n) {
    throw TypeError("Invalid argument");
  }
  this._maxResponseSize = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function() {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header,
  };
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  const isObj = isObject(data);
  let type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (const key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? `${this._data}&${data}`
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};

/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  const query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    const index = this.url.indexOf('?');
    if (index >= 0) {
      const queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = () => {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  const err = new Error(`${reason + timeout}ms exceeded`);
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  const self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(() => {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(() => {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};


/***/ }),

/***/ "../node_modules/superagent/lib/response-base.js":
/*!*******************************************************!*\
  !*** ../node_modules/superagent/lib/response-base.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

const utils = __webpack_require__(/*! ./utils */ "../node_modules/superagent/lib/utils.js");

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (const key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field) {
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    const ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    const params = utils.params(ct);
    for (const key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    const type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.created = 201 == status;
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
    this.unprocessableEntity = 422 == status;
};


/***/ }),

/***/ "../node_modules/superagent/lib/utils.js":
/*!***********************************************!*\
  !*** ../node_modules/superagent/lib/utils.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = str => str.split(/ *; */).shift();

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = str => str.split(/ *; */).reduce((obj, str) => {
  const parts = str.split(/ *= */);
  const key = parts.shift();
  const val = parts.shift();

  if (key && val) obj[key] = val;
  return obj;
}, {});

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = str => str.split(/ *, */).reduce((obj, str) => {
  const parts = str.split(/ *; */);
  const url = parts[0].slice(1, -1);
  const rel = parts[1].split(/ *= */)[1].slice(1, -1);
  obj[rel] = url;
  return obj;
}, {});

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = (header, changesOrigin) => {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  // secuirty
  if (changesOrigin) {
    delete header['authorization'];
    delete header['cookie'];
  }
  return header;
};


/***/ }),

/***/ "./subscribe.js":
/*!**********************!*\
  !*** ./subscribe.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "../node_modules/cash-dom/dist/cash.esm.js");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! superagent */ "../node_modules/superagent/lib/client.js");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var superagent_django_csrf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! superagent-django-csrf */ "../node_modules/superagent-django-csrf/index.js");
/* harmony import */ var superagent_django_csrf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(superagent_django_csrf__WEBPACK_IMPORTED_MODULE_2__);


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var DEFAULT_CONFIG = {
  'form': '.subscribe-form'
};

var currentScript = document.currentScript || function () {
  var scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
}();

function getDataAttributes(el) {
  var attrs = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = el.getAttributeNames()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;
      var match = key.toString().match(/^data-([-\w]+)$/);

      if (match) {
        attrs[match[1]] = el.getAttribute(key);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return attrs;
}

function getScriptConfig() {
  var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({}, defaults, getDataAttributes(currentScript));
}

function findInputLabel($input_field) {
  var labels = [Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])("label[for='".concat($input_field.attr('id'), "']")), $input_field.parents('label'), $input_field.attr('placeholder'), $input_field.attr('name')];

  for (var _i = 0; _i < labels.length; _i++) {
    var label = labels[_i];

    if (label && label.length > 0) {
      if (typeof label === "string") {
        return label;
      } else {
        return label[0].innerText.trim();
      }
    }
  }

  return null;
}

function getValue($input_field) {
  var type = $input_field.attr('type');

  if (type === 'checkbox' || type === 'radio') {
    if (!$input_field.attr('value')) {
      var label = findInputLabel($input_field);

      if (label) {
        return label;
      }
    }
  }

  return $input_field.val();
}

function getDisplayName($input_field) {
  var label = findInputLabel($input_field);
  var displayNames = [$input_field.attr('data-display-name'), label, $input_field.attr('placeholder')];

  for (var _i2 = 0; _i2 < displayNames.length; _i2++) {
    var name = displayNames[_i2];

    if (name) {
      return name;
    }
  }
}

function groupInputData(inputData) {
  var inputDataMap = {};
  inputData.map(function (i, l) {
    var name = l.name || l.display_name;
    var g_l = inputDataMap[name];

    if (!g_l) {
      g_l = _objectSpread({}, l, {
        value: []
      });
    }

    if (l.value) {
      g_l.value.push(l.value);
    }

    inputDataMap[name] = g_l;
  });
  var groupedData = [];

  var _arr = Object.values(inputDataMap);

  for (var _i3 = 0; _i3 < _arr.length; _i3++) {
    var d = _arr[_i3];

    if (d.value.length <= 1) {
      d.value = d.value[0];
    }

    groupedData.push(d);
  }

  return groupedData;
}

function collectDataForm(form) {
  var $form = Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(form);
  var $inputs = $form.find('input, select, textarea');
  var inputData = $inputs.map(function (i, field) {
    var $field = Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(field);
    var is_file = $field.attr('type') === 'file';
    var value = getValue($field);
    var name = $field.attr('name');
    var display_name = getDisplayName($field);
    return {
      value: value,
      name: name,
      display_name: display_name,
      is_file: is_file
    };
  });
  return groupInputData(inputData);
}

function collectFiles($form) {
  //http://igstan.ro/posts/2009-01-11-ajax-file-upload-with-pure-javascript.html
  var $inputs = $form.find('input[type=\'file\']');
  return $inputs.map(function (input) {
    return [input.name, input.files];
  });
}

var CONFIG = getScriptConfig(DEFAULT_CONFIG);

function onSubmitForm(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  var $form = Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target);
  var formData = collectDataForm($form);
  var formFiles = collectFiles($form);
  console.log(formData);
  var request = superagent__WEBPACK_IMPORTED_MODULE_1___default.a.post(CONFIG.endpoint).set('API-Key', CONFIG.key).set('Accept', 'application/json').field({
    'form_data': JSON.stringify(formData)
  });
  formFiles.map(function (i, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        files = _ref2[1];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var file = _step2.value;
        request = request.attach(name, file);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
  request.then(function (response) {
    $form.trigger('subscribe_form:success', {
      event: e,
      data: formData,
      files: formFiles,
      response: response
    });
  }).catch(function (error) {
    $form.trigger('subscribe_form:error', {
      event: e,
      data: formData,
      files: formFiles,
      error: error
    });
  });
  return false;
}

function bindEvent(selector, event, cb) {
  document.addEventListener(event, function (e) {
    if (e.target === document.querySelector(CONFIG.form)) {
      cb.apply(this, arguments);
    }
  });
}

Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(function () {
  console.log(CONFIG);
  bindEvent(CONFIG.form, 'submit', onSubmitForm);
  bindEvent(CONFIG.form, 'subscribe_form:success', function (e) {
    e.target.reset();
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jYXNoLWRvbS9kaXN0L2Nhc2guZXNtLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50LWRqYW5nby1jc3JmL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvYWdlbnQtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Jlc3BvbnNlLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zdWJzY3JpYmUuanMiXSwibmFtZXMiOlsiREVGQVVMVF9DT05GSUciLCJjdXJyZW50U2NyaXB0IiwiZG9jdW1lbnQiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsZW5ndGgiLCJnZXREYXRhQXR0cmlidXRlcyIsImVsIiwiYXR0cnMiLCJnZXRBdHRyaWJ1dGVOYW1lcyIsImtleSIsIm1hdGNoIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJnZXRTY3JpcHRDb25maWciLCJkZWZhdWx0cyIsImZpbmRJbnB1dExhYmVsIiwiJGlucHV0X2ZpZWxkIiwibGFiZWxzIiwiJCIsImF0dHIiLCJwYXJlbnRzIiwibGFiZWwiLCJpbm5lclRleHQiLCJ0cmltIiwiZ2V0VmFsdWUiLCJ0eXBlIiwidmFsIiwiZ2V0RGlzcGxheU5hbWUiLCJkaXNwbGF5TmFtZXMiLCJuYW1lIiwiZ3JvdXBJbnB1dERhdGEiLCJpbnB1dERhdGEiLCJpbnB1dERhdGFNYXAiLCJtYXAiLCJpIiwibCIsImRpc3BsYXlfbmFtZSIsImdfbCIsInZhbHVlIiwicHVzaCIsImdyb3VwZWREYXRhIiwiT2JqZWN0IiwidmFsdWVzIiwiZCIsImNvbGxlY3REYXRhRm9ybSIsImZvcm0iLCIkZm9ybSIsIiRpbnB1dHMiLCJmaW5kIiwiZmllbGQiLCIkZmllbGQiLCJpc19maWxlIiwiY29sbGVjdEZpbGVzIiwiaW5wdXQiLCJmaWxlcyIsIkNPTkZJRyIsIm9uU3VibWl0Rm9ybSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInRhcmdldCIsImZvcm1EYXRhIiwiZm9ybUZpbGVzIiwiY29uc29sZSIsImxvZyIsInJlcXVlc3QiLCJzdXBlcmFnZW50IiwicG9zdCIsImVuZHBvaW50Iiwic2V0IiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbGUiLCJhdHRhY2giLCJ0aGVuIiwicmVzcG9uc2UiLCJ0cmlnZ2VyIiwiZXZlbnQiLCJkYXRhIiwiY2F0Y2giLCJlcnJvciIsImJpbmRFdmVudCIsInNlbGVjdG9yIiwiY2IiLCJhZGRFdmVudExpc3RlbmVyIiwicXVlcnlTZWxlY3RvciIsImFwcGx5IiwiYXJndW1lbnRzIiwicmVzZXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURB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T0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOzs7QUFHRjtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBRTtBQUNIO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsT0FBTztBQUN4QztBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DOztBQUVwQztBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBLGtDQUFrQyxPQUFPO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3N1YnNjcmliZS5qc1wiKTtcbiIsIi8qIE1JVCBodHRwczovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9jYXNoICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGRvYyA9IGRvY3VtZW50LFxuICAgIHdpbiA9IHdpbmRvdyxcbiAgICBfQXJyYXkkcHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZpbHRlciA9IF9BcnJheSRwcm90b3R5cGUuZmlsdGVyLFxuICAgIGluZGV4T2YgPSBfQXJyYXkkcHJvdG90eXBlLmluZGV4T2YsXG4gICAgbWFwID0gX0FycmF5JHByb3RvdHlwZS5tYXAsXG4gICAgcHVzaCA9IF9BcnJheSRwcm90b3R5cGUucHVzaCxcbiAgICByZXZlcnNlID0gX0FycmF5JHByb3RvdHlwZS5yZXZlcnNlLFxuICAgIHNsaWNlID0gX0FycmF5JHByb3RvdHlwZS5zbGljZSxcbiAgICBzcGxpY2UgPSBfQXJyYXkkcHJvdG90eXBlLnNwbGljZTtcbnZhciBpZFJlID0gL14jW1xcdy1dKiQvLFxuICAgIGNsYXNzUmUgPSAvXlxcLltcXHctXSokLyxcbiAgICBodG1sUmUgPSAvPC4rPi8sXG4gICAgdGFnUmUgPSAvXlxcdyskLzsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMuanNcblxuZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSB7XG4gICAgY29udGV4dCA9IGRvYztcbiAgfVxuXG4gIHJldHVybiBjbGFzc1JlLnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yLnNsaWNlKDEpKSA6IHRhZ1JlLnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufSAvLyBAcmVxdWlyZSAuL2ZpbmQuanNcbi8vIEByZXF1aXJlIC4vdmFyaWFibGVzLmpzXG5cblxuZnVuY3Rpb24gQ2FzaChzZWxlY3RvciwgY29udGV4dCkge1xuICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSB7XG4gICAgY29udGV4dCA9IGRvYztcbiAgfVxuXG4gIGlmICghc2VsZWN0b3IpIHJldHVybjtcbiAgaWYgKHNlbGVjdG9yLl9fY2FzaCkgcmV0dXJuIHNlbGVjdG9yO1xuICB2YXIgZWxlcyA9IHNlbGVjdG9yO1xuXG4gIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICBpZiAoY29udGV4dC5fX2Nhc2gpIGNvbnRleHQgPSBjb250ZXh0WzBdO1xuICAgIGVsZXMgPSBpZFJlLnRlc3Qoc2VsZWN0b3IpID8gY29udGV4dC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zbGljZSgxKSkgOiBodG1sUmUudGVzdChzZWxlY3RvcikgPyBwYXJzZUhUTUwoc2VsZWN0b3IpIDogZmluZChzZWxlY3RvciwgY29udGV4dCk7XG4gICAgaWYgKCFlbGVzKSByZXR1cm47XG4gIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkeShzZWxlY3Rvcik7IC8vRklYTUU6IGBmbi5yZWFkeWAgaXMgbm90IGluY2x1ZGVkIGluIGBjb3JlYCwgYnV0IGl0J3MgYWN0dWFsbHkgYSBjb3JlIGZ1bmN0aW9uYWxpdHlcbiAgfVxuXG4gIGlmIChlbGVzLm5vZGVUeXBlIHx8IGVsZXMgPT09IHdpbikgZWxlcyA9IFtlbGVzXTtcbiAgdGhpcy5sZW5ndGggPSBlbGVzLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IGVsZXNbaV07XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FzaChzZWxlY3RvciwgY29udGV4dCkge1xuICByZXR1cm4gbmV3IENhc2goc2VsZWN0b3IsIGNvbnRleHQpO1xufVxuLyogUFJPVE9UWVBFICovXG5cblxudmFyIGZuID0gY2FzaC5mbiA9IGNhc2gucHJvdG90eXBlID0gQ2FzaC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBjYXNoLFxuICBfX2Nhc2g6IHRydWUsXG4gIGxlbmd0aDogMCxcbiAgc3BsaWNlOiBzcGxpY2UgLy8gRW5zdXJlcyBhIGNhc2ggY29sbGVjdGlvbiBnZXRzIHByaW50ZWQgYXMgYXJyYXktbGlrZSBpbiBDaHJvbWVcblxufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuXG5mbi5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHJldHVybiBzbGljZS5jYWxsKHRoaXMpO1xuICByZXR1cm4gdGhpc1tpbmRleCA8IDAgPyBpbmRleCArIHRoaXMubGVuZ3RoIDogaW5kZXhdO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSAuL2dldC5qc1xuXG5cbmZuLmVxID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIHJldHVybiBjYXNoKHRoaXMuZ2V0KGluZGV4KSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIC4vZXEuanNcblxuXG5mbi5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZXEoMCk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIC4vZXEuanNcblxuXG5mbi5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lcSgtMSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLmpzXG5cblxuZm4ubWFwID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYXNoKG1hcC5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pKTtcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMuanNcblxuXG5mbi5zbGljZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhc2goc2xpY2UuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG59OyAvLyBAcmVxdWlyZSAuL2Nhc2guanNcblxuXG52YXIgY2FtZWxDYXNlUmUgPSAvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csXG4gICAgY2FtZWxDYXNlV2hpdGVzcGFjZVJlID0gL1tcXHMtX10rL2c7XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsQ2FzZVJlLCBmdW5jdGlvbiAobGV0dGVyLCBpbmRleCkge1xuICAgIHJldHVybiBsZXR0ZXJbIWluZGV4ID8gJ3RvTG93ZXJDYXNlJyA6ICd0b1VwcGVyQ2FzZSddKCk7XG4gIH0pLnJlcGxhY2UoY2FtZWxDYXNlV2hpdGVzcGFjZVJlLCAnJyk7XG59XG5cbjtcbmNhc2guY2FtZWxDYXNlID0gY2FtZWxDYXNlOyAvLyBAcmVxdWlyZSAuL2Nhc2guanNcblxuZnVuY3Rpb24gZWFjaChhcnIsIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltpXSwgYXJyW2ldLCBpLCBhcnIpID09PSBmYWxzZSkgYnJlYWs7XG4gIH1cbn1cblxuY2FzaC5lYWNoID0gZWFjaDsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2VhY2guanNcblxuZm4uZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBlYWNoKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG5cblxuZm4ucmVtb3ZlUHJvcCA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGRlbGV0ZSBlbGVbcHJvcF07XG4gIH0pO1xufTsgLy8gQHJlcXVpcmUgLi9jYXNoLmpzXG5cblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuICBpZiAodGFyZ2V0ID09PSB2b2lkIDApIHtcbiAgICB0YXJnZXQgPSB0aGlzO1xuICB9XG5cbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICBsZW5ndGggPSBhcmdzLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gbGVuZ3RoIDwgMiA/IDAgOiAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYXJnc1tpXSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBhcmdzW2ldW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuO1xuY2FzaC5leHRlbmQgPSBmbi5leHRlbmQgPSBleHRlbmQ7IC8vIEByZXF1aXJlIC4vY2FzaC5qc1xuXG52YXIgZ3VpZCA9IDE7XG5jYXNoLmd1aWQgPSBndWlkOyAvLyBAcmVxdWlyZSAuL2Nhc2guanNcblxuZnVuY3Rpb24gbWF0Y2hlcyhlbGUsIHNlbGVjdG9yKSB7XG4gIHZhciBtYXRjaGVzID0gZWxlICYmIChlbGUubWF0Y2hlcyB8fCBlbGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWxlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsZS5vTWF0Y2hlc1NlbGVjdG9yKTtcbiAgcmV0dXJuICEhbWF0Y2hlcyAmJiBtYXRjaGVzLmNhbGwoZWxlLCBzZWxlY3Rvcik7XG59XG5cbmNhc2gubWF0Y2hlcyA9IG1hdGNoZXM7IC8vIEByZXF1aXJlIC4vY2FzaC5qc1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuXG5jYXNoLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1N0cmluZyh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ3N0cmluZyc7XG59XG5cbmNhc2guaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNOdW1lcmljKHgpIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHgpKSAmJiBpc0Zpbml0ZSh4KTtcbn1cblxuY2FzaC5pc051bWVyaWMgPSBpc051bWVyaWM7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5jYXNoLmlzQXJyYXkgPSBpc0FycmF5OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG5cbmZuLnByb3AgPSBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcbiAgaWYgKCFwcm9wKSByZXR1cm47XG5cbiAgaWYgKGlzU3RyaW5nKHByb3ApKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiB0aGlzWzBdW3Byb3BdO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgZWxlW3Byb3BdID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgIHRoaXMucHJvcChrZXksIHByb3Bba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIC4vbWF0Y2hlcy5qc1xuLy8gQHJlcXVpcmUgLi90eXBlX2NoZWNraW5nLmpzXG5cblxuZnVuY3Rpb24gZ2V0Q29tcGFyZUZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpc1N0cmluZyhzZWxlY3RvcikgPyBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIG1hdGNoZXMoZWxlLCBzZWxlY3Rvcik7XG4gIH0gOiBzZWxlY3Rvci5fX2Nhc2ggPyBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yLmlzKGVsZSk7XG4gIH0gOiBmdW5jdGlvbiAoaSwgZWxlLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBlbGUgPT09IHNlbGVjdG9yO1xuICB9O1xufSAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvZ2V0X2NvbXBhcmVfZnVuY3Rpb24uanNcbi8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy5qc1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMuanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZ2V0LmpzXG5cblxuZm4uZmlsdGVyID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIGlmICghc2VsZWN0b3IpIHJldHVybiBjYXNoKCk7XG4gIHZhciBjb21wYXJhdG9yID0gaXNGdW5jdGlvbihzZWxlY3RvcikgPyBzZWxlY3RvciA6IGdldENvbXBhcmVGdW5jdGlvbihzZWxlY3Rvcik7XG4gIHJldHVybiBjYXNoKGZpbHRlci5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY29tcGFyYXRvci5jYWxsKGVsZSwgaSwgZWxlLCBzZWxlY3Rvcik7XG4gIH0pKTtcbn07IC8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy5qc1xuXG5cbnZhciBzcGxpdFZhbHVlc1JlID0gL1xcUysvZztcblxuZnVuY3Rpb24gZ2V0U3BsaXRWYWx1ZXMoc3RyKSB7XG4gIHJldHVybiBpc1N0cmluZyhzdHIpID8gc3RyLm1hdGNoKHNwbGl0VmFsdWVzUmUpIHx8IFtdIDogW107XG59IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9nZXRfc3BsaXRfdmFsdWVzLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2VhY2guanNcblxuXG5mbi5oYXNDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgdmFyIGNsYXNzZXMgPSBnZXRTcGxpdFZhbHVlcyhjbHMpO1xuICB2YXIgY2hlY2sgPSBmYWxzZTtcblxuICBpZiAoY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgY2hlY2sgPSBlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzZXNbMF0pO1xuICAgICAgcmV0dXJuICFjaGVjaztcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBjaGVjaztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9nZXRfc3BsaXRfdmFsdWVzLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2VhY2guanNcblxuXG5mbi5yZW1vdmVBdHRyID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgdmFyIGF0dHJzID0gZ2V0U3BsaXRWYWx1ZXMoYXR0cik7XG4gIGlmICghYXR0cnMubGVuZ3RoKSByZXR1cm4gdGhpcztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgZWFjaChhdHRycywgZnVuY3Rpb24gKGEpIHtcbiAgICAgIGVsZS5yZW1vdmVBdHRyaWJ1dGUoYSk7XG4gICAgfSk7XG4gIH0pO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3R5cGVfY2hlY2tpbmcuanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZWFjaC5qc1xuLy8gQHJlcXVpcmUgLi9yZW1vdmVfYXR0ci5qc1xuXG5cbmZuLmF0dHIgPSBmdW5jdGlvbiAoYXR0ciwgdmFsdWUpIHtcbiAgaWYgKCFhdHRyKSByZXR1cm47XG5cbiAgaWYgKGlzU3RyaW5nKGF0dHIpKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBpZiAoIXRoaXNbMF0pIHJldHVybjtcblxuICAgICAgdmFyIF92YWx1ZSA9IHRoaXNbMF0uZ2V0QXR0cmlidXRlKGF0dHIpO1xuXG4gICAgICByZXR1cm4gX3ZhbHVlID09PSBudWxsID8gdW5kZWZpbmVkIDogX3ZhbHVlO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIHRoaXMucmVtb3ZlQXR0cihhdHRyKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGF0dHIpIHtcbiAgICB0aGlzLmF0dHIoa2V5LCBhdHRyW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvZWFjaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9nZXRfc3BsaXRfdmFsdWVzLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2VhY2guanNcblxuXG5mbi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChjbHMsIGZvcmNlKSB7XG4gIHZhciBjbGFzc2VzID0gZ2V0U3BsaXRWYWx1ZXMoY2xzKSxcbiAgICAgIGlzRm9yY2UgPSBmb3JjZSAhPT0gdW5kZWZpbmVkO1xuICBpZiAoIWNsYXNzZXMubGVuZ3RoKSByZXR1cm4gdGhpcztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgZWFjaChjbGFzc2VzLCBmdW5jdGlvbiAoYykge1xuICAgICAgaWYgKGlzRm9yY2UpIHtcbiAgICAgICAgZm9yY2UgPyBlbGUuY2xhc3NMaXN0LmFkZChjKSA6IGVsZS5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLmNsYXNzTGlzdC50b2dnbGUoYyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSAuL3RvZ2dsZV9jbGFzcy5qc1xuXG5cbmZuLmFkZENsYXNzID0gZnVuY3Rpb24gKGNscykge1xuICByZXR1cm4gdGhpcy50b2dnbGVDbGFzcyhjbHMsIHRydWUpO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSAuL2F0dHIuanNcbi8vIEByZXF1aXJlIC4vdG9nZ2xlX2NsYXNzLmpzXG5cblxuZm4ucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gIHJldHVybiAhYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMuYXR0cignY2xhc3MnLCAnJykgOiB0aGlzLnRvZ2dsZUNsYXNzKGNscywgZmFsc2UpO1xufTsgLy8gQG9wdGlvbmFsIC4vYWRkX2NsYXNzLmpzXG4vLyBAb3B0aW9uYWwgLi9hdHRyLmpzXG4vLyBAb3B0aW9uYWwgLi9oYXNfY2xhc3MuanNcbi8vIEBvcHRpb25hbCAuL3Byb3AuanNcbi8vIEBvcHRpb25hbCAuL3JlbW92ZV9hdHRyLmpzXG4vLyBAb3B0aW9uYWwgLi9yZW1vdmVfY2xhc3MuanNcbi8vIEBvcHRpb25hbCAuL3JlbW92ZV9wcm9wLmpzXG4vLyBAb3B0aW9uYWwgLi90b2dnbGVfY2xhc3MuanNcbi8vIEByZXF1aXJlIC4vY2FzaC5qc1xuXG5cbmZ1bmN0aW9uIHVuaXF1ZShhcnIpIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0sIGluZGV4LCBzZWxmKSB7XG4gICAgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XG4gIH0pO1xufVxuXG5jYXNoLnVuaXF1ZSA9IHVuaXF1ZTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3VuaXF1ZS5qc1xuLy8gQHJlcXVpcmUgLi9nZXQuanNcblxuZm4uYWRkID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHJldHVybiBjYXNoKHVuaXF1ZSh0aGlzLmdldCgpLmNvbmNhdChjYXNoKHNlbGVjdG9yLCBjb250ZXh0KS5nZXQoKSkpKTtcbn07IC8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLmpzXG5cblxuZnVuY3Rpb24gY29tcHV0ZVN0eWxlKGVsZSwgcHJvcCwgaXNWYXJpYWJsZSkge1xuICBpZiAoZWxlLm5vZGVUeXBlICE9PSAxKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsZSwgbnVsbCk7XG4gIHJldHVybiBwcm9wID8gaXNWYXJpYWJsZSA/IHN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkgOiBzdHlsZVtwcm9wXSA6IHN0eWxlO1xufSAvLyBAcmVxdWlyZSAuL2NvbXB1dGVfc3R5bGUuanNcblxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVJbnQoZWxlLCBwcm9wKSB7XG4gIHJldHVybiBwYXJzZUludChjb21wdXRlU3R5bGUoZWxlLCBwcm9wKSwgMTApIHx8IDA7XG59XG5cbnZhciBjc3NWYXJpYWJsZVJlID0gL14tLS87IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLmpzXG5cbmZ1bmN0aW9uIGlzQ1NTVmFyaWFibGUocHJvcCkge1xuICByZXR1cm4gY3NzVmFyaWFibGVSZS50ZXN0KHByb3ApO1xufSAvLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UuanNcbi8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUuanNcblxuXG52YXIgcHJlZml4ZWRQcm9wcyA9IHt9LFxuICAgIF9kb2MkY3JlYXRlRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBzdHlsZSA9IF9kb2MkY3JlYXRlRWxlbWVudC5zdHlsZSxcbiAgICB2ZW5kb3JzUHJlZml4ZXMgPSBbJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbyddO1xuXG5mdW5jdGlvbiBnZXRQcmVmaXhlZFByb3AocHJvcCwgaXNWYXJpYWJsZSkge1xuICBpZiAoaXNWYXJpYWJsZSA9PT0gdm9pZCAwKSB7XG4gICAgaXNWYXJpYWJsZSA9IGlzQ1NTVmFyaWFibGUocHJvcCk7XG4gIH1cblxuICBpZiAoaXNWYXJpYWJsZSkgcmV0dXJuIHByb3A7XG5cbiAgaWYgKCFwcmVmaXhlZFByb3BzW3Byb3BdKSB7XG4gICAgdmFyIHByb3BDQyA9IGNhbWVsQ2FzZShwcm9wKSxcbiAgICAgICAgcHJvcFVDID0gXCJcIiArIHByb3BDQy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BDQy5zbGljZSgxKSxcbiAgICAgICAgcHJvcHMgPSAocHJvcENDICsgXCIgXCIgKyB2ZW5kb3JzUHJlZml4ZXMuam9pbihwcm9wVUMgKyBcIiBcIikgKyBwcm9wVUMpLnNwbGl0KCcgJyk7XG4gICAgZWFjaChwcm9wcywgZnVuY3Rpb24gKHApIHtcbiAgICAgIGlmIChwIGluIHN0eWxlKSB7XG4gICAgICAgIHByZWZpeGVkUHJvcHNbcHJvcF0gPSBwO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcHJlZml4ZWRQcm9wc1twcm9wXTtcbn1cblxuO1xuY2FzaC5wcmVmaXhlZFByb3AgPSBnZXRQcmVmaXhlZFByb3A7IC8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy5qc1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUuanNcblxudmFyIG51bWVyaWNQcm9wcyA9IHtcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFNocmluazogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgbGluZUhlaWdodDogdHJ1ZSxcbiAgb3BhY2l0eTogdHJ1ZSxcbiAgb3JkZXI6IHRydWUsXG4gIG9ycGhhbnM6IHRydWUsXG4gIHdpZG93czogdHJ1ZSxcbiAgekluZGV4OiB0cnVlXG59O1xuXG5mdW5jdGlvbiBnZXRTdWZmaXhlZFZhbHVlKHByb3AsIHZhbHVlLCBpc1ZhcmlhYmxlKSB7XG4gIGlmIChpc1ZhcmlhYmxlID09PSB2b2lkIDApIHtcbiAgICBpc1ZhcmlhYmxlID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgfVxuXG4gIHJldHVybiAhaXNWYXJpYWJsZSAmJiAhbnVtZXJpY1Byb3BzW3Byb3BdICYmIGlzTnVtZXJpYyh2YWx1ZSkgPyB2YWx1ZSArIFwicHhcIiA6IHZhbHVlO1xufSAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvY29tcHV0ZV9zdHlsZS5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL2dldF9wcmVmaXhlZF9wcm9wLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvZ2V0X3N1ZmZpeGVkX3ZhbHVlLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvaXNfY3NzX3ZhcmlhYmxlLmpzXG5cblxuZm4uY3NzID0gZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gIGlmIChpc1N0cmluZyhwcm9wKSkge1xuICAgIHZhciBpc1ZhcmlhYmxlID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgICBwcm9wID0gZ2V0UHJlZml4ZWRQcm9wKHByb3AsIGlzVmFyaWFibGUpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIHRoaXNbMF0gJiYgY29tcHV0ZVN0eWxlKHRoaXNbMF0sIHByb3AsIGlzVmFyaWFibGUpO1xuICAgIGlmICghcHJvcCkgcmV0dXJuIHRoaXM7XG4gICAgdmFsdWUgPSBnZXRTdWZmaXhlZFZhbHVlKHByb3AsIHZhbHVlLCBpc1ZhcmlhYmxlKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmIChlbGUubm9kZVR5cGUgIT09IDEpIHJldHVybjtcblxuICAgICAgaWYgKGlzVmFyaWFibGUpIHtcbiAgICAgICAgZWxlLnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZS5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3ApIHtcbiAgICB0aGlzLmNzcyhrZXksIHByb3Bba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07IC8vIEBvcHRpb25hbCAuL2Nzcy5qc1xuXG5cbnZhciBkYXRhTmFtZXNwYWNlID0gJ19fY2FzaERhdGEnLFxuICAgIGRhdGFBdHRyaWJ1dGVSZSA9IC9eZGF0YS0oLiopLzsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvdmFyaWFibGVzLmpzXG5cbmNhc2guaGFzRGF0YSA9IGZ1bmN0aW9uIChlbGUpIHtcbiAgcmV0dXJuIGRhdGFOYW1lc3BhY2UgaW4gZWxlO1xufTsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMuanNcblxuXG5mdW5jdGlvbiBnZXREYXRhQ2FjaGUoZWxlKSB7XG4gIHJldHVybiBlbGVbZGF0YU5hbWVzcGFjZV0gPSBlbGVbZGF0YU5hbWVzcGFjZV0gfHwge307XG59IC8vIEByZXF1aXJlIGF0dHJpYnV0ZXMvYXR0ci5qc1xuLy8gQHJlcXVpcmUgLi9nZXRfZGF0YV9jYWNoZS5qc1xuXG5cbmZ1bmN0aW9uIGdldERhdGEoZWxlLCBrZXkpIHtcbiAgdmFyIGNhY2hlID0gZ2V0RGF0YUNhY2hlKGVsZSk7XG5cbiAgaWYgKGtleSkge1xuICAgIGlmICghKGtleSBpbiBjYWNoZSkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGVsZS5kYXRhc2V0ID8gZWxlLmRhdGFzZXRba2V5XSB8fCBlbGUuZGF0YXNldFtjYW1lbENhc2Uoa2V5KV0gOiBjYXNoKGVsZSkuYXR0cihcImRhdGEtXCIgKyBrZXkpO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgY2FjaGVba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYWNoZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlO1xufSAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy5qc1xuLy8gQHJlcXVpcmUgLi9nZXRfZGF0YV9jYWNoZS5qc1xuXG5cbmZ1bmN0aW9uIHJlbW92ZURhdGEoZWxlLCBrZXkpIHtcbiAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZGVsZXRlIGVsZVtkYXRhTmFtZXNwYWNlXTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgZ2V0RGF0YUNhY2hlKGVsZSlba2V5XTtcbiAgfVxufSAvLyBAcmVxdWlyZSAuL2dldF9kYXRhX2NhY2hlLmpzXG5cblxuZnVuY3Rpb24gc2V0RGF0YShlbGUsIGtleSwgdmFsdWUpIHtcbiAgZ2V0RGF0YUNhY2hlKGVsZSlba2V5XSA9IHZhbHVlO1xufSAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvZ2V0X2RhdGEuanNcbi8vIEByZXF1aXJlIC4vaGVscGVycy9zZXRfZGF0YS5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL3ZhcmlhYmxlcy5qc1xuXG5cbmZuLmRhdGEgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAoIW5hbWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHJldHVybjtcbiAgICBlYWNoKHRoaXNbMF0uYXR0cmlidXRlcywgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgIHZhciBtYXRjaCA9IGF0dHIubmFtZS5tYXRjaChkYXRhQXR0cmlidXRlUmUpO1xuICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuO1xuXG4gICAgICBfdGhpcy5kYXRhKG1hdGNoWzFdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ2V0RGF0YSh0aGlzWzBdKTtcbiAgfVxuXG4gIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpc1swXSAmJiBnZXREYXRhKHRoaXNbMF0sIG5hbWUpO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgcmV0dXJuIHNldERhdGEoZWxlLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgIHRoaXMuZGF0YShrZXksIG5hbWVba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvcmVtb3ZlX2RhdGEuanNcblxuXG5mbi5yZW1vdmVEYXRhID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gcmVtb3ZlRGF0YShlbGUsIGtleSk7XG4gIH0pO1xufTsgLy8gQG9wdGlvbmFsIC4vZGF0YS5qc1xuLy8gQG9wdGlvbmFsIC4vcmVtb3ZlX2RhdGEuanNcbi8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGVfaW50LmpzXG5cblxuZnVuY3Rpb24gZ2V0RXh0cmFTcGFjZShlbGUsIHhBeGlzKSB7XG4gIHJldHVybiBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpICsgXCJXaWR0aFwiKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSkgKyBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSArIFwiV2lkdGhcIik7XG59IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuXG5cbmVhY2goWydXaWR0aCcsICdIZWlnaHQnXSwgZnVuY3Rpb24gKHByb3ApIHtcbiAgZm5bXCJpbm5lclwiICsgcHJvcF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzWzBdKSByZXR1cm47XG4gICAgaWYgKHRoaXNbMF0gPT09IHdpbikgcmV0dXJuIHdpbltcImlubmVyXCIgKyBwcm9wXTtcbiAgICByZXR1cm4gdGhpc1swXVtcImNsaWVudFwiICsgcHJvcF07XG4gIH07XG59KTsgLy8gQHJlcXVpcmUgY29yZS9jYW1lbF9jYXNlLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvZWFjaC5qc1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMuanNcbi8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGUuanNcbi8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2dldF9zdWZmaXhlZF92YWx1ZS5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL2dldF9leHRyYV9zcGFjZS5qc1xuXG5lYWNoKFsnd2lkdGgnLCAnaGVpZ2h0J10sIGZ1bmN0aW9uIChwcm9wLCBpbmRleCkge1xuICBmbltwcm9wXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdGhpc1swXSkgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiB0aGlzO1xuXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpc1swXSA9PT0gd2luKSByZXR1cm4gdGhpc1swXVtjYW1lbENhc2UoXCJvdXRlci1cIiArIHByb3ApXTtcbiAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3Byb3BdIC0gZ2V0RXh0cmFTcGFjZSh0aGlzWzBdLCAhaW5kZXgpO1xuICAgIH1cblxuICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmIChlbGUubm9kZVR5cGUgIT09IDEpIHJldHVybjtcbiAgICAgIHZhciBib3hTaXppbmcgPSBjb21wdXRlU3R5bGUoZWxlLCAnYm94U2l6aW5nJyk7XG4gICAgICBlbGUuc3R5bGVbcHJvcF0gPSBnZXRTdWZmaXhlZFZhbHVlKHByb3AsIHZhbHVlICsgKGJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnID8gZ2V0RXh0cmFTcGFjZShlbGUsICFpbmRleCkgOiAwKSk7XG4gICAgfSk7XG4gIH07XG59KTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2VhY2guanNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLmpzXG4vLyBAcmVxdWlyZSBjc3MvaGVscGVycy9jb21wdXRlX3N0eWxlX2ludC5qc1xuXG5lYWNoKFsnV2lkdGgnLCAnSGVpZ2h0J10sIGZ1bmN0aW9uIChwcm9wLCBpbmRleCkge1xuICBmbltcIm91dGVyXCIgKyBwcm9wXSA9IGZ1bmN0aW9uIChpbmNsdWRlTWFyZ2lucykge1xuICAgIGlmICghdGhpc1swXSkgcmV0dXJuO1xuICAgIGlmICh0aGlzWzBdID09PSB3aW4pIHJldHVybiB3aW5bXCJvdXRlclwiICsgcHJvcF07XG4gICAgcmV0dXJuIHRoaXNbMF1bXCJvZmZzZXRcIiArIHByb3BdICsgKGluY2x1ZGVNYXJnaW5zID8gY29tcHV0ZVN0eWxlSW50KHRoaXNbMF0sIFwibWFyZ2luXCIgKyAoIWluZGV4ID8gJ0xlZnQnIDogJ1RvcCcpKSArIGNvbXB1dGVTdHlsZUludCh0aGlzWzBdLCBcIm1hcmdpblwiICsgKCFpbmRleCA/ICdSaWdodCcgOiAnQm90dG9tJykpIDogMCk7XG4gIH07XG59KTsgLy8gQG9wdGlvbmFsIC4vaW5uZXIuanNcbi8vIEBvcHRpb25hbCAuL25vcm1hbC5qc1xuLy8gQG9wdGlvbmFsIC4vb3V0ZXIuanNcblxuZnVuY3Rpb24gaGFzTmFtZXNwYWNlcyhuczEsIG5zMikge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IG5zMi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAobnMxLmluZGV4T2YobnMyW2ldKSA8IDApIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufSAvLyBAcmVxdWlyZSBjb3JlL2VhY2guanNcblxuXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyhjYWNoZSwgZWxlLCBuYW1lKSB7XG4gIGVhY2goY2FjaGVbbmFtZV0sIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIG5hbWVzcGFjZXMgPSBfcmVmWzBdLFxuICAgICAgICBjYWxsYmFjayA9IF9yZWZbMV07XG4gICAgZWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spO1xuICB9KTtcbiAgZGVsZXRlIGNhY2hlW25hbWVdO1xufVxuXG52YXIgZXZlbnRzTmFtZXNwYWNlID0gJ19fY2FzaEV2ZW50cycsXG4gICAgZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvciA9ICcuJzsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMuanNcblxuZnVuY3Rpb24gZ2V0RXZlbnRzQ2FjaGUoZWxlKSB7XG4gIHJldHVybiBlbGVbZXZlbnRzTmFtZXNwYWNlXSA9IGVsZVtldmVudHNOYW1lc3BhY2VdIHx8IHt9O1xufSAvLyBAcmVxdWlyZSBjb3JlL2d1aWQuanNcbi8vIEByZXF1aXJlIGV2ZW50cy9oZWxwZXJzL2dldF9ldmVudHNfY2FjaGUuanNcblxuXG5mdW5jdGlvbiBhZGRFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrLmd1aWQgPSBjYWxsYmFjay5ndWlkIHx8IGd1aWQrKztcbiAgdmFyIGV2ZW50Q2FjaGUgPSBnZXRFdmVudHNDYWNoZShlbGUpO1xuICBldmVudENhY2hlW25hbWVdID0gZXZlbnRDYWNoZVtuYW1lXSB8fCBbXTtcbiAgZXZlbnRDYWNoZVtuYW1lXS5wdXNoKFtuYW1lc3BhY2VzLCBjYWxsYmFja10pO1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFjayk7XG59IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLmpzXG5cblxuZnVuY3Rpb24gcGFyc2VFdmVudE5hbWUoZXZlbnROYW1lKSB7XG4gIHZhciBwYXJ0cyA9IGV2ZW50TmFtZS5zcGxpdChldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yKTtcbiAgcmV0dXJuIFtwYXJ0c1swXSwgcGFydHMuc2xpY2UoMSkuc29ydCgpXTsgLy8gW25hbWUsIG5hbWVzcGFjZXNdXG59IC8vIEByZXF1aXJlIGNvcmUvZ3VpZC5qc1xuLy8gQHJlcXVpcmUgLi9nZXRfZXZlbnRzX2NhY2hlLmpzXG4vLyBAcmVxdWlyZSAuL2hhc19uYW1lc3BhY2VzLmpzXG4vLyBAcmVxdWlyZSAuL3BhcnNlX2V2ZW50X25hbWUuanNcbi8vIEByZXF1aXJlIC4vcmVtb3ZlX2V2ZW50X2xpc3RlbmVycy5qc1xuXG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgY2FsbGJhY2spIHtcbiAgdmFyIGNhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcblxuICBpZiAoIW5hbWUpIHtcbiAgICBpZiAoIW5hbWVzcGFjZXMgfHwgIW5hbWVzcGFjZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKG5hbWUgaW4gY2FjaGUpIHtcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoY2FjaGUsIGVsZSwgbmFtZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobmFtZSBpbiBjYWNoZSkge1xuICAgICAgICByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGV2ZW50Q2FjaGUgPSBjYWNoZVtuYW1lXTtcbiAgICBpZiAoIWV2ZW50Q2FjaGUpIHJldHVybjtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmd1aWQgPSBjYWxsYmFjay5ndWlkIHx8IGd1aWQrKztcbiAgICBjYWNoZVtuYW1lXSA9IGV2ZW50Q2FjaGUuZmlsdGVyKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIG5zID0gX3JlZjJbMF0sXG4gICAgICAgICAgY2IgPSBfcmVmMlsxXTtcbiAgICAgIGlmIChjYWxsYmFjayAmJiBjYi5ndWlkICE9PSBjYWxsYmFjay5ndWlkIHx8ICFoYXNOYW1lc3BhY2VzKG5zLCBuYW1lc3BhY2VzKSkgcmV0dXJuIHRydWU7XG4gICAgICBlbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBjYik7XG4gICAgfSk7XG4gIH1cbn0gLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2VhY2guanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZWFjaC5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL3BhcnNlX2V2ZW50X25hbWUuanNcbi8vIEByZXF1aXJlIC4vaGVscGVycy9yZW1vdmVfZXZlbnQuanNcblxuXG5mbi5vZmYgPSBmdW5jdGlvbiAoZXZlbnRGdWxsTmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgaWYgKGV2ZW50RnVsbE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlRXZlbnQoZWxlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBlYWNoKGdldFNwbGl0VmFsdWVzKGV2ZW50RnVsbE5hbWUpLCBmdW5jdGlvbiAoZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdmFyIF9wYXJzZUV2ZW50TmFtZSA9IHBhcnNlRXZlbnROYW1lKGV2ZW50RnVsbE5hbWUpLFxuICAgICAgICAgIG5hbWUgPSBfcGFyc2VFdmVudE5hbWVbMF0sXG4gICAgICAgICAgbmFtZXNwYWNlcyA9IF9wYXJzZUV2ZW50TmFtZVsxXTtcblxuICAgICAgX3RoaXMyLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2dldF9zcGxpdF92YWx1ZXMuanNcbi8vIEByZXF1aXJlIGNvcmUvZ3VpZC5qc1xuLy8gQHJlcXVpcmUgY29yZS9tYXRjaGVzLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3R5cGVfY2hlY2tpbmcuanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZWFjaC5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL3ZhcmlhYmxlcy5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL2FkZF9ldmVudC5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL2hhc19uYW1lc3BhY2VzLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvcGFyc2VfZXZlbnRfbmFtZS5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL3JlbW92ZV9ldmVudC5qc1xuXG5cbmZuLm9uID0gZnVuY3Rpb24gKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaywgX29uZSkge1xuICB2YXIgX3RoaXMzID0gdGhpcztcblxuICBpZiAoIWlzU3RyaW5nKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHRoaXMub24oa2V5LCBzZWxlY3RvciwgZXZlbnRGdWxsTmFtZVtrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgIGNhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBmYWxzZTtcbiAgfVxuXG4gIGVhY2goZ2V0U3BsaXRWYWx1ZXMoZXZlbnRGdWxsTmFtZSksIGZ1bmN0aW9uIChldmVudEZ1bGxOYW1lKSB7XG4gICAgdmFyIF9wYXJzZUV2ZW50TmFtZTIgPSBwYXJzZUV2ZW50TmFtZShldmVudEZ1bGxOYW1lKSxcbiAgICAgICAgbmFtZSA9IF9wYXJzZUV2ZW50TmFtZTJbMF0sXG4gICAgICAgIG5hbWVzcGFjZXMgPSBfcGFyc2VFdmVudE5hbWUyWzFdO1xuXG4gICAgX3RoaXMzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgdmFyIGZpbmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiBmaW5hbENhbGxiYWNrKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5uYW1lc3BhY2UgJiYgIWhhc05hbWVzcGFjZXMobmFtZXNwYWNlcywgZXZlbnQubmFtZXNwYWNlLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpKSkgcmV0dXJuO1xuICAgICAgICB2YXIgdGhpc0FyZyA9IGVsZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgICAgd2hpbGUgKCFtYXRjaGVzKHRhcmdldCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGUpIHJldHVybjtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzQXJnID0gdGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQubmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlIHx8ICcnO1xuICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGV2ZW50LCBldmVudC5kYXRhKTtcblxuICAgICAgICBpZiAoX29uZSkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgZmluYWxDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0dXJuVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmluYWxDYWxsYmFjay5ndWlkID0gY2FsbGJhY2suZ3VpZCA9IGNhbGxiYWNrLmd1aWQgfHwgZ3VpZCsrO1xuICAgICAgYWRkRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBmaW5hbENhbGxiYWNrKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSAuL29uLmpzXG5cblxuZm4ub25lID0gZnVuY3Rpb24gKGV2ZW50RnVsbE5hbWUsIGRlbGVnYXRlLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5vbihldmVudEZ1bGxOYW1lLCBkZWxlZ2F0ZSwgY2FsbGJhY2ssIHRydWUpO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuXG5cbmZuLnJlYWR5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHZhciBmaW5hbENhbGxiYWNrID0gZnVuY3Rpb24gZmluYWxDYWxsYmFjaygpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soY2FzaCk7XG4gIH07XG5cbiAgaWYgKGRvYy5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgICBzZXRUaW1lb3V0KGZpbmFsQ2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZmluYWxDYWxsYmFjayk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvcGFyc2VfZXZlbnRfbmFtZS5qc1xuLy8gQHJlcXVpcmUgLi9oZWxwZXJzL3ZhcmlhYmxlcy5qc1xuXG5cbmZuLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnRGdWxsTmFtZSwgZGF0YSkge1xuICB2YXIgZXZ0ID0gZXZlbnRGdWxsTmFtZTtcblxuICBpZiAoaXNTdHJpbmcoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICB2YXIgX3BhcnNlRXZlbnROYW1lMyA9IHBhcnNlRXZlbnROYW1lKGV2ZW50RnVsbE5hbWUpLFxuICAgICAgICBuYW1lID0gX3BhcnNlRXZlbnROYW1lM1swXSxcbiAgICAgICAgbmFtZXNwYWNlcyA9IF9wYXJzZUV2ZW50TmFtZTNbMV07XG5cbiAgICBldnQgPSBkb2MuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICBldnQuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUpO1xuICAgIGV2dC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcik7XG4gIH1cblxuICBldnQuZGF0YSA9IGRhdGE7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGVsZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH0pO1xufTsgLy8gQG9wdGlvbmFsIC4vb2ZmLmpzXG4vLyBAb3B0aW9uYWwgLi9vbi5qc1xuLy8gQG9wdGlvbmFsIC4vb25lLmpzXG4vLyBAb3B0aW9uYWwgLi9yZWFkeS5qc1xuLy8gQG9wdGlvbmFsIC4vdHJpZ2dlci5qc1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLmpzXG5cblxuZnVuY3Rpb24gZ2V0VmFsdWVTZWxlY3RNdWx0aXBsZShlbGUpIHtcbiAgdmFyIHZhbHVlcyA9IFtdO1xuICBlYWNoKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgaWYgKG9wdGlvbi5zZWxlY3RlZCAmJiAhb3B0aW9uLmRpc2FibGVkICYmICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCkge1xuICAgICAgdmFsdWVzLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZVNlbGVjdFNpbmdsZShlbGUpIHtcbiAgcmV0dXJuIGVsZS5zZWxlY3RlZEluZGV4IDwgMCA/IG51bGwgOiBlbGUub3B0aW9uc1tlbGUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG59IC8vIEByZXF1aXJlIC4vZ2V0X3ZhbHVlX3NlbGVjdF9zaW5nbGUuanNcbi8vIEByZXF1aXJlIC4vZ2V0X3ZhbHVlX3NlbGVjdF9tdWx0aXBsZS5qc1xuXG5cbnZhciBzZWxlY3RPbmVSZSA9IC9zZWxlY3Qtb25lL2ksXG4gICAgc2VsZWN0TXVsdGlwbGVSZSA9IC9zZWxlY3QtbXVsdGlwbGUvaTtcblxuZnVuY3Rpb24gZ2V0VmFsdWUoZWxlKSB7XG4gIHZhciB0eXBlID0gZWxlLnR5cGU7XG4gIGlmIChzZWxlY3RPbmVSZS50ZXN0KHR5cGUpKSByZXR1cm4gZ2V0VmFsdWVTZWxlY3RTaW5nbGUoZWxlKTtcbiAgaWYgKHNlbGVjdE11bHRpcGxlUmUudGVzdCh0eXBlKSkgcmV0dXJuIGdldFZhbHVlU2VsZWN0TXVsdGlwbGUoZWxlKTtcbiAgcmV0dXJuIGVsZS52YWx1ZTtcbn1cblxudmFyIHF1ZXJ5RW5jb2RlU3BhY2VSZSA9IC8lMjAvZztcblxuZnVuY3Rpb24gcXVlcnlFbmNvZGUocHJvcCwgdmFsdWUpIHtcbiAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3ApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UocXVlcnlFbmNvZGVTcGFjZVJlLCAnKycpO1xufSAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvZWFjaC5qc1xuLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvZ2V0X3ZhbHVlLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvcXVlcnlfZW5jb2RlLmpzXG5cblxudmFyIHNraXBwYWJsZVJlID0gL2ZpbGV8cmVzZXR8c3VibWl0fGJ1dHRvbnxpbWFnZS9pLFxuICAgIGNoZWNrYWJsZVJlID0gL3JhZGlvfGNoZWNrYm94L2k7XG5cbmZuLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gJyc7XG4gIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgZWFjaChlbGUuZWxlbWVudHMgfHwgW2VsZV0sIGZ1bmN0aW9uIChlbGUpIHtcbiAgICAgIGlmIChlbGUuZGlzYWJsZWQgfHwgIWVsZS5uYW1lIHx8IGVsZS50YWdOYW1lID09PSAnRklFTERTRVQnKSByZXR1cm47XG4gICAgICBpZiAoc2tpcHBhYmxlUmUudGVzdChlbGUudHlwZSkpIHJldHVybjtcbiAgICAgIGlmIChjaGVja2FibGVSZS50ZXN0KGVsZS50eXBlKSAmJiAhZWxlLmNoZWNrZWQpIHJldHVybjtcbiAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKGVsZSk7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHZhbHVlcyA9IGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBxdWVyeSArPSBxdWVyeUVuY29kZShlbGUubmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcXVlcnkuc3Vic3RyKDEpO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2VhY2guanNcbi8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvZ2V0X3ZhbHVlLmpzXG5cblxuZm4udmFsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpc1swXSAmJiBnZXRWYWx1ZSh0aGlzWzBdKTtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIGlzTXVsdGlwbGUgPSBzZWxlY3RNdWx0aXBsZVJlLnRlc3QoZWxlLnR5cGUpLFxuICAgICAgICBlbGVWYWx1ZSA9IHZhbHVlID09PSBudWxsID8gaXNNdWx0aXBsZSA/IFtdIDogJycgOiB2YWx1ZTtcblxuICAgIGlmIChpc011bHRpcGxlICYmIGlzQXJyYXkoZWxlVmFsdWUpKSB7XG4gICAgICBlYWNoKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGVsZVZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+PSAwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZS52YWx1ZSA9IGVsZVZhbHVlO1xuICAgIH1cbiAgfSk7XG59OyAvLyBAb3B0aW9uYWwgLi9zZXJpYWxpemUuanNcbi8vIEBvcHRpb25hbCAuL3ZhbC5qc1xuLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL21hcC5qc1xuXG5cbmZuLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUuY2xvbmVOb2RlKHRydWUpO1xuICB9KTtcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG5cblxuZm4uZGV0YWNoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoZWxlLnBhcmVudE5vZGUpIHtcbiAgICAgIGVsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZSk7XG4gICAgfVxuICB9KTtcbn07IC8vIEByZXF1aXJlIC4vY2FzaC5qc1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMuanNcbi8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9nZXQuanNcbi8vIEByZXF1aXJlIG1hbmlwdWxhdGlvbi9kZXRhY2guanNcblxuXG52YXIgZnJhZ21lbnRSZSA9IC9eXFxzKjwoXFx3KylbXj5dKj4vLFxuICAgIHNpbmdsZVRhZ1JlID0gL15cXHMqPChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+KT9cXHMqJC87XG52YXIgY29udGFpbmVycztcblxuZnVuY3Rpb24gaW5pdENvbnRhaW5lcnMoKSB7XG4gIGlmIChjb250YWluZXJzKSByZXR1cm47XG4gIHZhciB0YWJsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgICAgdHIgPSBkb2MuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgY29udGFpbmVycyA9IHtcbiAgICAnKic6IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICB0cjogZG9jLmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JyksXG4gICAgdGQ6IHRyLFxuICAgIHRoOiB0cixcbiAgICB0aGVhZDogdGFibGUsXG4gICAgdGJvZHk6IHRhYmxlLFxuICAgIHRmb290OiB0YWJsZVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICBpbml0Q29udGFpbmVycygpO1xuICBpZiAoIWlzU3RyaW5nKGh0bWwpKSByZXR1cm4gW107XG4gIGlmIChzaW5nbGVUYWdSZS50ZXN0KGh0bWwpKSByZXR1cm4gW2RvYy5jcmVhdGVFbGVtZW50KFJlZ0V4cC4kMSldO1xuICB2YXIgZnJhZ21lbnQgPSBmcmFnbWVudFJlLnRlc3QoaHRtbCkgJiYgUmVnRXhwLiQxLFxuICAgICAgY29udGFpbmVyID0gY29udGFpbmVyc1tmcmFnbWVudF0gfHwgY29udGFpbmVyc1snKiddO1xuICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgcmV0dXJuIGNhc2goY29udGFpbmVyLmNoaWxkTm9kZXMpLmRldGFjaCgpLmdldCgpO1xufVxuXG5jYXNoLnBhcnNlSFRNTCA9IHBhcnNlSFRNTDsgLy8gQG9wdGlvbmFsIC4vY2FtZWxfY2FzZS5qc1xuLy8gQG9wdGlvbmFsIC4vZWFjaC5qc1xuLy8gQG9wdGlvbmFsIC4vZXhwb3J0LmpzXG4vLyBAb3B0aW9uYWwgLi9leHRlbmQuanNcbi8vIEBvcHRpb25hbCAuL2ZpbmQuanNcbi8vIEBvcHRpb25hbCAuL2dldF9jb21wYXJlX2Z1bmN0aW9uLmpzXG4vLyBAb3B0aW9uYWwgLi9nZXRfc3BsaXRfdmFsdWVzLmpzXG4vLyBAb3B0aW9uYWwgLi9ndWlkLmpzXG4vLyBAb3B0aW9uYWwgLi9tYXRjaGVzLmpzXG4vLyBAb3B0aW9uYWwgLi9wYXJzZV9odG1sLmpzXG4vLyBAb3B0aW9uYWwgLi91bmlxdWUuanNcbi8vIEBvcHRpb25hbCAuL3ZhcmlhYmxlcy5qc1xuLy8gQHJlcXVpcmUgLi9jYXNoLmpzXG4vLyBAcmVxdWlyZSAuL3R5cGVfY2hlY2tpbmcuanNcbi8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuXG5mbi5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZSA9IHRoaXNbMF07XG5cbiAgaWYgKGVsZSkge1xuICAgIHdoaWxlIChlbGUuZmlyc3RDaGlsZCkge1xuICAgICAgZWxlLnJlbW92ZUNoaWxkKGVsZS5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGluc2VydEVsZW1lbnQoZWxlLCBjaGlsZCwgcHJlcGVuZCkge1xuICBpZiAocHJlcGVuZCkge1xuICAgIGVsZS5pbnNlcnRCZWZvcmUoY2hpbGQsIGVsZS5jaGlsZE5vZGVzWzBdKTtcbiAgfSBlbHNlIHtcbiAgICBlbGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICB9XG59IC8vIEByZXF1aXJlIGNvcmUvZWFjaC5qc1xuLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLmpzXG4vLyBAcmVxdWlyZSAuL2luc2VydF9lbGVtZW50LmpzXG5cblxuZnVuY3Rpb24gaW5zZXJ0Q29udGVudChwYXJlbnQsIGNoaWxkLCBwcmVwZW5kKSB7XG4gIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIHZhciBpc1N0ciA9IGlzU3RyaW5nKGNoaWxkKTtcblxuICBpZiAoIWlzU3RyICYmIGNoaWxkLmxlbmd0aCkge1xuICAgIGVhY2goY2hpbGQsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICAgIHJldHVybiBpbnNlcnRDb250ZW50KHBhcmVudCwgZWxlLCBwcmVwZW5kKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBlYWNoKHBhcmVudCwgaXNTdHIgPyBmdW5jdGlvbiAoZWxlKSB7XG4gICAgICBlbGUuaW5zZXJ0QWRqYWNlbnRIVE1MKHByZXBlbmQgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJywgY2hpbGQpO1xuICAgIH0gOiBmdW5jdGlvbiAoZWxlLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGluc2VydEVsZW1lbnQoZWxlLCAhaW5kZXggPyBjaGlsZCA6IGNoaWxkLmNsb25lTm9kZSh0cnVlKSwgcHJlcGVuZCk7XG4gICAgfSk7XG4gIH1cbn0gLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2VhY2guanNcbi8vIEByZXF1aXJlIC4vaGVscGVycy9pbnNlcnRfY29udGVudC5qc1xuXG5cbmZuLmFwcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgZWFjaChhcmd1bWVudHMsIGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgaW5zZXJ0Q29udGVudChfdGhpczQsIGNvbnRlbnQpO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIC4vaGVscGVycy9pbnNlcnRfY29udGVudC5qc1xuXG5cbmZuLmFwcGVuZFRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICBpbnNlcnRDb250ZW50KGNhc2gocGFyZW50KSwgdGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2VhY2guanNcblxuXG5mbi5odG1sID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXNbMF0gJiYgdGhpc1swXS5pbm5lckhUTUw7XG4gIHZhciBzb3VyY2UgPSBjb250ZW50Lm5vZGVUeXBlID8gY29udGVudFswXS5vdXRlckhUTUwgOiBjb250ZW50O1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBlbGUuaW5uZXJIVE1MID0gc291cmNlO1xuICB9KTtcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG5cblxuZm4uaW5zZXJ0QWZ0ZXIgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICBjYXNoKGNvbnRlbnQpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGUpIHtcbiAgICB2YXIgcGFyZW50ID0gZWxlLnBhcmVudE5vZGU7XG5cbiAgICBfdGhpczUuZWFjaChmdW5jdGlvbiAoaSwgZSkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSghaW5kZXggPyBlIDogZS5jbG9uZU5vZGUodHJ1ZSksIGVsZS5uZXh0U2libGluZyk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9zbGljZS5qc1xuLy8gQHJlcXVpcmUgLi9pbnNlcnRfYWZ0ZXIuanNcblxuXG5mbi5hZnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgZWFjaChyZXZlcnNlLmFwcGx5KGFyZ3VtZW50cyksIGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgcmV2ZXJzZS5hcHBseShjYXNoKGNvbnRlbnQpLnNsaWNlKCkpLmluc2VydEFmdGVyKF90aGlzNik7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG5cblxuZm4uaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gIGNhc2goc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGUpIHtcbiAgICB2YXIgcGFyZW50ID0gZWxlLnBhcmVudE5vZGU7XG5cbiAgICBfdGhpczcuZWFjaChmdW5jdGlvbiAoaSwgZSkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSghaW5kZXggPyBlIDogZS5jbG9uZU5vZGUodHJ1ZSksIGVsZSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLmpzXG4vLyBAcmVxdWlyZSAuL2luc2VydF9iZWZvcmUuanNcblxuXG5mbi5iZWZvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczggPSB0aGlzO1xuXG4gIGVhY2goYXJndW1lbnRzLCBmdW5jdGlvbiAoY29udGVudCkge1xuICAgIGNhc2goY29udGVudCkuaW5zZXJ0QmVmb3JlKF90aGlzOCk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLmpzXG4vLyBAcmVxdWlyZSAuL2hlbHBlcnMvaW5zZXJ0X2NvbnRlbnQuanNcblxuXG5mbi5wcmVwZW5kID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXM5ID0gdGhpcztcblxuICBlYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICBpbnNlcnRDb250ZW50KF90aGlzOSwgY29udGVudCwgdHJ1ZSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMuanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vc2xpY2UuanNcbi8vIEByZXF1aXJlIC4vaGVscGVycy9pbnNlcnRfY29udGVudC5qc1xuXG5cbmZuLnByZXBlbmRUbyA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgaW5zZXJ0Q29udGVudChjYXNoKHBhcmVudCksIHJldmVyc2UuYXBwbHkodGhpcy5zbGljZSgpKSwgdHJ1ZSk7XG4gIHJldHVybiB0aGlzO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBldmVudHMvb2ZmLmpzXG4vLyBAcmVxdWlyZSAuL2RldGFjaC5qc1xuXG5cbmZuLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZGV0YWNoKCkub2ZmKCk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZWFjaC5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9zbGljZS5qc1xuLy8gQHJlcXVpcmUgLi9hZnRlci5qc1xuLy8gQHJlcXVpcmUgLi9yZW1vdmUuanNcblxuXG5mbi5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHZhciBfdGhpczEwID0gdGhpcztcblxuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgcGFyZW50ID0gZWxlLnBhcmVudE5vZGU7XG4gICAgaWYgKCFwYXJlbnQpIHJldHVybjtcbiAgICB2YXIgJGVsZXMgPSBpID8gY2FzaChjb250ZW50KS5jbG9uZSgpIDogY2FzaChjb250ZW50KTtcblxuICAgIGlmICghJGVsZXNbMF0pIHtcbiAgICAgIF90aGlzMTAucmVtb3ZlKCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKCRlbGVzWzBdLCBlbGUpO1xuICAgIGNhc2goJGVsZXNbMF0pLmFmdGVyKCRlbGVzLnNsaWNlKDEpKTtcbiAgfSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIC4vcmVwbGFjZV93aXRoLmpzXG5cblxuZm4ucmVwbGFjZUFsbCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIGNhc2goY29udGVudCkucmVwbGFjZVdpdGgodGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2VhY2guanNcblxuXG5mbi50ZXh0ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLnRleHRDb250ZW50IDogJyc7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGVsZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIH0pO1xufTsgLy8gQG9wdGlvbmFsIC4vYWZ0ZXIuanNcbi8vIEBvcHRpb25hbCAuL2FwcGVuZC5qc1xuLy8gQG9wdGlvbmFsIC4vYXBwZW5kX3RvLmpzXG4vLyBAb3B0aW9uYWwgLi9iZWZvcmUuanNcbi8vIEBvcHRpb25hbCAuL2Nsb25lLmpzXG4vLyBAb3B0aW9uYWwgLi9kZXRhY2guanNcbi8vIEBvcHRpb25hbCAuL2VtcHR5LmpzXG4vLyBAb3B0aW9uYWwgLi9odG1sLmpzXG4vLyBAb3B0aW9uYWwgLi9pbnNlcnRfYWZ0ZXIuanNcbi8vIEBvcHRpb25hbCAuL2luc2VydF9iZWZvcmUuanNcbi8vIEBvcHRpb25hbCAuL3ByZXBlbmQuanNcbi8vIEBvcHRpb25hbCAuL3ByZXBlbmRfdG8uanNcbi8vIEBvcHRpb25hbCAuL3JlbW92ZS5qc1xuLy8gQG9wdGlvbmFsIC4vcmVwbGFjZV9hbGwuanNcbi8vIEBvcHRpb25hbCAuL3JlcGxhY2Vfd2l0aC5qc1xuLy8gQG9wdGlvbmFsIC4vdGV4dC5qc1xuLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuXG5cbnZhciBkb2NFbGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5mbi5vZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBlbGUgPSB0aGlzWzBdO1xuICBpZiAoIWVsZSkgcmV0dXJuO1xuICB2YXIgcmVjdCA9IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlLmNsaWVudFRvcCxcbiAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGUuY2xpZW50TGVmdFxuICB9O1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG5cblxuZm4ub2Zmc2V0UGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FzaCh0aGlzWzBdICYmIHRoaXNbMF0ub2Zmc2V0UGFyZW50KTtcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuXG5cbmZuLnBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZWxlID0gdGhpc1swXTtcbiAgaWYgKCFlbGUpIHJldHVybjtcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBlbGUub2Zmc2V0TGVmdCxcbiAgICB0b3A6IGVsZS5vZmZzZXRUb3BcbiAgfTtcbn07IC8vIEBvcHRpb25hbCAuL29mZnNldC5qc1xuLy8gQG9wdGlvbmFsIC4vb2Zmc2V0X3BhcmVudC5qc1xuLy8gQG9wdGlvbmFsIC4vcG9zaXRpb24uanNcbi8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9tYXRjaGVzLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3VuaXF1ZS5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2ZpbHRlci5qc1xuXG5cbmZuLmNoaWxkcmVuID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBwdXNoLmFwcGx5KHJlc3VsdCwgZWxlLmNoaWxkcmVuKTtcbiAgfSk7XG4gIHJlc3VsdCA9IGNhc2godW5pcXVlKHJlc3VsdCkpO1xuICBpZiAoIXNlbGVjdG9yKSByZXR1cm4gcmVzdWx0O1xuICByZXR1cm4gcmVzdWx0LmZpbHRlcihmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIG1hdGNoZXMoZWxlLCBzZWxlY3Rvcik7XG4gIH0pO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3VuaXF1ZS5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9lYWNoLmpzXG5cblxuZm4uY29udGVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBwdXNoLmFwcGx5KHJlc3VsdCwgZWxlLnRhZ05hbWUgPT09ICdJRlJBTUUnID8gW2VsZS5jb250ZW50RG9jdW1lbnRdIDogZWxlLmNoaWxkTm9kZXMpO1xuICB9KTtcbiAgcmV0dXJuIGNhc2gocmVzdWx0Lmxlbmd0aCAmJiB1bmlxdWUocmVzdWx0KSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvdW5pcXVlLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2ZpbmQuanNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLmpzXG5cblxuZm4uZmluZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBmb3VuZCA9IGZpbmQoc2VsZWN0b3IsIHRoaXNbaV0pO1xuXG4gICAgaWYgKGZvdW5kLmxlbmd0aCkge1xuICAgICAgcHVzaC5hcHBseShyZXN1bHQsIGZvdW5kKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2FzaChyZXN1bHQubGVuZ3RoICYmIHVuaXF1ZShyZXN1bHQpKTtcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29yZS9maW5kLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3R5cGVfY2hlY2tpbmcuanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZmlsdGVyLmpzXG5cblxuZm4uaGFzID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBjb21wYXJhdG9yID0gaXNTdHJpbmcoc2VsZWN0b3IpID8gZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiAhIWZpbmQoc2VsZWN0b3IsIGVsZSkubGVuZ3RoO1xuICB9IDogZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUuY29udGFpbnMoc2VsZWN0b3IpO1xuICB9O1xuICByZXR1cm4gdGhpcy5maWx0ZXIoY29tcGFyYXRvcik7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvZ2V0X2NvbXBhcmVfZnVuY3Rpb24uanNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZWFjaC5qc1xuXG5cbmZuLmlzID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIGlmICghc2VsZWN0b3IgfHwgIXRoaXNbMF0pIHJldHVybiBmYWxzZTtcbiAgdmFyIGNvbXBhcmF0b3IgPSBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpO1xuICB2YXIgY2hlY2sgPSBmYWxzZTtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBjaGVjayA9IGNvbXBhcmF0b3IoaSwgZWxlLCBzZWxlY3Rvcik7XG4gICAgcmV0dXJuICFjaGVjaztcbiAgfSk7XG4gIHJldHVybiBjaGVjaztcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuXG5cbmZuLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYXNoKHRoaXNbMF0gJiYgdGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL2dldF9jb21wYXJlX2Z1bmN0aW9uLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2ZpbHRlci5qc1xuXG5cbmZuLm5vdCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICBpZiAoIXNlbGVjdG9yIHx8ICF0aGlzWzBdKSByZXR1cm4gdGhpcztcbiAgdmFyIGNvbXBhcmF0b3IgPSBnZXRDb21wYXJlRnVuY3Rpb24oc2VsZWN0b3IpO1xuICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiAhY29tcGFyYXRvcihpLCBlbGUsIHNlbGVjdG9yKTtcbiAgfSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvdW5pcXVlLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2VhY2guanNcblxuXG5mbi5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoZWxlICYmIGVsZS5wYXJlbnROb2RlKSB7XG4gICAgICByZXN1bHQucHVzaChlbGUucGFyZW50Tm9kZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNhc2godW5pcXVlKHJlc3VsdCkpO1xufTsgLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy5qc1xuLy8gQHJlcXVpcmUgdHJhdmVyc2FsL2NoaWxkcmVuLmpzXG4vLyBAcmVxdWlyZSB0cmF2ZXJzYWwvcGFyZW50LmpzXG4vLyBAcmVxdWlyZSAuL2dldC5qc1xuLy9GSVhNRSBVZ2x5IGZpbGUgbmFtZSwgaXMgdGhlcmUgYSBiZXR0ZXIgb3B0aW9uP1xuXG5cbmZuLmluZGV4ID0gZnVuY3Rpb24gKGVsZSkge1xuICB2YXIgY2hpbGQgPSBlbGUgPyBjYXNoKGVsZSlbMF0gOiB0aGlzWzBdLFxuICAgICAgY29sbGVjdGlvbiA9IGVsZSA/IHRoaXMgOiBjYXNoKGNoaWxkKS5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICByZXR1cm4gaW5kZXhPZi5jYWxsKGNvbGxlY3Rpb24sIGNoaWxkKTtcbn07IC8vIEBvcHRpb25hbCAuL2FkZC5qc1xuLy8gQG9wdGlvbmFsIC4vZWFjaC5qc1xuLy8gQG9wdGlvbmFsIC4vZXEuanNcbi8vIEBvcHRpb25hbCAuL2ZpbHRlci5qc1xuLy8gQG9wdGlvbmFsIC4vZmlyc3QuanNcbi8vIEBvcHRpb25hbCAuL2dldC5qc1xuLy8gQG9wdGlvbmFsIC4vaW5kZXhGbi5qc1xuLy8gQG9wdGlvbmFsIC4vbGFzdC5qc1xuLy8gQG9wdGlvbmFsIC4vbWFwLmpzXG4vLyBAb3B0aW9uYWwgLi9zbGljZS5qc1xuLy8gQHJlcXVpcmUgY29yZS9jYXNoLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2ZpbHRlci5qc1xuLy8gQHJlcXVpcmUgLi9pcy5qc1xuLy8gQHJlcXVpcmUgLi9wYXJlbnQuanNcblxuXG5mbi5jbG9zZXN0ID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIGlmICghc2VsZWN0b3IgfHwgIXRoaXNbMF0pIHJldHVybiBjYXNoKCk7XG4gIGlmICh0aGlzLmlzKHNlbGVjdG9yKSkgcmV0dXJuIHRoaXMuZmlsdGVyKHNlbGVjdG9yKTtcbiAgcmV0dXJuIHRoaXMucGFyZW50KCkuY2xvc2VzdChzZWxlY3Rvcik7XG59OyAvLyBAcmVxdWlyZSBjb3JlL2Nhc2guanNcbi8vIEByZXF1aXJlIGNvcmUvbWF0Y2hlcy5qc1xuLy8gQHJlcXVpcmUgY29yZS91bmlxdWUuanNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLmpzXG4vLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2VhY2guanNcblxuXG5mbi5wYXJlbnRzID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGxhc3Q7XG4gIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgbGFzdCA9IGVsZTtcblxuICAgIHdoaWxlIChsYXN0ICYmIGxhc3QucGFyZW50Tm9kZSAmJiBsYXN0ICE9PSBkb2MuYm9keS5wYXJlbnROb2RlKSB7XG4gICAgICBsYXN0ID0gbGFzdC5wYXJlbnROb2RlO1xuXG4gICAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yICYmIG1hdGNoZXMobGFzdCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGxhc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjYXNoKHVuaXF1ZShyZXN1bHQpKTtcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuXG5cbmZuLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYXNoKHRoaXNbMF0gJiYgdGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcbn07IC8vIEByZXF1aXJlIGNvcmUvY2FzaC5qc1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9maWx0ZXIuanNcbi8vIEByZXF1aXJlIC4vY2hpbGRyZW4uanNcbi8vIEByZXF1aXJlIC4vcGFyZW50LmpzXG5cblxuZm4uc2libGluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBlbGUgPSB0aGlzWzBdO1xuICByZXR1cm4gdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmZpbHRlcihmdW5jdGlvbiAoaSwgY2hpbGQpIHtcbiAgICByZXR1cm4gY2hpbGQgIT09IGVsZTtcbiAgfSk7XG59OyAvLyBAb3B0aW9uYWwgLi9jaGlsZHJlbi5qc1xuLy8gQG9wdGlvbmFsIC4vY2xvc2VzdC5qc1xuLy8gQG9wdGlvbmFsIC4vY29udGVudHMuanNcbi8vIEBvcHRpb25hbCAuL2ZpbmQuanNcbi8vIEBvcHRpb25hbCAuL2hhcy5qc1xuLy8gQG9wdGlvbmFsIC4vaXMuanNcbi8vIEBvcHRpb25hbCAuL25leHQuanNcbi8vIEBvcHRpb25hbCAuL25vdC5qc1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50LmpzXG4vLyBAb3B0aW9uYWwgLi9wYXJlbnRzLmpzXG4vLyBAb3B0aW9uYWwgLi9wcmV2LmpzXG4vLyBAb3B0aW9uYWwgLi9zaWJsaW5ncy5qc1xuLy8gQG9wdGlvbmFsIGF0dHJpYnV0ZXMvaW5kZXguanNcbi8vIEBvcHRpb25hbCBjb2xsZWN0aW9uL2luZGV4LmpzXG4vLyBAb3B0aW9uYWwgY3NzL2luZGV4LmpzXG4vLyBAb3B0aW9uYWwgZGF0YS9pbmRleC5qc1xuLy8gQG9wdGlvbmFsIGRpbWVuc2lvbnMvaW5kZXguanNcbi8vIEBvcHRpb25hbCBldmVudHMvaW5kZXguanNcbi8vIEBvcHRpb25hbCBmb3Jtcy9pbmRleC5qc1xuLy8gQG9wdGlvbmFsIG1hbmlwdWxhdGlvbi9pbmRleC5qc1xuLy8gQG9wdGlvbmFsIG9mZnNldC9pbmRleC5qc1xuLy8gQG9wdGlvbmFsIHRyYXZlcnNhbC9pbmRleC5qc1xuLy8gQHJlcXVpcmUgY29yZS9pbmRleC5qc1xuZXhwb3J0IGRlZmF1bHQgY2FzaDtcbiIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcmFnZW50Jyk7XG5cbi8vIHBhdGNoIHN1cGVyYWdlbnQgdG8gYXR0YWNoIENTUkYtdG9rZW4gdG8gYWxsIHJlcXVlc3RzXG50cnkge1xuICB2YXIgY3NyZiA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvY3NyZnRva2VuPSguKj8pKD86JHw7KS8pWzFdO1xuICB2YXIgZW5kID0gcmVxdWVzdC5SZXF1ZXN0LnByb3RvdHlwZS5lbmQ7XG4gIHJlcXVlc3QuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pIHtcbiAgICB0aGlzLnNldCgnWC1DU1JGVG9rZW4nLCBjc3JmKTtcbiAgICByZXR1cm4gZW5kLmNhbGwodGhpcywgZm4pO1xuICB9O1xufVxuY2F0Y2ggKGVycikge1xuICBcbn1cblxuIiwiZnVuY3Rpb24gQWdlbnQoKSB7XG4gIHRoaXMuX2RlZmF1bHRzID0gW107XG59XG5cbltcInVzZVwiLCBcIm9uXCIsIFwib25jZVwiLCBcInNldFwiLCBcInF1ZXJ5XCIsIFwidHlwZVwiLCBcImFjY2VwdFwiLCBcImF1dGhcIiwgXCJ3aXRoQ3JlZGVudGlhbHNcIiwgXCJzb3J0UXVlcnlcIiwgXCJyZXRyeVwiLCBcIm9rXCIsIFwicmVkaXJlY3RzXCIsXG4gXCJ0aW1lb3V0XCIsIFwiYnVmZmVyXCIsIFwic2VyaWFsaXplXCIsIFwicGFyc2VcIiwgXCJjYVwiLCBcImtleVwiLCBcInBmeFwiLCBcImNlcnRcIl0uZm9yRWFjaChmbiA9PiB7XG4gIC8qKiBEZWZhdWx0IHNldHRpbmcgZm9yIGFsbCByZXF1ZXN0cyBmcm9tIHRoaXMgYWdlbnQgKi9cbiAgQWdlbnQucHJvdG90eXBlW2ZuXSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB0aGlzLl9kZWZhdWx0cy5wdXNoKHtmbiwgYXJnc30pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59KTtcblxuQWdlbnQucHJvdG90eXBlLl9zZXREZWZhdWx0cyA9IGZ1bmN0aW9uKHJlcSkge1xuICAgIHRoaXMuX2RlZmF1bHRzLmZvckVhY2goZGVmID0+IHtcbiAgICAgIHJlcVtkZWYuZm5dLmFwcGx5KHJlcSwgZGVmLmFyZ3MpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcbiIsIi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxubGV0IHJvb3Q7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgeyAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgY29uc29sZS53YXJuKFwiVXNpbmcgYnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcbiAgcm9vdCA9IHRoaXM7XG59XG5cbmNvbnN0IEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xuY29uc3QgUmVxdWVzdEJhc2UgPSByZXF1aXJlKCcuL3JlcXVlc3QtYmFzZScpO1xuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuY29uc3QgUmVzcG9uc2VCYXNlID0gcmVxdWlyZSgnLi9yZXNwb25zZS1iYXNlJyk7XG5jb25zdCBBZ2VudCA9IHJlcXVpcmUoJy4vYWdlbnQtYmFzZScpO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe307XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5jb25zdCByZXF1ZXN0ID0gZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn07XG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9ICgpID0+IHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAgICYmICghcm9vdC5sb2NhdGlvbiB8fCAnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2xcbiAgICAgICAgICB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICB0aHJvdyBFcnJvcihcIkJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgY291bGQgbm90IGZpbmQgWEhSXCIpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmNvbnN0IHRyaW0gPSAnJy50cmltXG4gID8gcyA9PiBzLnRyaW0oKVxuICA6IHMgPT4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTtcblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICBjb25zdCBwYWlycyA9IFtdO1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCBvYmpba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cbiAqIE11dGF0ZXMgdGhlIHBhaXJzIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqL1xuXG5mdW5jdGlvbiBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2YWwpIHtcbiAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLmZvckVhY2godiA9PiB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHYpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICBmb3IoY29uc3Qgc3Via2V5IGluIHZhbCkge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywgYCR7a2V5fVske3N1YmtleX1dYCwgdmFsW3N1YmtleV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG5yZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3QgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgbGV0IHBhaXI7XG4gIGxldCBwb3M7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpcildID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZSgwLCBwb3MpKV0gPVxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZShwb3MgKyAxKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ3RleHQveG1sJyxcbiAgdXJsZW5jb2RlZDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5XG59O1xuXG4vKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICBjb25zdCBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICBjb25zdCBmaWVsZHMgPSB7fTtcbiAgbGV0IGluZGV4O1xuICBsZXQgbGluZTtcbiAgbGV0IGZpZWxkO1xuICBsZXQgdmFsO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgLy8gY291bGQgYmUgZW1wdHkgbGluZSwganVzdCBza2lwIGl0XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgLy8gc2hvdWxkIG1hdGNoIC9qc29uIG9yICtqc29uXG4gIC8vIGJ1dCBub3QgL2pzb24tc2VxXG4gIHJldHVybiAvW1xcLytdanNvbigkfFteLVxcd10pLy50ZXN0KG1pbWUpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEpIHtcbiAgdGhpcy5yZXEgPSByZXE7XG4gIHRoaXMueGhyID0gdGhpcy5yZXEueGhyO1xuICAvLyByZXNwb25zZVRleHQgaXMgYWNjZXNzaWJsZSBvbmx5IGlmIHJlc3BvbnNlVHlwZSBpcyAnJyBvciAndGV4dCcgYW5kIG9uIG9sZGVyIGJyb3dzZXJzXG4gIHRoaXMudGV4dCA9ICgodGhpcy5yZXEubWV0aG9kICE9J0hFQUQnICYmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHwgdHlwZW9mIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgID8gdGhpcy54aHIucmVzcG9uc2VUZXh0XG4gICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIGxldCBzdGF0dXMgPSB0aGlzLnhoci5zdGF0dXM7XG4gIC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgIHN0YXR1cyA9IDIwNDtcbiAgfVxuICB0aGlzLl9zZXRTdGF0dXNQcm9wZXJ0aWVzKHN0YXR1cyk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5fc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG5cbiAgaWYgKG51bGwgPT09IHRoaXMudGV4dCAmJiByZXEuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHRoaXMuYm9keSA9IHRoaXMueGhyLnJlc3BvbnNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYm9keSA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCdcbiAgICAgID8gdGhpcy5fcGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKVxuICAgICAgOiBudWxsO1xuICB9XG59XG5cblJlc3BvbnNlQmFzZShSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLl9wYXJzZUJvZHkgPSBmdW5jdGlvbihzdHIpIHtcbiAgbGV0IHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZiAodGhpcy5yZXEuX3BhcnNlcikge1xuICAgIHJldHVybiB0aGlzLnJlcS5fcGFyc2VyKHRoaXMsIHN0cik7XG4gIH1cbiAgaWYgKCFwYXJzZSAmJiBpc0pTT04odGhpcy50eXBlKSkge1xuICAgIHBhcnNlID0gcmVxdWVzdC5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICB9XG4gIHJldHVybiBwYXJzZSAmJiBzdHIgJiYgKHN0ci5sZW5ndGggfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpe1xuICBjb25zdCByZXEgPSB0aGlzLnJlcTtcbiAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZDtcbiAgY29uc3QgdXJsID0gcmVxLnVybDtcblxuICBjb25zdCBtc2cgPSBgY2Fubm90ICR7bWV0aG9kfSAke3VybH0gKCR7dGhpcy5zdGF0dXN9KWA7XG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSBtZXRob2Q7XG4gIGVyci51cmwgPSB1cmw7XG5cbiAgcmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxucmVxdWVzdC5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTsgLy8gcHJlc2VydmVzIGhlYWRlciBuYW1lIGNhc2VcbiAgdGhpcy5faGVhZGVyID0ge307IC8vIGNvZXJjZXMgaGVhZGVyIG5hbWVzIHRvIGxvd2VyY2FzZVxuICB0aGlzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgbGV0IGVyciA9IG51bGw7XG4gICAgbGV0IHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgbGV0IG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGN1c3RvbV9lcnIpIHtcbiAgICAgIG5ld19lcnIgPSBjdXN0b21fZXJyOyAvLyBvaygpIGNhbGxiYWNrIGNhbiB0aHJvd1xuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBuZXdfZXJyLm9yaWdpbmFsID0gZXJyO1xuICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgIG5ld19lcnIuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICAgIHNlbGYuY2FsbGJhY2sobmV3X2VyciwgcmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5jYWxsYmFjayhudWxsLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgIGFuZCBgUmVxdWVzdEJhc2VgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuUmVxdWVzdEJhc2UoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbcGFzc10gb3B0aW9uYWwgaW4gY2FzZSBvZiB1c2luZyAnYmVhcmVyJyBhcyB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB3aXRoICd0eXBlJyBwcm9wZXJ0eSAnYXV0bycsICdiYXNpYycgb3IgJ2JlYXJlcicgKGRlZmF1bHQgJ2Jhc2ljJylcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucyl7XG4gIGlmICgxID09PSBhcmd1bWVudHMubGVuZ3RoKSBwYXNzID0gJyc7XG4gIGlmICh0eXBlb2YgcGFzcyA9PT0gJ29iamVjdCcgJiYgcGFzcyAhPT0gbnVsbCkgeyAvLyBwYXNzIGlzIG9wdGlvbmFsIGFuZCBjYW4gYmUgcmVwbGFjZWQgd2l0aCBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHBhc3M7XG4gICAgcGFzcyA9ICcnO1xuICB9XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICB0eXBlOiAnZnVuY3Rpb24nID09PSB0eXBlb2YgYnRvYSA/ICdiYXNpYycgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGVuY29kZXIgPSBzdHJpbmcgPT4ge1xuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYnRvYSkge1xuICAgICAgcmV0dXJuIGJ0b2Eoc3RyaW5nKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGJhc2ljIGF1dGgsIGJ0b2EgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfTtcblxuICByZXR1cm4gdGhpcy5fYXV0aCh1c2VyLCBwYXNzLCBvcHRpb25zLCBlbmNvZGVyKTtcbn07XG5cbi8qKlxuICogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuICogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4gKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnY29udGVudCcsIG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBvcHRpb25zKXtcbiAgaWYgKGZpbGUpIHtcbiAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJzdXBlcmFnZW50IGNhbid0IG1peCAuc2VuZCgpIGFuZCAuYXR0YWNoKClcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG9wdGlvbnMgfHwgZmlsZS5uYW1lKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9nZXRGb3JtRGF0YSA9IGZ1bmN0aW9uKCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Zvcm1EYXRhO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgaWYgKHRoaXMuX3Nob3VsZFJldHJ5KGVyciwgcmVzKSkge1xuICAgIHJldHVybiB0aGlzLl9yZXRyeSgpO1xuICB9XG5cbiAgY29uc3QgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICBpZiAoZXJyKSB7XG4gICAgaWYgKHRoaXMuX21heFJldHJpZXMpIGVyci5yZXRyaWVzID0gdGhpcy5fcmV0cmllcyAtIDE7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cblxuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nKTtcbiAgZXJyLmNyb3NzRG9tYWluID0gdHJ1ZTtcblxuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgZXJyLnVybCA9IHRoaXMudXJsO1xuXG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8vIFRoaXMgb25seSB3YXJucywgYmVjYXVzZSB0aGUgcmVxdWVzdCBpcyBzdGlsbCBsaWtlbHkgdG8gd29ya1xuUmVxdWVzdC5wcm90b3R5cGUuYnVmZmVyID0gUmVxdWVzdC5wcm90b3R5cGUuY2EgPSBSZXF1ZXN0LnByb3RvdHlwZS5hZ2VudCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUud2FybihcIlRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBUaGlzIHRocm93cywgYmVjYXVzZSBpdCBjYW4ndCBzZW5kL3JlY2VpdmUgZGF0YSBhcyBleHBlY3RlZFxuUmVxdWVzdC5wcm90b3R5cGUucGlwZSA9IFJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gKCkgPT4ge1xuICB0aHJvdyBFcnJvcihcIlN0cmVhbWluZyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbiBfaXNIb3N0KG9iaikge1xuICAvLyBOYXRpdmUgb2JqZWN0cyBzdHJpbmdpZnkgdG8gW29iamVjdCBGaWxlXSwgW29iamVjdCBCbG9iXSwgW29iamVjdCBGb3JtRGF0YV0sIGV0Yy5cbiAgcmV0dXJuIG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iaiAmJiAhQXJyYXkuaXNBcnJheShvYmopICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKFwiV2FybmluZzogLmVuZCgpIHdhcyBjYWxsZWQgdHdpY2UuIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBzdXBlcmFnZW50XCIpO1xuICB9XG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcblxuICB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHJldHVybiB0aGlzLmNhbGxiYWNrKEVycm9yKFwiVGhlIHJlcXVlc3QgaGFzIGJlZW4gYWJvcnRlZCBldmVuIGJlZm9yZSAuZW5kKCkgd2FzIGNhbGxlZFwiKSk7XG5cbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIGNvbnN0IHhociA9ICh0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCkpO1xuICBsZXQgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCByZWFkeVN0YXRlID0geGhyLnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPj0gMiAmJiBzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgICB9XG4gICAgaWYgKDQgIT0gcmVhZHlTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICBsZXQgc3RhdHVzO1xuICAgIHRyeSB7IHN0YXR1cyA9IHhoci5zdGF0dXMgfSBjYXRjaChlKSB7IHN0YXR1cyA9IDA7IH1cblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCB8fCBzZWxmLl9hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgY29uc3QgaGFuZGxlUHJvZ3Jlc3MgPSAoZGlyZWN0aW9uLCBlKSA9PiB7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgfVxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHhoci5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKTtcbiAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ3VwbG9hZCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgICB9XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlLCB0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHNlZSAjMTE0OVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGVycik7XG4gIH1cblxuICAvLyBDT1JTXG4gIGlmICh0aGlzLl93aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gIC8vIGJvZHlcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSAmJiAnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBsZXQgc2VyaWFsaXplID0gdGhpcy5fc2VyaWFsaXplciB8fCByZXF1ZXN0LnNlcmlhbGl6ZVtjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF0gOiAnJ107XG4gICAgaWYgKCFzZXJpYWxpemUgJiYgaXNKU09OKGNvbnRlbnRUeXBlKSkge1xuICAgICAgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAoY29uc3QgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuXG4gICAgaWYgKHRoaXMuaGVhZGVyLmhhc093blByb3BlcnR5KGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyA/IGRhdGEgOiBudWxsKTtcbn07XG5cbnJlcXVlc3QuYWdlbnQgPSAoKSA9PiBuZXcgQWdlbnQoKTtcblxuW1wiR0VUXCIsIFwiUE9TVFwiLCBcIk9QVElPTlNcIiwgXCJQQVRDSFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiXS5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gIEFnZW50LnByb3RvdHlwZVttZXRob2QudG9Mb3dlckNhc2UoKV0gPSBmdW5jdGlvbih1cmwsIGZuKSB7XG4gICAgY29uc3QgcmVxID0gbmV3IHJlcXVlc3QuUmVxdWVzdChtZXRob2QsIHVybCk7XG4gICAgdGhpcy5fc2V0RGVmYXVsdHMocmVxKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHJlcS5lbmQoZm4pO1xuICAgIH1cbiAgICByZXR1cm4gcmVxO1xuICB9O1xufSk7XG5cbkFnZW50LnByb3RvdHlwZS5kZWwgPSBBZ2VudC5wcm90b3R5cGVbJ2RlbGV0ZSddO1xuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogT1BUSU9OUyBxdWVyeSB0byBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3Qub3B0aW9ucyA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkZWwodXJsLCBkYXRhLCBmbikge1xuICBjb25zdCByZXEgPSByZXF1ZXN0KCdERUxFVEUnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn1cblxucmVxdWVzdFsnZGVsJ10gPSBkZWw7XG5yZXF1ZXN0WydkZWxldGUnXSA9IGRlbDtcblxuLyoqXG4gKiBQQVRDSCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ1BPU1QnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gbnVsbCAhPT0gb2JqICYmICdvYmplY3QnID09PSB0eXBlb2Ygb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gUmVxdWVzdEJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBfY2xlYXJUaW1lb3V0KCl7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gIGRlbGV0ZSB0aGlzLl90aW1lcjtcbiAgZGVsZXRlIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXNwb25zZSBib2R5IHBhcnNlclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBpbmNvbWluZyBkYXRhIGludG8gcmVxdWVzdC5ib2R5XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UoZm4pe1xuICB0aGlzLl9wYXJzZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBmb3JtYXQgb2YgYmluYXJ5IHJlc3BvbnNlIGJvZHkuXG4gKiBJbiBicm93c2VyIHZhbGlkIGZvcm1hdHMgYXJlICdibG9iJyBhbmQgJ2FycmF5YnVmZmVyJyxcbiAqIHdoaWNoIHJldHVybiBCbG9iIGFuZCBBcnJheUJ1ZmZlciwgcmVzcGVjdGl2ZWx5LlxuICpcbiAqIEluIE5vZGUgYWxsIHZhbHVlcyByZXN1bHQgaW4gQnVmZmVyLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnJlc3BvbnNlVHlwZSgnYmxvYicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXNwb25zZVR5cGUgPSBmdW5jdGlvbih2YWwpe1xuICB0aGlzLl9yZXNwb25zZVR5cGUgPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3QgYm9keSBzZXJpYWxpemVyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGRhdGEgc2V0IHZpYSAuc2VuZCBvciAuYXR0YWNoIGludG8gcGF5bG9hZCB0byBzZW5kXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZShmbil7XG4gIHRoaXMuX3NlcmlhbGl6ZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aW1lb3V0cy5cbiAqXG4gKiAtIHJlc3BvbnNlIHRpbWVvdXQgaXMgdGltZSBiZXR3ZWVuIHNlbmRpbmcgcmVxdWVzdCBhbmQgcmVjZWl2aW5nIHRoZSBmaXJzdCBieXRlIG9mIHRoZSByZXNwb25zZS4gSW5jbHVkZXMgRE5TIGFuZCBjb25uZWN0aW9uIHRpbWUuXG4gKiAtIGRlYWRsaW5lIGlzIHRoZSB0aW1lIGZyb20gc3RhcnQgb2YgdGhlIHJlcXVlc3QgdG8gcmVjZWl2aW5nIHJlc3BvbnNlIGJvZHkgaW4gZnVsbC4gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBzaG9ydCBsYXJnZSBmaWxlcyBtYXkgbm90IGxvYWQgYXQgYWxsIG9uIHNsb3cgY29ubmVjdGlvbnMuXG4gKlxuICogVmFsdWUgb2YgMCBvciBmYWxzZSBtZWFucyBubyB0aW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gbXMgb3Ige3Jlc3BvbnNlLCBkZWFkbGluZX1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uIHRpbWVvdXQob3B0aW9ucyl7XG4gIGlmICghb3B0aW9ucyB8fCAnb2JqZWN0JyAhPT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biB0aW1lb3V0IG9wdGlvblwiLCBvcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQsIGZuKXtcbiAgLy8gRGVmYXVsdCB0byAxIGlmIG5vIGNvdW50IHBhc3NlZCBvciB0cnVlXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IGNvdW50ID09PSB0cnVlKSBjb3VudCA9IDE7XG4gIGlmIChjb3VudCA8PSAwKSBjb3VudCA9IDA7XG4gIHRoaXMuX21heFJldHJpZXMgPSBjb3VudDtcbiAgdGhpcy5fcmV0cmllcyA9IDA7XG4gIHRoaXMuX3JldHJ5Q2FsbGJhY2sgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBFUlJPUl9DT0RFUyA9IFtcbiAgJ0VDT05OUkVTRVQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VBRERSSU5GTycsXG4gICdFU09DS0VUVElNRURPVVQnXG5dO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoQm9ycm93ZWQgZnJvbSBzZWdtZW50aW8vc3VwZXJhZ2VudC1yZXRyeSlcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zaG91bGRSZXRyeSA9IGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gIGlmICghdGhpcy5fbWF4UmV0cmllcyB8fCB0aGlzLl9yZXRyaWVzKysgPj0gdGhpcy5fbWF4UmV0cmllcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodGhpcy5fcmV0cnlDYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBvdmVycmlkZSA9IHRoaXMuX3JldHJ5Q2FsbGJhY2soZXJyLCByZXMpO1xuICAgICAgaWYgKG92ZXJyaWRlID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIHVuZGVmaW5lZCBmYWxscyBiYWNrIHRvIGRlZmF1bHRzXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDAgJiYgcmVzLnN0YXR1cyAhPSA1MDEpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyKSB7XG4gICAgaWYgKGVyci5jb2RlICYmIH5FUlJPUl9DT0RFUy5pbmRleE9mKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gICAgLy8gU3VwZXJhZ2VudCB0aW1lb3V0XG4gICAgaWYgKGVyci50aW1lb3V0ICYmIGVyci5jb2RlID09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoZXJyLmNyb3NzRG9tYWluKSByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcblxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIC8vIG5vZGVcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgdGhpcy5yZXEgPSBudWxsO1xuICAgIHRoaXMucmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXQgPSBmYWxzZTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZWplY3RdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gdGhlbihyZXNvbHZlLCByZWplY3QpIHtcbiAgaWYgKCF0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IHN1cGVyYWdlbnQgcmVxdWVzdCB3YXMgc2VudCB0d2ljZSwgYmVjYXVzZSBib3RoIC5lbmQoKSBhbmQgLnRoZW4oKSB3ZXJlIGNhbGxlZC4gTmV2ZXIgY2FsbCAuZW5kKCkgaWYgeW91IHVzZSBwcm9taXNlc1wiKTtcbiAgICB9XG4gICAgdGhpcy5fZnVsbGZpbGxlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgoaW5uZXJSZXNvbHZlLCBpbm5lclJlamVjdCkgPT4ge1xuICAgICAgc2VsZi5vbignZXJyb3InLCBpbm5lclJlamVjdCk7XG4gICAgICBzZWxmLm9uKCdhYm9ydCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICAgIGVyci5jb2RlID0gXCJBQk9SVEVEXCI7XG4gICAgICAgIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgICAgICAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICAgICAgICBlcnIudXJsID0gdGhpcy51cmw7XG4gICAgICAgIGlubmVyUmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICAgIHNlbGYuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIGlubmVyUmVzb2x2ZShyZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKGNiKSB7XG4gIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBjYik7XG59O1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5vayA9IGZ1bmN0aW9uKGNiKSB7XG4gIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2IpIHRocm93IEVycm9yKFwiQ2FsbGJhY2sgcmVxdWlyZWRcIik7XG4gIHRoaXMuX29rQ2FsbGJhY2sgPSBjYjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2lzUmVzcG9uc2VPSyA9IGZ1bmN0aW9uKHJlcykge1xuICBpZiAoIXJlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9va0NhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX29rQ2FsbGJhY2socmVzKTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwO1xufTtcblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC51bnNldCgnVXNlci1BZ2VudCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0XG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoeyBmb286ICdiYXInLCBiYXo6ICdxdXgnIH0pXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV8QnVmZmVyfGZzLlJlYWRTdHJlYW19IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG51bGwgPT09IG5hbWUgfHwgdW5kZWZpbmVkID09PSBuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSBuYW1lIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiLmZpZWxkKCkgY2FuJ3QgYmUgdXNlZCBpZiAuc2VuZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuYW1lKSB7XG4gICAgICB0aGlzLmZpZWxkKGtleSwgbmFtZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgZm9yIChjb25zdCBpIGluIHZhbCkge1xuICAgICAgdGhpcy5maWVsZChuYW1lLCB2YWxbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHZhbCBzaG91bGQgYmUgZGVmaW5lZCBub3dcbiAgaWYgKG51bGwgPT09IHZhbCB8fCB1bmRlZmluZWQgPT09IHZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgdmFsIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09PSB0eXBlb2YgdmFsKSB7XG4gICAgdmFsID0gJycgKyB2YWw7XG4gIH1cbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5fYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyICYmIHRoaXMueGhyLmFib3J0KCk7IC8vIGJyb3dzZXJcbiAgdGhpcy5yZXEgJiYgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucywgYmFzZTY0RW5jb2Rlcikge1xuICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJhc2ljICR7YmFzZTY0RW5jb2RlcihgJHt1c2VyfToke3Bhc3N9YCl9YCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYmVhcmVyJzogLy8gdXNhZ2Ugd291bGQgYmUgLmF1dGgoYWNjZXNzVG9rZW4sIHsgdHlwZTogJ2JlYXJlcicgfSlcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3VzZXJ9YCk7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKSB7XG4gIC8vIFRoaXMgaXMgYnJvd3Nlci1vbmx5IGZ1bmN0aW9uYWxpdHkuIE5vZGUgc2lkZSBpcyBuby1vcC5cbiAgaWYgKG9uID09IHVuZGVmaW5lZCkgb24gPSB0cnVlO1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSBvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4IHJlZGlyZWN0cyB0byBgbmAuIERvZXMgbm90aW5nIGluIGJyb3dzZXIgWEhSIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlZGlyZWN0cyA9IGZ1bmN0aW9uKG4pe1xuICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWF4aW11bSBzaXplIG9mIGJ1ZmZlcmVkIHJlc3BvbnNlIGJvZHksIGluIGJ5dGVzLiBDb3VudHMgdW5jb21wcmVzc2VkIHNpemUuXG4gKiBEZWZhdWx0IDIwME1CLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLm1heFJlc3BvbnNlU2l6ZSA9IGZ1bmN0aW9uKG4pe1xuICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiBuKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBhcmd1bWVudFwiKTtcbiAgfVxuICB0aGlzLl9tYXhSZXNwb25zZVNpemUgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29udmVydCB0byBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IChub3QgSlNPTiBzdHJpbmcpIG9mIHNjYWxhciBwcm9wZXJ0aWVzLlxuICogTm90ZSBhcyB0aGlzIG1ldGhvZCBpcyBkZXNpZ25lZCB0byByZXR1cm4gYSB1c2VmdWwgbm9uLXRoaXMgdmFsdWUsXG4gKiBpdCBjYW5ub3QgYmUgY2hhaW5lZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlc2NyaWJpbmcgbWV0aG9kLCB1cmwsIGFuZCBkYXRhIG9mIHRoaXMgcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMudXJsLFxuICAgIGRhdGE6IHRoaXMuX2RhdGEsXG4gICAgaGVhZGVyczogdGhpcy5faGVhZGVyLFxuICB9O1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCBhcyB0aGUgcmVxdWVzdCBib2R5LCBkZWZhdWx0aW5nIHRoZSBgLnR5cGUoKWAgdG8gXCJqc29uXCIgd2hlblxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIG1hbnVhbCBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgICAuc2VuZCgne1wibmFtZVwiOlwidGpcIn0nKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8ganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpe1xuICBjb25zdCBpc09iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICBsZXQgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiLnNlbmQoKSBjYW4ndCBiZSB1c2VkIGlmIC5hdHRhY2goKSBvciAuZmllbGQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqICYmICF0aGlzLl9kYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0YSAmJiB0aGlzLl9kYXRhICYmIHRoaXMuX2lzSG9zdCh0aGlzLl9kYXRhKSkge1xuICAgIHRocm93IEVycm9yKFwiQ2FuJ3QgbWVyZ2UgdGhlc2Ugc2VuZCBjYWxsc1wiKTtcbiAgfVxuXG4gIC8vIG1lcmdlXG4gIGlmIChpc09iaiAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICAvLyBkZWZhdWx0IHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGlmICghdHlwZSkgdGhpcy50eXBlKCdmb3JtJyk7XG4gICAgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gYCR7dGhpcy5fZGF0YX0mJHtkYXRhfWBcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIWlzT2JqIHx8IHRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZGVmYXVsdCB0byBqc29uXG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTb3J0IGBxdWVyeXN0cmluZ2AgYnkgdGhlIHNvcnQgZnVuY3Rpb25cbiAqXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gZGVmYXVsdCBvcmRlclxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGN1c3RvbWl6ZWQgc29ydCBmdW5jdGlvblxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoZnVuY3Rpb24oYSwgYil7XG4gKiAgICAgICAgICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc29ydFF1ZXJ5ID0gZnVuY3Rpb24oc29ydCkge1xuICAvLyBfc29ydCBkZWZhdWx0IHRvIHRydWUgYnV0IG90aGVyd2lzZSBjYW4gYmUgYSBmdW5jdGlvbiBvciBib29sZWFuXG4gIHRoaXMuX3NvcnQgPSB0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogc29ydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9maW5hbGl6ZVF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24oKXtcbiAgY29uc3QgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuICB0aGlzLl9xdWVyeS5sZW5ndGggPSAwOyAvLyBNYWtlcyB0aGUgY2FsbCBpZGVtcG90ZW50XG5cbiAgaWYgKHRoaXMuX3NvcnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3QgcXVlcnlBcnIgPSB0aGlzLnVybC5zdWJzdHJpbmcoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiB0aGlzLl9zb3J0KSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQodGhpcy5fc29ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeUFyci5zb3J0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IHRoaXMudXJsLnN1YnN0cmluZygwLCBpbmRleCkgKyAnPycgKyBxdWVyeUFyci5qb2luKCcmJyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdCBvbmx5XG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2FwcGVuZFF1ZXJ5U3RyaW5nID0gKCkgPT4ge2NvbnNvbGUudHJhY2UoXCJVbnN1cHBvcnRlZFwiKTt9XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3RpbWVvdXRFcnJvciA9IGZ1bmN0aW9uKHJlYXNvbiwgdGltZW91dCwgZXJybm8pe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYCR7cmVhc29uICsgdGltZW91dH1tcyBleGNlZWRlZGApO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIGVyci5jb2RlID0gJ0VDT05OQUJPUlRFRCc7XG4gIGVyci5lcnJubyA9IGVycm5vO1xuICB0aGlzLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgdGhpcy5hYm9ydCgpO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3NldFRpbWVvdXRzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gIC8vIGRlYWRsaW5lXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1RpbWVvdXQgb2YgJywgc2VsZi5fdGltZW91dCwgJ0VUSU1FJyk7XG4gICAgfSwgdGhpcy5fdGltZW91dCk7XG4gIH1cbiAgLy8gcmVzcG9uc2UgdGltZW91dFxuICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0ICYmICF0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1Jlc3BvbnNlIHRpbWVvdXQgb2YgJywgc2VsZi5fcmVzcG9uc2VUaW1lb3V0LCAnRVRJTUVET1VUJyk7XG4gICAgfSwgdGhpcy5fcmVzcG9uc2VUaW1lb3V0KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIFJlc3BvbnNlQmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlc3BvbnNlQmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpIHtcbiAgcmV0dXJuIHRoaXMuaGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIHJlbGF0ZWQgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYC50eXBlYCB0aGUgY29udGVudCB0eXBlIHdpdGhvdXQgcGFyYW1zXG4gKlxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXG4gKiB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBgLnR5cGVgIG9mIFwidGV4dC9wbGFpblwiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbihoZWFkZXIpe1xuICAgIC8vIFRPRE86IG1vYXIhXG4gICAgLy8gVE9ETzogbWFrZSB0aGlzIGEgdXRpbFxuXG4gICAgLy8gY29udGVudC10eXBlXG4gICAgY29uc3QgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gICAgLy8gcGFyYW1zXG4gICAgY29uc3QgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuXG4gICAgdGhpcy5saW5rcyA9IHt9O1xuXG4gICAgLy8gbGlua3NcbiAgICB0cnkge1xuICAgICAgICBpZiAoaGVhZGVyLmxpbmspIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSB1dGlscy5wYXJzZUxpbmtzKGhlYWRlci5saW5rKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICB9XG59O1xuXG4vKipcbiAqIFNldCBmbGFncyBzdWNoIGFzIGAub2tgIGJhc2VkIG9uIGBzdGF0dXNgLlxuICpcbiAqIEZvciBleGFtcGxlIGEgMnh4IHJlc3BvbnNlIHdpbGwgZ2l2ZSB5b3UgYSBgLm9rYCBvZiBfX3RydWVfX1xuICogd2hlcmVhcyA1eHggd2lsbCBiZSBfX2ZhbHNlX18gYW5kIGAuZXJyb3JgIHdpbGwgYmUgX190cnVlX18uIFRoZVxuICogYC5jbGllbnRFcnJvcmAgYW5kIGAuc2VydmVyRXJyb3JgIGFyZSBhbHNvIGF2YWlsYWJsZSB0byBiZSBtb3JlXG4gKiBzcGVjaWZpYywgYW5kIGAuc3RhdHVzVHlwZWAgaXMgdGhlIGNsYXNzIG9mIGVycm9yIHJhbmdpbmcgZnJvbSAxLi41XG4gKiBzb21ldGltZXMgdXNlZnVsIGZvciBtYXBwaW5nIHJlc3BvbmQgY29sb3JzIGV0Yy5cbiAqXG4gKiBcInN1Z2FyXCIgcHJvcGVydGllcyBhcmUgYWxzbyBkZWZpbmVkIGZvciBjb21tb24gY2FzZXMuIEN1cnJlbnRseSBwcm92aWRpbmc6XG4gKlxuICogICAtIC5ub0NvbnRlbnRcbiAqICAgLSAuYmFkUmVxdWVzdFxuICogICAtIC51bmF1dGhvcml6ZWRcbiAqICAgLSAubm90QWNjZXB0YWJsZVxuICogICAtIC5ub3RGb3VuZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAgIGNvbnN0IHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gICAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gICAgLy8gYmFzaWNzXG4gICAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICAgIHRoaXMub2sgPSAyID09IHR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdCA9IDMgPT0gdHlwZTtcbiAgICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICAgIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gICAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgICAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAvLyBzdWdhclxuICAgIHRoaXMuY3JlYXRlZCA9IDIwMSA9PSBzdGF0dXM7XG4gICAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub0NvbnRlbnQgPSAyMDQgPT0gc3RhdHVzO1xuICAgIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gICAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90QWNjZXB0YWJsZSA9IDQwNiA9PSBzdGF0dXM7XG4gICAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90Rm91bmQgPSA0MDQgPT0gc3RhdHVzO1xuICAgIHRoaXMudW5wcm9jZXNzYWJsZUVudGl0eSA9IDQyMiA9PSBzdGF0dXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy50eXBlID0gc3RyID0+IHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IHN0ciA9PiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKChvYmosIHN0cikgPT4ge1xuICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKTtcbiAgY29uc3Qga2V5ID0gcGFydHMuc2hpZnQoKTtcbiAgY29uc3QgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gIHJldHVybiBvYmo7XG59LCB7fSk7XG5cbi8qKlxuICogUGFyc2UgTGluayBoZWFkZXIgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyc2VMaW5rcyA9IHN0ciA9PiBzdHIuc3BsaXQoLyAqLCAqLykucmVkdWNlKChvYmosIHN0cikgPT4ge1xuICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgY29uc3QgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICBjb25zdCByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gIG9ialtyZWxdID0gdXJsO1xuICByZXR1cm4gb2JqO1xufSwge30pO1xuXG4vKipcbiAqIFN0cmlwIGNvbnRlbnQgcmVsYXRlZCBmaWVsZHMgZnJvbSBgaGVhZGVyYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5jbGVhbkhlYWRlciA9IChoZWFkZXIsIGNoYW5nZXNPcmlnaW4pID0+IHtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgLy8gc2VjdWlydHlcbiAgaWYgKGNoYW5nZXNPcmlnaW4pIHtcbiAgICBkZWxldGUgaGVhZGVyWydhdXRob3JpemF0aW9uJ107XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJ1xuaW1wb3J0IHN1cGVyYWdlbnQgZnJvbSAnc3VwZXJhZ2VudCdcbmltcG9ydCAnc3VwZXJhZ2VudC1kamFuZ28tY3NyZidcblxuY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XG4gICdmb3JtJzogJy5zdWJzY3JpYmUtZm9ybScsXG59XG5cbmNvbnN0IGN1cnJlbnRTY3JpcHQgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0IHx8IChmdW5jdGlvbiAoKSB7XG4gIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpXG4gIHJldHVybiBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV1cbn0pKClcblxuZnVuY3Rpb24gZ2V0RGF0YUF0dHJpYnV0ZXMgKGVsKSB7XG4gIGxldCBhdHRycyA9IHt9XG4gIGZvciAobGV0IGtleSBvZiBlbC5nZXRBdHRyaWJ1dGVOYW1lcygpKSB7XG4gICAgbGV0IG1hdGNoID0ga2V5LnRvU3RyaW5nKCkubWF0Y2goL15kYXRhLShbLVxcd10rKSQvKVxuICAgIGlmIChtYXRjaCkge1xuICAgICAgYXR0cnNbbWF0Y2hbMV1dID0gZWwuZ2V0QXR0cmlidXRlKGtleSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGF0dHJzXG59XG5cbmZ1bmN0aW9uIGdldFNjcmlwdENvbmZpZyAoZGVmYXVsdHMgPSB7fSkge1xuICByZXR1cm4geyAuLi5kZWZhdWx0cywgLi4uZ2V0RGF0YUF0dHJpYnV0ZXMoY3VycmVudFNjcmlwdCkgfVxuXG59XG5cbmZ1bmN0aW9uIGZpbmRJbnB1dExhYmVsICgkaW5wdXRfZmllbGQpIHtcbiAgY29uc3QgbGFiZWxzID0gW1xuICAgICQoYGxhYmVsW2Zvcj0nJHskaW5wdXRfZmllbGQuYXR0cignaWQnKX0nXWApLFxuICAgICRpbnB1dF9maWVsZC5wYXJlbnRzKCdsYWJlbCcpLFxuICAgICRpbnB1dF9maWVsZC5hdHRyKCdwbGFjZWhvbGRlcicpLFxuICAgICRpbnB1dF9maWVsZC5hdHRyKCduYW1lJyksXG4gIF1cblxuICBmb3IgKGxldCBsYWJlbCBvZiBsYWJlbHMpIHtcbiAgICBpZiAobGFiZWwgJiYgbGFiZWwubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHR5cGVvZiBsYWJlbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gbGFiZWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsYWJlbFswXS5pbm5lclRleHQudHJpbSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlICgkaW5wdXRfZmllbGQpIHtcbiAgY29uc3QgdHlwZSA9ICRpbnB1dF9maWVsZC5hdHRyKCd0eXBlJylcbiAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcgfHwgdHlwZSA9PT0gJ3JhZGlvJykge1xuICAgIGlmICghJGlucHV0X2ZpZWxkLmF0dHIoJ3ZhbHVlJykpIHtcbiAgICAgIGNvbnN0IGxhYmVsID0gZmluZElucHV0TGFiZWwoJGlucHV0X2ZpZWxkKVxuICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiBsYWJlbFxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gJGlucHV0X2ZpZWxkLnZhbCgpXG5cbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUgKCRpbnB1dF9maWVsZCkge1xuICBjb25zdCBsYWJlbCA9IGZpbmRJbnB1dExhYmVsKCRpbnB1dF9maWVsZClcbiAgY29uc3QgZGlzcGxheU5hbWVzID0gW1xuICAgICRpbnB1dF9maWVsZC5hdHRyKCdkYXRhLWRpc3BsYXktbmFtZScpLFxuICAgIGxhYmVsLFxuICAgICRpbnB1dF9maWVsZC5hdHRyKCdwbGFjZWhvbGRlcicpLFxuICBdXG4gIGZvciAobGV0IG5hbWUgb2YgZGlzcGxheU5hbWVzKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiBuYW1lXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdyb3VwSW5wdXREYXRhIChpbnB1dERhdGEpIHtcbiAgbGV0IGlucHV0RGF0YU1hcCA9IHt9XG4gIGlucHV0RGF0YS5tYXAoKGksIGwpID0+IHtcbiAgICBjb25zdCBuYW1lID0gbC5uYW1lIHx8IGwuZGlzcGxheV9uYW1lXG4gICAgbGV0IGdfbCA9IGlucHV0RGF0YU1hcFtuYW1lXVxuICAgIGlmICghZ19sKSB7XG4gICAgICBnX2wgPSB7IC4uLmwsIHZhbHVlOiBbXSB9XG4gICAgfVxuICAgIGlmIChsLnZhbHVlKSB7XG4gICAgICBnX2wudmFsdWUucHVzaChsLnZhbHVlKVxuICAgIH1cbiAgICBpbnB1dERhdGFNYXBbbmFtZV0gPSBnX2xcbiAgfSlcbiAgY29uc3QgZ3JvdXBlZERhdGEgPSBbXVxuICBmb3IgKGxldCBkIG9mIE9iamVjdC52YWx1ZXMoaW5wdXREYXRhTWFwKSkge1xuICAgIGlmIChkLnZhbHVlLmxlbmd0aCA8PSAxKSB7XG4gICAgICBkLnZhbHVlID0gZC52YWx1ZVswXVxuICAgIH1cbiAgICBncm91cGVkRGF0YS5wdXNoKGQpXG4gIH1cbiAgcmV0dXJuIGdyb3VwZWREYXRhXG59XG5cbmZ1bmN0aW9uIGNvbGxlY3REYXRhRm9ybSAoZm9ybSkge1xuICBjb25zdCAkZm9ybSA9ICQoZm9ybSlcbiAgY29uc3QgJGlucHV0cyA9ICRmb3JtLmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJylcbiAgY29uc3QgaW5wdXREYXRhID0gJGlucHV0cy5tYXAoKGksIGZpZWxkKSA9PiB7XG4gICAgY29uc3QgJGZpZWxkID0gJChmaWVsZClcbiAgICBjb25zdCBpc19maWxlID0gJGZpZWxkLmF0dHIoJ3R5cGUnKSA9PT0gJ2ZpbGUnXG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZSgkZmllbGQpXG4gICAgY29uc3QgbmFtZSA9ICRmaWVsZC5hdHRyKCduYW1lJylcbiAgICBjb25zdCBkaXNwbGF5X25hbWUgPSBnZXREaXNwbGF5TmFtZSgkZmllbGQpXG4gICAgcmV0dXJuIHsgdmFsdWUsIG5hbWUsIGRpc3BsYXlfbmFtZSwgaXNfZmlsZSB9XG4gIH0pXG4gIHJldHVybiBncm91cElucHV0RGF0YShpbnB1dERhdGEpXG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RGaWxlcyAoJGZvcm0pIHtcbiAgLy9odHRwOi8vaWdzdGFuLnJvL3Bvc3RzLzIwMDktMDEtMTEtYWpheC1maWxlLXVwbG9hZC13aXRoLXB1cmUtamF2YXNjcmlwdC5odG1sXG4gIGNvbnN0ICRpbnB1dHMgPSAkZm9ybS5maW5kKCdpbnB1dFt0eXBlPVxcJ2ZpbGVcXCddJylcbiAgcmV0dXJuICRpbnB1dHMubWFwKChpbnB1dCkgPT4ge1xuICAgIHJldHVybiBbaW5wdXQubmFtZSwgaW5wdXQuZmlsZXNdXG4gIH0pXG5cbn1cblxuY29uc3QgQ09ORklHID0gZ2V0U2NyaXB0Q29uZmlnKERFRkFVTFRfQ09ORklHKVxuXG5mdW5jdGlvbiBvblN1Ym1pdEZvcm0gKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcblxuICBjb25zdCAkZm9ybSA9ICQoZS50YXJnZXQpXG4gIGNvbnN0IGZvcm1EYXRhID0gY29sbGVjdERhdGFGb3JtKCRmb3JtKVxuICBjb25zdCBmb3JtRmlsZXMgPSBjb2xsZWN0RmlsZXMoJGZvcm0pXG4gIGNvbnNvbGUubG9nKGZvcm1EYXRhKVxuXG4gIGxldCByZXF1ZXN0ID0gc3VwZXJhZ2VudC5wb3N0KENPTkZJRy5lbmRwb2ludCkuXG4gICAgc2V0KCdBUEktS2V5JywgQ09ORklHLmtleSkuXG4gICAgc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpLlxuICAgIGZpZWxkKHsgJ2Zvcm1fZGF0YSc6IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKSB9KVxuXG4gIGZvcm1GaWxlcy5tYXAoKGksIFtuYW1lLCBmaWxlc10pID0+IHtcbiAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICByZXF1ZXN0ID0gcmVxdWVzdC5hdHRhY2gobmFtZSwgZmlsZSlcbiAgICB9XG4gIH0pXG4gIHJlcXVlc3QudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAkZm9ybS50cmlnZ2VyKCdzdWJzY3JpYmVfZm9ybTpzdWNjZXNzJywge1xuICAgICAgZXZlbnQ6IGUsXG4gICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgIGZpbGVzOiBmb3JtRmlsZXMsXG4gICAgICByZXNwb25zZSxcbiAgICB9KVxuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAkZm9ybS50cmlnZ2VyKCdzdWJzY3JpYmVfZm9ybTplcnJvcicsIHtcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICBmaWxlczogZm9ybUZpbGVzLFxuICAgICAgZXJyb3IsXG4gICAgfSlcbiAgfSlcblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYmluZEV2ZW50IChzZWxlY3RvciwgZXZlbnQsIGNiKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKENPTkZJRy5mb3JtKSkge1xuICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH1cbiAgfSlcbn1cblxuJCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKENPTkZJRylcbiAgYmluZEV2ZW50KENPTkZJRy5mb3JtLCAnc3VibWl0Jywgb25TdWJtaXRGb3JtKVxuICBiaW5kRXZlbnQoQ09ORklHLmZvcm0sICdzdWJzY3JpYmVfZm9ybTpzdWNjZXNzJywgKGUpID0+IHtcbiAgICBlLnRhcmdldC5yZXNldCgpXG4gIH0pXG59KSJdLCJzb3VyY2VSb290IjoiIn0=