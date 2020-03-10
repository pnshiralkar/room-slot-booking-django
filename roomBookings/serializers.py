from django.db import models
from rest_framework import serializers
from datetime import datetime
from roomBookings.models import Room, TimeSlot, Booking
from userAuth.models import User
from userAuth.serializers import UserField


class RoomField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        pk = super(RoomField, self).to_representation(value)
        try:
            item = Room.objects.get(pk=pk)
            serializer = RoomSerializer(item)
            return serializer.data
        except:
            return None


class TimeSlotField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        pk = super(TimeSlotField, self).to_representation(value)
        try:
            item = TimeSlot.objects.get(pk=pk)
            serializer = TimeSlotsSerializer(item)
            return serializer.data
        except:
            return None


class BookingOnlySerializer(serializers.ModelSerializer):
    # time_slot = TimeSlotField(queryset=TimeSlot.objects.all())

    class Meta:
        fields = ['date']
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


class TimeSlotOnlySerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeSlot
        fields = ['time_from', 'time_to']

    def validate(self, attrs):
        if attrs['time_from'] >= attrs['time_to']:
            raise serializers.ValidationError("time_to should be greater than time_from")
        print(TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from']).count())
        if TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from'],
                                   time_from__lte=attrs['time_to']).count():
            raise serializers.ValidationError("Time slots should not overlap for a particular room")
        return attrs


class TimeSlotForCustomerOnlySerializer(serializers.ModelSerializer):
    bookings = BookingOnlySerializer(many=True, read_only=True)

    class Meta:
        model = TimeSlot
        fields = ['id', 'time_from', 'time_to', 'bookings']

    def validate(self, attrs):
        if attrs['time_from'] >= attrs['time_to']:
            raise serializers.ValidationError("time_to should be greater than time_from")
        print(TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from']).count())
        if TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from'],
                                   time_from__lte=attrs['time_to']).count():
            raise serializers.ValidationError("Time slots should not overlap for a particular room")
        return attrs


class RoomSerializer(serializers.ModelSerializer):
    time_slots = TimeSlotOnlySerializer(many=True, read_only=True)
    owner = UserField(queryset=User.objects.all())

    class Meta:
        model = Room
        fields = ['id', 'name', 'num_days_in_adv', 'owner', 'time_slots']
        extra_kwargs = {'owner': {'required': False}}
        read_only_fields = ['owner', 'time_slots']


class RoomForCustomerSerializer(serializers.ModelSerializer):
    time_slots = TimeSlotForCustomerOnlySerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'num_days_in_adv', 'owner', 'time_slots']
        extra_kwargs = {'owner': {'required': False}}
        read_only_fields = ['owner', 'time_slots']


class TimeSlotsSerializer(serializers.ModelSerializer):
    room_id = RoomField(queryset=Room.objects.all())
    bookings = BookingOnlySerializer(many=True, read_only=True)

    class Meta:
        model = TimeSlot
        fields = ['id', 'time_from', 'time_to', 'room_id', 'bookings']
        read_only_fields = ['bookings']

    def validate(self, attrs):
        if attrs['time_from'] >= attrs['time_to']:
            raise serializers.ValidationError("time_to should be greater than time_from")
        print(TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from']).count())
        if TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from'],
                                   time_from__lte=attrs['time_to']).count():
            raise serializers.ValidationError("Time slots should not overlap for a particular room")
        return attrs


class BookingSerializer(serializers.ModelSerializer):
    time_slot = TimeSlotField(queryset=TimeSlot.objects.all())
    customer = UserField(queryset=User.objects.all())

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
