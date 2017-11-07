# coding: utf-8
from __future__ import unicode_literals



EMAIL_BACKEND = 'post_office.EmailBackend'

POST_OFFICE = {
    'BACKENDS': {
        'default': 'django.core.mail.backends.smtp.EmailBackend',
        'console': 'django.core.mail.backends.console.EmailBackend'
    }
}

EMAIL_HOST = 'smtp.mailgun.org'
EMAIL_PORT = 465

EMAIL_HOST_USER = 'user'
EMAIL_HOST_PASSWORD = 'password'

EMAIL_USE_TLS = False
EMAIL_USE_SSL = True

DEFAULT_FROM_EMAIL = 'example@example.com'
