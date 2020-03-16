"""Room Slot Booking Project URL Configuration

The `urlpatterns` list routes URLs to views.
"""

# Django and Rest Framework imports
import os

from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from rest_framework.authtoken.views import obtain_auth_token

# Custom views imports
from RoomSlotBookingProject.settings import BASE_DIR
from roomBookings import views as room_views
from userAuth import views as user_views


# Function to serve static files 
# (takes path1 and path2 from url regex and passes it to Django's default serve function)
def my_serve(request, path1, path2, document_root=None, show_indexes=False):
    return serve(request, str(path1) + '.' + str(path2), document_root=document_root, show_indexes=show_indexes)


urlpatterns = [
    # Django Admin panel route
    path('admin/', admin.site.urls, name="admin"),
    
    # userAuth app URLs
    path('api/login', obtain_auth_token, name="login"),
    path('api/signup', user_views.Signup.as_view(), name="signup"),
    path('api/profile', user_views.Profile.as_view(), name="profile"),
    
    # roomBooking app URLs
    path('api/rooms', room_views.Rooms.as_view(), name="rooms"),
    path('api/rooms/<int:id>', room_views.RoomsRUD.as_view(), name="rooms_rud"),
    path('api/timeslots', room_views.TimeSlots.as_view(), name="timeslots"),
    path('api/timeslots/<int:id>', room_views.TimeSlotsRD.as_view(), name="timeslots_rd"),
    path('api/bookings', room_views.Bookings.as_view(), name="bookings"),
    path('api/bookings/<int:id>', room_views.BookingsRD.as_view(), name="bookings_rd"),

    # Serve static files of format *.*, e.g. manifest.json , static/js/action.js
    re_path(r'^(?P<path1>.*)[.](?P<path2>.*)$', my_serve, {
        'document_root': os.path.join(BASE_DIR, 'frontend/build'),
    }, name="frontend_static_files"),
    
    # Render React index page for any other route (including route '/')
    re_path('.*', TemplateView.as_view(template_name='index.html'), name="frontend_index")
]
