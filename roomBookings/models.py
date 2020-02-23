from django.db import models


class Room(models.Model):
    location = models.TextField(null=True)
    num_days_in_adv = models.IntegerField()
    owner = models.ForeignKey('userAuth.User', related_name='rooms', on_delete=models.CASCADE)


class TimeSlot(models.Model):
    time_from = models.CharField(max_length=4)
    time_to = models.CharField(max_length=4)
    room_id = models.ForeignKey('roomBookings.Room', related_name='timeSlots', on_delete=models.CASCADE)
    booked = models.BooleanField(default=False)
    bookedBy = models.ForeignKey('userAuth.User', related_name='timeSlotsBook', on_delete=models.CASCADE, null=True)