# coding: utf-8
from __future__ import unicode_literals

from django.dispatch import Signal


def handle_subscribe_created(sender, instance, request, **kwargs):
    instance.send_notification()


subscribe_created = Signal(providing_args=['instance', 'request'])
subscribe_created.connect(handle_subscribe_created)
