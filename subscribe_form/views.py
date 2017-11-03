import json
from urlparse import urlparse

import os
from django.db.transaction import atomic
from django.shortcuts import render
from django.http import HttpResponseBadRequest, HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from django.views.generic.base import View
from django.core.exceptions import PermissionDenied

from .models import Form, Subscription, SubscriptionAttachment

API_KEY_HEADER = 'HTTP_API_KEY'


class SubscribeView(View):
    def get_key(self):
        keys = [
            self.request.META.get(API_KEY_HEADER),
            self.request.POST.get('api_key'),
            self.request.GET.get('api_key'),
        ]
        try:
            return filter(None, keys)[0]
        except IndexError:
            raise PermissionDenied('No api key')

    def get_subscribe_form(self):
        key = self.get_key()
        try:
            return Form.objects.get(key=key)
        except Form.DoesNotExist:
            raise PermissionDenied('Invalid api key')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(SubscribeView, self).dispatch(request, *args, **kwargs)

    @atomic
    def post(self, request, *args, **kwargs):
        subscribe_form = self.get_subscribe_form()
        try:
            fields = json.loads(request.POST['form_data'])
        except (IndexError, ValueError):
            return HttpResponseBadRequest('no form_data or json decode problem')

        referer = (request.META.get('HTTP_REFERER') or '')[:180]
        host = urlparse(referer).hostname
        user_ip = request.META['REMOTE_ADDR']

        fields_map = {
            f['name'] or f['display_name']: f for f in fields
        }

        subscription = Subscription(
            form=subscribe_form,
            email=fields_map['email'],
            user_ip=user_ip,
            referer=referer,
            host=host,
            tag=request.POST.get('tag')
        )
        subscription.save()

        for field_name in request.FILES.keys():
            display_name = field_name
            if field_name in fields_map:
                display_name = fields_map.get('display_name') or field_name
            for upload_file in request.FILES.getlist(field_name):
                subscription.attachments.create(
                    filename=os.path.split(upload_file.name)[1],
                    file=upload_file,
                    name=field_name,
                    display_name=display_name
                )
        return HttpResponse(json.dumps({"status": "ok"}), status=201)
