from __future__ import unicode_literals

import six
from django.contrib import admin

# Register your models here.
from django.contrib.admin.utils import flatten_fieldsets
from django.utils.html import format_html, escape, conditional_escape

from .models import (
    Form,
    FormEmailTemplate,
    EmailTemplate,
    EmailTemplateAttachment,
    Subscription,
    SubscriptionAttachment
)


class ReadonlyAdminMixin(object):
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def get_readonly_fields(self, request, obj=None):
        readonly_all = False
        try:
            readonly_all = self.readonly_fields[0] == '__all__'
        except IndexError:
            pass
        if request.user.is_superuser and readonly_all:
            return self.readonly_fields

        if self.declared_fieldsets:
            return flatten_fieldsets(self.declared_fieldsets)
        else:
            return list(set(
                [field.name for field in self.opts.local_fields] +
                [field.name for field in self.opts.local_many_to_many]
            ))


class SubscribeFormEmailTemplateInline(admin.TabularInline):
    extra = 1
    model = FormEmailTemplate


@admin.register(Form)
class SubscribeFormAdmin(admin.ModelAdmin):
    inlines = [SubscribeFormEmailTemplateInline]
    list_display = ['title', 'key']
    readonly_fields = ['key', 'embedding_code']
    fieldsets = (
        (None, {
            'fields': ('title', 'key')
        }),
        ('Embedding code', {
            'fields': ['embedding_code'],
        })
    )

    def embedding_code(self, obj):
        return escape(obj.get_embedding_code())

    embedding_code.allow_tags = True


class EmailTemplateAttachmentInline(admin.TabularInline):
    extra = 1
    model = EmailTemplateAttachment


@admin.register(EmailTemplate)
class EmailTemplateAdmin(admin.ModelAdmin):
    inlines = [EmailTemplateAttachmentInline]


class SubscriptionAttachmentInline(ReadonlyAdminMixin, admin.TabularInline):
    model = SubscriptionAttachment
    extra = 0
    can_delete = False
    exclude = ['id']


@admin.register(Subscription)
class SubscriptionAdmin(ReadonlyAdminMixin, admin.ModelAdmin):
    inlines = [SubscriptionAttachmentInline]
    exclude = ['id']

    list_display = ['host', 'email', 'render_fields', 'form']

    fieldsets = (
        (None, {'fields': [
            'email',
            'render_fields',
        ]}),
        ('Meta', {
            'classes': ('collapse',),

            'fields': [
                'created',
                'user_ip',
                'host',
                'referer',
                'tag',
                'form',
            ],
        })
    )

    def has_change_permission(self, request, obj=None):
        return True

    def render_fields(self, obj):
        fields = obj.get_fields()
        lines = []
        for f in fields:
            value = f.get('value') or ''
            if not isinstance(value, list):
                value = [value]
            line = format_html(u"<strong>{display_name}</strong>: {value}",
                display_name=f.get('display_name') or f['name'],
                value=', '.join(map(six.text_type, value)))
            lines.append(line)

        return u"</br>".join(lines)

    render_fields.short_description = 'Fields'
    render_fields.allow_tags = True
