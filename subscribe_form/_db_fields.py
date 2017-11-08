# coding: utf-8
from __future__ import unicode_literals

from post_office.fields import CommaSeparatedEmailField as _CommaSeparatedEmailField

from ._form_fields import CommaSeparatedEmailFormField

__all__ = ['CommaSeparatedEmailField']


class CommaSeparatedEmailField(_CommaSeparatedEmailField):
    def formfield(self, **kwargs):
        kwargs.setdefault('form_class', CommaSeparatedEmailFormField)
        return super(CommaSeparatedEmailField, self).formfield(**kwargs)
