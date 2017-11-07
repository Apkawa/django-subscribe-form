# coding: utf-8
from __future__ import unicode_literals

from django.conf.urls import url, include

from . import views

patterns = [
    url(r'^subscribe/', views.SubscribeView.as_view(), name='create')
]

urlpatterns = [
    url(r'^', include(patterns, namespace='subscribe_form'))
]
