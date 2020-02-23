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
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from userAuth import views as userViews
from roomBookings import views as roomViews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', obtain_auth_token),
    path('signup', userViews.signup.as_view()),
    path('rooms', roomViews.Rooms.as_view()),
    path('rooms/<int:id>', roomViews.RoomsRUD.as_view()),
    path('timeslots', roomViews.TimeSlots.as_view()),
    path('timeslots/<int:id>', roomViews.TimeSlotsRUD.as_view()),
]
