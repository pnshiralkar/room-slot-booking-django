from django.db import models


# Model for room
class Room(models.Model):
    name = models.TextField(null=True)
    num_days_in_adv = models.IntegerField()
    owner = models.ForeignKey('userAuth.User', related_name='rooms', on_delete=models.CASCADE)


# Model for Time Slot
class TimeSlot(models.Model):
    time_from = models.TimeField(max_length=4)
    time_to = models.TimeField(max_length=4)
    room_id = models.ForeignKey(Room, related_name='time_slots', on_delete=models.CASCADE)


# Model for booking
class Booking(models.Model):
    date = models.DateField()
    customer = models.ForeignKey('userAuth.User', related_name='bookingUser', on_delete=models.CASCADE)
    time_slot = models.ForeignKey('roomBookings.TimeSlot', related_name='bookings', on_delete=models.CASCADE)
