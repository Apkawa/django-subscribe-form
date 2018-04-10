# coding: utf-8
from __future__ import unicode_literals

from django.views.generic import TemplateView
from subscribe_form.models import Form


class ExampleFormView(TemplateView):
    template_name = 'tests/form.html'

    def get_context_data(self, **kwargs):
        context = super(ExampleFormView, self).get_context_data(**kwargs)
        context['script_code'] = Form.objects.filter()[0].get_embedding_code()
        return context
