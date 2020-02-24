from django.db import models
from rest_framework import serializers
from datetime import datetime
from roomBookings.models import Room, TimeSlot, Booking


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {'owner': {'required': False}}
        read_only_fields = ['owner']


class TimeSlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'

    def validate(self, attrs):
        if attrs['time_from'] >= attrs['time_to']:
            raise serializers.ValidationError("time_to should be greater than time_from")
        print(TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from']).count())
        if TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from'],
                                   time_from__lte=attrs['time_to']).count():
            raise serializers.ValidationError("Time slots should not overlap for a particular room")
        return attrs


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Booking
        extra_kwargs = {'customer': {'required': False}}

    def validate(self, attrs):
        if (attrs['date'] - datetime.date(datetime.now())).days > attrs['time_slot'].room_id.num_days_in_adv:
            raise serializers.ValidationError("You can book only "
                                              + str(attrs['time_slot'].room_id.num_days_in_adv)
                                              + "days in advance for this room")
        if Booking.objects.filter(date=attrs['date'], time_slot=attrs['time_slot']).count():
            raise serializers.ValidationError("Slot already booked")

        return attrs
