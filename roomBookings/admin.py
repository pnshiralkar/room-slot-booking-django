from django.contrib import admin

from roomBookings.models import TimeSlot, Room, Booking


# Display Time Sots as list in Admin Panel
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('time_from', 'time_to', 'room_id')


# Display Bookings as list in Admin Panel
class BookingAdmin(admin.ModelAdmin):
    list_display = ('date', 'customer', 'time_slot')


# Register Room, TimeSlot and Bookings model
admin.site.register(Room)
admin.site.register(TimeSlot, TimeSlotAdmin)
admin.site.register(Booking, BookingAdmin)
