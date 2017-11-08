# coding=utf-8
from __future__ import unicode_literals

import os
import uuid
from collections import OrderedDict

from django.db import models
from django.db.transaction import atomic
from django.forms.utils import flatatt
from django.templatetags.static import static
from django.core.files.storage import get_valid_filename

from django.utils.html import format_html, conditional_escape
from django.utils.translation import ugettext_lazy as _
from jsonfield import JSONField
from post_office import mail
from post_office.fields import CommaSeparatedEmailField
from post_office.models import PRIORITY
from post_office.validators import validate_email_with_name

from .settings import get_api_endpoint, get_script


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

    def get_email_templates(self):
        return EmailTemplate.objects.filter(formemailtemplate__subscribe_form=self.pk).prefetch_related('attachments')



    def get_embedding_code(self, data_params=None):
        data_attrs = data_params or {}
        data_attrs.update(
            {
                'key': self.key,
                'endpoint': get_api_endpoint()
            }
        )
        attrs = {
            'src': get_script(),
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

    def __unicode__(self):
        return self.title


class EmailTemplateAttachment(models.Model):
    email_template = models.ForeignKey(EmailTemplate, related_name='attachments')
    filename = models.CharField("File name", max_length=128)
    file = models.FileField(upload_to='subscribe_form/template/')

    class Meta:
        verbose_name = 'Email template attachment'
        verbose_name_plural = 'Email template attachments'

    def get_filename(self):
        name = os.path.split(os.path.splitext(self.filename)[0])[1]
        ext = os.path.splitext(self.file.name)[1]
        return name + ext


class FormEmailTemplate(models.Model):
    subscribe_form = models.ForeignKey(Form)
    email_template = models.ForeignKey(EmailTemplate)

    class Meta:
        verbose_name = 'Form email template'
        verbose_name_plural = 'Form email templates'


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

    def get_fields(self):
        fields = []
        for f in self.fields:
            if f.get('is_file'):
                continue
            escaped_fields = {
                conditional_escape(k): conditional_escape(v) if v is None else v
                for k, v in f.items()
            }
            fields.append(
                escaped_fields
            )
        return fields

    def get_context(self):
        fields = OrderedDict([(f['name'], f) for f in self.get_fields()])

        return dict(
            fields=fields,
            email=self.email,
            host=self.host,
            referer=self.referer,
            tag=self.tag,
            user_ip=self.user_ip
        )

    @atomic
    def send_notification(self, now=False):
        form = self.form
        ctx = self.get_context()
        priority = None
        if now:
            priority = PRIORITY.now
        emails = []
        for email_template in form.get_email_templates():
            to = email_template.to
            if email_template.is_reply_to_sender:
                to = [self.email]
            if not to:
                continue

            template_attachments = list(email_template.attachments.all())

            if email_template.do_forward_attachments:
                template_attachments += list(self.attachments.all())

            attachments = {}
            if template_attachments:
                for a in template_attachments:
                    attachments[a.get_filename()] = a.file

            email = mail.send(
                recipients=to,
                sender=email_template.from_email or None,
                bcc=email_template.bcc,
                cc=email_template.cc,
                template=email_template.email_template,
                context=ctx,
                priority=priority,
                attachments=attachments or {}
            )
            emails.append(email)
        return emails


class SubscriptionAttachment(models.Model):
    subscribe = models.ForeignKey(Subscription, related_name='attachments')
    name = models.CharField('Field name', max_length=42)
    display_name = models.CharField('Field display name', max_length=128)
    filename = models.CharField("File name", max_length=128)
    file = models.FileField(upload_to='subscribe_form/subscribe/')

    class Meta:
        verbose_name = 'Email template attachment'
        verbose_name_plural = 'Email template attachments'

    def __unicode__(self):
        return "{self.display_name} ({self.name}): {self.filename}".format(self=self)

    def get_filename(self):
        name = os.path.split(os.path.splitext(self.filename)[0])[1]
        name = '{display_name}_{name}'.format(
            name=name,
            display_name=self.display_name
        )
        ext = os.path.splitext(self.file.name)[1]
        return get_valid_filename(name + ext)
