# coding: utf-8
from __future__ import unicode_literals

from django.dispatch import Signal

subscribe_created = Signal(providing_args=['subscribe', 'request'])


