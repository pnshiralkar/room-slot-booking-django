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
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from userAuth import views as userViews
from roomBookings import views as roomViews
from userAuth.views import get_role

urlpatterns = [
    path('admin/', admin.site.urls),
    path('role', get_role),
    path('login', obtain_auth_token),
    path('signup', userViews.Signup.as_view()),
    path('profile', userViews.Profile.as_view()),
    path('rooms', roomViews.Rooms.as_view()),
    path('rooms/<int:id>', roomViews.RoomsRUD.as_view()),
    path('timeslots', roomViews.TimeSlots.as_view()),
    path('timeslots/<int:id>', roomViews.TimeSlotsRD.as_view()),
    path('bookings', roomViews.Bookings.as_view()),
    path('bookings/<int:id>', roomViews.BookingsRD.as_view()),
]
