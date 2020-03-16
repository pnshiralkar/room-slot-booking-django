from datetime import datetime

from rest_framework import serializers

from roomBookings.models import Room, TimeSlot, Booking
from userAuth.models import User
from userAuth.serializers import UserField


# Room Field to return whole room object instead of room_id in nested objects
class RoomField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        pk = super(RoomField, self).to_representation(value)
        items = Room.objects.filter(pk=pk)
        if len(items) > 0:
            serializer = RoomOnlySerializer(items[0])
            return serializer.data
        else:
            return None


# TimeSlot Field to return whole room object instead of time_slot_id in nested objects
class TimeSlotField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        pk = super(TimeSlotField, self).to_representation(value)
        items = TimeSlot.objects.filter(pk=pk)
        if len(items) > 0:
            serializer = TimeSlotOnlyRoomsSerializer(items[0])
            return serializer.data
        else:
            return None

# Serializers for Room object


# Serializer for Booking model without time slot object
class BookingOnlySerializer(serializers.ModelSerializer):

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


# Serializer for TimeSlot model without room object (for nesting in other object)
class TimeSlotOnlyBookingsSerializer(serializers.ModelSerializer):
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


# Serializer for TimeSlot model without associated booking objects (for nesting in other object)
class TimeSlotOnlyRoomsSerializer(serializers.ModelSerializer):
    room_id = RoomField(queryset=Room.objects.all())

    class Meta:
        model = TimeSlot
        fields = ['time_from', 'time_to', 'room_id']

    def validate(self, attrs):
        if attrs['time_from'] >= attrs['time_to']:
            raise serializers.ValidationError("time_to should be greater than time_from")
        print(TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from']).count())
        if TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from'],
                                   time_from__lte=attrs['time_to']).count():
            raise serializers.ValidationError("Time slots should not overlap for a particular room")
        return attrs


# Serializer for Room model
class RoomSerializer(serializers.ModelSerializer):
    time_slots = TimeSlotOnlyBookingsSerializer(many=True, read_only=True)
    owner = UserField(queryset=User.objects.all())

    class Meta:
        model = Room
        fields = ['id', 'name', 'num_days_in_adv', 'owner', 'time_slots']
        extra_kwargs = {'owner': {'required': False}}
        read_only_fields = ['owner', 'time_slots']


# Serializer for Room model Create Operation
class RoomCreateSerializer(serializers.ModelSerializer):
    time_slots = TimeSlotOnlyBookingsSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'num_days_in_adv', 'owner', 'time_slots']
        extra_kwargs = {'owner': {'required': False}}
        read_only_fields = ['owner', 'time_slots']


# Serializer for Room model without related TimeSlot objects (for nesting in other object)
class RoomOnlySerializer(serializers.ModelSerializer):
    owner = UserField(queryset=User.objects.all())

    class Meta:
        model = Room
        fields = ['id', 'name', 'num_days_in_adv', 'owner']
        extra_kwargs = {'owner': {'required': False}}
        read_only_fields = ['owner', 'time_slots']


# Serializer for TimeSlot model
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


# Serializer for Booking model
class BookingSerializer(serializers.ModelSerializer):
    time_slot = TimeSlotField(queryset=TimeSlot.objects.all())
    customer = UserField(queryset=User.objects.all())

    class Meta:
        fields = '__all__'
        model = Booking
        extra_kwargs = {'customer': {'required': False}}
        read_only_fields = ['customer']

    def validate(self, attrs):
        if (attrs['date'] - datetime.date(datetime.now())).days > attrs['time_slot'].room_id.num_days_in_adv:
            raise serializers.ValidationError("You can book only "
                                              + str(attrs['time_slot'].room_id.num_days_in_adv)
                                              + "days in advance for this room")
        if Booking.objects.filter(date=attrs['date'], time_slot=attrs['time_slot']).count():
            raise serializers.ValidationError("Slot already booked")

        return attrs


# Serializer for Booking model for create operation
class BookingCreateSerializer(serializers.ModelSerializer):
    time_slot = TimeSlotField(queryset=TimeSlot.objects.all())

    class Meta:
        fields = '__all__'
        model = Booking
        extra_kwargs = {'customer': {'required': False}}
        read_only_fields = ['customer']

    def validate(self, attrs):
        if (attrs['date'] - datetime.date(datetime.now())).days > attrs['time_slot'].room_id.num_days_in_adv:
            raise serializers.ValidationError("You can book only "
                                              + str(attrs['time_slot'].room_id.num_days_in_adv)
                                              + "days in advance for this room")
        if Booking.objects.filter(date=attrs['date'], time_slot=attrs['time_slot']).count():
            raise serializers.ValidationError("Slot already booked")

        return attrs
