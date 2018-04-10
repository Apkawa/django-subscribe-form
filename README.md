[![Build Status](https://travis-ci.org/Apkawa/django-multitype-file-field.svg?branch=master)](https://travis-ci.org/Apkawa/django-multitype-file-field)
[![Coverage Status](https://coveralls.io/repos/github/Apkawa/django-multitype-file-field/badge.svg)](https://coveralls.io/github/Apkawa/django-multitype-file-field)
[![codecov](https://codecov.io/gh/Apkawa/django-multitype-file-field/branch/master/graph/badge.svg)](https://codecov.io/gh/Apkawa/django-multitype-file-field)
[![Requirements Status](https://requires.io/github/Apkawa/django-multitype-file-field/requirements.svg?branch=master)](https://requires.io/github/Apkawa/django-multitype-file-field/requirements/?branch=master)
[![PyPI](https://img.shields.io/pypi/pyversions/django-multitype-file-field.svg)]()

Project for merging different file types, as example easy thumbnail image and unpacking archive in one field

# Installation

```bash
pip install django-subscribe-form

```

or from git

```bash
pip install -e git+https://github.com/Apkawa/django-subscribe-form.git#egg=django-subscribe-form
```

## Django and python version

* python-2.7 - django>=1.8,<=1.11
* python-3.4 - django>=1.8,<=1.11
* python-3.5 - django>=1.8,<=1.11
* python-3.6 - django>=1.11


# Configuration

1. Add to `INSTALLED_APPS` `post_office`, `corsheaders` and `subscribe_form` 

```python
INSTALLED_APPS = [
    #...
    'post_office',
    'subscribe_form',
    #...
]
```
2. Configure `corsheaders`
```python

MIDDLEWARE_CLASSES = (
    #...
    'corsheaders.middleware.CorsMiddleware',
    #...
    )
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
from corsheaders.defaults import default_headers

CORS_ALLOW_HEADERS = default_headers + (
    'api-key',
)
```
2. Add to `urls.py`

```python

from django.conf.urls import include, url

urlpatterns = [
    url(r'^subscribe/', include('subscribe_form.urls')),
]
```
3. Run migrations
```bash
./manage migrate
```

# Usage

1. Create `post_office.EmailTemplate` instance in admin
[http://127.0.0.1:8000/admin/post_office/emailtemplate/add/](http://127.0.0.1:8000/admin/post_office/emailtemplate/add/)

Example content fields

* `subject`
```
From site {{ host }} was submited form from {{ fields.full_name.value|default:email }}

```
* `content`
```
{{ fields.full_name.value }}
{% for key,field in fields.items %}
{{ field.display_name|default:key }}: {{ field.value }}
{% endfor %}

Host: {{ host }}
Referer: {{ referer }}
```
2. Create `subscribe_form.EmailTemplate` instance
[http://127.0.0.1:8000/admin/subscribe_form/emailtemplate/add/](http://127.0.0.1:8000/admin/subscribe_form/emailtemplate/add/)

3. Create `subscrube_form.Form` instance and get emdedding code

4. Add embedding code to page:
```
    <script 
     data-endpoint="//example.com/api/v1/subscribe/subscribe/" 
     data-key="4a96f68d-7acb-4f7f-8e43-63e8902bf08f" 
     src="//example.com/static/subscribe_form/js/subscribe.js?r=dev">
     </script>
```




# Contributing

## run tests

```bash
pip install -r requirements.txt
./test/manage.py migrate
pytest
tox
```

## publish pypi

```bash
python setup.py sdist upload -r pypi
```






