"""FOSSEE URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLConf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import render
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from rest_framework.authtoken.views import obtain_auth_token

from FOSSEE import settings
from FOSSEE.settings import BASE_DIR
from userAuth import views as userViews
from roomBookings import views as roomViews
from userAuth.views import get_role


def my_serve(request, path1, path2, document_root=None, show_indexes=False):
    print(path1, path2)
    return serve(request, str(path1) + '.' + str(path2), document_root=document_root, show_indexes=show_indexes)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/role', get_role),
    path('api/login', obtain_auth_token),
    path('api/signup', userViews.Signup.as_view()),
    path('api/profile', userViews.Profile.as_view()),
    path('api/rooms', roomViews.Rooms.as_view()),
    path('api/rooms/<int:id>', roomViews.RoomsRUD.as_view()),
    path('api/timeslots', roomViews.TimeSlots.as_view()),
    path('api/timeslots/<int:id>', roomViews.TimeSlotsRD.as_view()),
    path('api/bookings', roomViews.Bookings.as_view()),
    path('api/bookings/<int:id>', roomViews.BookingsRD.as_view()),
    re_path(r'^(?P<path1>.*)[.](?P<path2>.*)$', my_serve, {
        'document_root': os.path.join(BASE_DIR, 'frontend/build'),
    }),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
