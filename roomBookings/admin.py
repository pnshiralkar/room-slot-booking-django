from django.contrib import admin

# Register your models here.
from roomBookings.models import TimeSlot, Room, Booking


class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('time_from', 'time_to', 'room_id')


class BookingAdmin(admin.ModelAdmin):
    list_display = ('date', 'customer', 'time_slot')


admin.site.register(Room)
admin.site.register(TimeSlot, TimeSlotAdmin)
admin.site.register(Booking, BookingAdmin)
