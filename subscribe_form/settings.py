# coding: utf-8
from __future__ import unicode_literals

from django.conf import settings
from django.core.urlresolvers import reverse_lazy

DEFAULT_SETTINGS = dict(
    endpoint=reverse_lazy('subscribe_form:create'),
)

SETTINGS = dict(DEFAULT_SETTINGS)
SETTINGS.update(getattr(settings, 'SUBSCRIBE_FORM', {}))

API_ENDPOINT = SETTINGS['endpoint']
