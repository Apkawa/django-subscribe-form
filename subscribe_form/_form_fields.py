# coding: utf-8
# from https://gist.github.com/eerien/7002396
import six
from django import forms
from django.core import validators
from django.core.exceptions import ValidationError

from post_office.validators import validate_comma_separated_emails

__all__ = ['CommaSeparatedCharField', 'CommaSeparatedEmailFormField']


class MinLengthValidator(validators.MinLengthValidator):
    message = 'Ensure this value has at least %(limit_value)d elements (it has %(show_value)d).'


class MaxLengthValidator(validators.MaxLengthValidator):
    message = 'Ensure this value has at most %(limit_value)d elements (it has %(show_value)d).'


class CommaSeparatedCharField(forms.Field):
    def __init__(self, unique=True, max_length=None, min_length=None, *args, **kwargs):
        self.unique, self.max_length, self.min_length = unique, max_length, min_length
        super(CommaSeparatedCharField, self).__init__(*args, **kwargs)
        if min_length is not None:
            self.validators.append(MinLengthValidator(min_length))
        if max_length is not None:
            self.validators.append(MaxLengthValidator(max_length))

    def prepare_value(self, value):
        if isinstance(value, (list, tuple)):
            return ", ".join(value)
        return value

    def to_python(self, value):
        if value in validators.EMPTY_VALUES:
            return []

        value = [item.strip() for item in value.split(',') if item.strip()]
        if self.unique:
            value = list(set(value))

        return value


class CommaSeparatedEmailFormField(CommaSeparatedCharField):
    default_validators = [validate_comma_separated_emails]
