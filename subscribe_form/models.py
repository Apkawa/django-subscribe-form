# coding=utf-8
from __future__ import unicode_literals

import uuid

from django.db import models
from django.forms.utils import flatatt
from django.templatetags.static import static
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _

from jsonfield import JSONField
from post_office.fields import CommaSeparatedEmailField
from post_office.validators import validate_email_with_name

from .settings import API_ENDPOINT


class Form(models.Model):
    title = models.CharField(max_length=128)

    key = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    # TODO
    fields = JSONField(default={}, editable=False)

    class Meta:
        verbose_name = 'Form'
        verbose_name_plural = 'Forms'

    def __unicode__(self):
        return self.title

    def get_embedding_code(self, data_params=None):
        data_attrs = data_params or {}
        data_attrs.update(
            {
                'key': self.key,
                'endpoint': API_ENDPOINT
            }
        )
        attrs = {
            'src': static('subscribe_form/js/subscribe.js'),
        }
        attrs.update({'data-' + k: v for k, v in data_attrs.items()})
        code = format_html('<script{attrs}></script>', attrs=flatatt(attrs))
        return code


class EmailTemplate(models.Model):
    title = models.CharField(max_length=254)

    from_email = models.CharField(_("Email From"), max_length=254,
        validators=[validate_email_with_name],
        blank=True)

    to = CommaSeparatedEmailField(_("Email To"))
    is_reply_to_sender = models.BooleanField(_("Is reply to sender"), default=False)
    do_forward_attachments = models.BooleanField(_('Do forward attachments'), default=False)

    cc = CommaSeparatedEmailField(_("Cc"))
    bcc = CommaSeparatedEmailField(_("Bcc"))

    email_template = models.ForeignKey('post_office.EmailTemplate', null=True, blank=True)

    class Meta:
        verbose_name = 'Email template'
        verbose_name_plural = 'Email templates'


class EmailTemplateAttachment(models.Model):
    email_template = models.ForeignKey(EmailTemplate)
    filename = models.CharField("File name", max_length=128)
    file = models.FileField(upload_to='subscribe_form/template/')

    class Meta:
        verbose_name = 'Email template attachment'
        verbose_name_plural = 'Email template attachments'


class FormEmailTemplate(models.Model):
    subscribe_form = models.ForeignKey(Form)
    email_template = models.ForeignKey(EmailTemplate)


class Subscription(models.Model):
    form = models.ForeignKey(Form, related_name='subscriptions')

    email = models.EmailField(blank=True)

    fields = JSONField(default={})

    referer = models.URLField(null=True)
    host = models.CharField(max_length=50, null=True)
    tag = models.CharField(max_length=128, blank=True, null=True)
    user_ip = models.IPAddressField(null=True)
    created = models.DateTimeField(auto_now_add=True, blank=True, editable=False)

    class Meta:
        verbose_name = 'Subscription'
        verbose_name_plural = 'Subscriptions'


class SubscriptionAttachment(models.Model):
    subscribe = models.ForeignKey(Subscription, related_name='attachments')
    name = models.CharField('Field name', max_length=42)
    display_name = models.CharField('Field display name', max_length=128)
    filename = models.CharField("File name", max_length=128)
    file = models.FileField(upload_to='subscribe_form/subscribe/')

    class Meta:
        verbose_name = 'Email template attachment'
        verbose_name_plural = 'Email template attachments'
