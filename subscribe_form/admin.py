from django.contrib import admin

# Register your models here.
from django.utils.html import format_html, escape

from .models import Form, FormEmailTemplate, EmailTemplate, EmailTemplateAttachment


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
        ctx = dict(
            key=obj.key,
            src='/static/subscribe_form/subscribe.js',
        )
        code = format_html('<script src="{src}" data-key="{key}"></script>', **ctx)

        return format_html('<pre>{}</pre>', escape(code))

    embedding_code.allow_tags = True


class EmailTemplateAttachmentInline(admin.TabularInline):
    extra = 1
    model = EmailTemplateAttachment


@admin.register(EmailTemplate)
class EmailTemplateAdmin(admin.ModelAdmin):
    inlines = [EmailTemplateAttachmentInline]
