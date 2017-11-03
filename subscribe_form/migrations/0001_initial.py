# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import jsonfield.fields
import post_office.fields
import post_office.validators
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('post_office', '0006_attachment_mimetype'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailTemplate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=254)),
                ('from_email', models.CharField(blank=True, max_length=254, verbose_name='Email From', validators=[post_office.validators.validate_email_with_name])),
                ('to', post_office.fields.CommaSeparatedEmailField(verbose_name='Email To', blank=True)),
                ('is_reply_to_sender', models.BooleanField(default=False, verbose_name='Is reply to sender')),
                ('do_forward_attachments', models.BooleanField(default=False, verbose_name='Do forward attachments')),
                ('cc', post_office.fields.CommaSeparatedEmailField(verbose_name='Cc', blank=True)),
                ('bcc', post_office.fields.CommaSeparatedEmailField(verbose_name='Bcc', blank=True)),
                ('email_template', models.ForeignKey(blank=True, to='post_office.EmailTemplate', null=True)),
            ],
            options={
                'verbose_name': 'Email template',
                'verbose_name_plural': 'Email templates',
            },
        ),
        migrations.CreateModel(
            name='EmailTemplateAttachment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('filename', models.CharField(max_length=128, verbose_name='File name')),
                ('file', models.FileField(upload_to='subscribe_form/template/')),
                ('email_template', models.ForeignKey(to='subscribe_form.EmailTemplate')),
            ],
            options={
                'verbose_name': 'Email template attachment',
                'verbose_name_plural': 'Email template attachments',
            },
        ),
        migrations.CreateModel(
            name='Form',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=128)),
                ('key', models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('fields', jsonfield.fields.JSONField(default={}, editable=False)),
            ],
            options={
                'verbose_name': 'Form',
                'verbose_name_plural': 'Forms',
            },
        ),
        migrations.CreateModel(
            name='FormEmailTemplate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email_template', models.ForeignKey(to='subscribe_form.EmailTemplate')),
                ('subscribe_form', models.ForeignKey(to='subscribe_form.Form')),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.EmailField(max_length=254, blank=True)),
                ('fields', jsonfield.fields.JSONField(default={})),
                ('referer', models.URLField(null=True)),
                ('host', models.CharField(max_length=50, null=True)),
                ('tag', models.CharField(max_length=128, null=True, blank=True)),
                ('user_ip', models.IPAddressField(null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('form', models.ForeignKey(related_name='subscriptions', to='subscribe_form.Form')),
            ],
            options={
                'verbose_name': 'Subscription',
                'verbose_name_plural': 'Subscriptions',
            },
        ),
        migrations.CreateModel(
            name='SubscriptionAttachment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=42, verbose_name='Field name')),
                ('display_name', models.CharField(max_length=128, verbose_name='Field display name')),
                ('filename', models.CharField(max_length=128, verbose_name='File name')),
                ('file', models.FileField(upload_to='subscribe_form/subscribe/')),
                ('subscribe', models.ForeignKey(related_name='attachments', to='subscribe_form.Subscription')),
            ],
            options={
                'verbose_name': 'Email template attachment',
                'verbose_name_plural': 'Email template attachments',
            },
        ),
    ]
