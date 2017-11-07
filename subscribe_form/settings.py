# coding: utf-8
from __future__ import unicode_literals

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse_lazy

SITE_URL = getattr(settings, 'SITE_URL', None)


def get_api_endpoint():
    if SITE_URL:
        url = SITE_URL
    else:
        current_site = Site.objects.get_current()
        url = '//' + current_site.domain
    return "%s%s" % (url, API_ENDPOINT)


DEFAULT_SETTINGS = dict(
    endpoint=reverse_lazy('subscribe_form:create'),
)

SETTINGS = dict(DEFAULT_SETTINGS)
SETTINGS.update(getattr(settings, 'SUBSCRIBE_FORM', {}))

API_ENDPOINT = SETTINGS['endpoint']
