# -*- coding: utf-8 -*-
import os
import mock
from unittest import TestCase

from django.conf import settings
from django.core.files.base import ContentFile


class GenericTestCase(TestCase):
    def setUp(self):
        pass

    def test_empty(self):
        assert 0
