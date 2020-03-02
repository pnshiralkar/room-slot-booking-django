from django.db import models


class Room(models.Model):
    name = models.TextField(null=True)
    num_days_in_adv = models.IntegerField()
    owner = models.ForeignKey('userAuth.User', related_name='rooms', on_delete=models.CASCADE)


class TimeSlot(models.Model):
    time_from = models.TimeField(max_length=4)
    time_to = models.TimeField(max_length=4)
    room_id = models.ForeignKey('roomBookings.Room', related_name='timeSlots', on_delete=models.CASCADE)


class Booking(models.Model):
    date = models.DateField()
    customer = models.ForeignKey('userAuth.User', related_name='bookingUser', on_delete=models.CASCADE)
    time_slot = models.ForeignKey('roomBookings.TimeSlot', related_name='bookingSlot', on_delete=models.CASCADE)
