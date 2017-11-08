# coding: utf-8
from __future__ import unicode_literals

from .compat import urlparse

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse_lazy
from django.templatetags.static import static

SITE_URL = getattr(settings, 'SITE_URL', None)


def get_site_url():
    if SITE_URL:
        url = SITE_URL
    else:
        current_site = Site.objects.get_current()
        url = '//' + current_site.domain
    return url


def get_api_endpoint():
    return "%s%s" % (get_site_url(), API_ENDPOINT)


def get_script():
    static_path = static('subscribe_form/js/subscribe.js')
    parsed = urlparse.urlparse(static_path)
    if not parsed.netloc:
        static_path = urlparse.urljoin(get_site_url(), static_path)
    return static_path


DEFAULT_SETTINGS = dict(
    endpoint=reverse_lazy('subscribe_form:create'),
)

SETTINGS = dict(DEFAULT_SETTINGS)
SETTINGS.update(getattr(settings, 'SUBSCRIBE_FORM', {}))

API_ENDPOINT = SETTINGS['endpoint']
