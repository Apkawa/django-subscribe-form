from django.conf.urls import include, url
from django.contrib import admin

import views

admin.autodiscover()

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^subscribe/', include('subscribe_form.urls')),
    url(r'^$', views.ExampleFormView.as_view())
]
