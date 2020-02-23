from rest_framework import serializers

from roomBookings.models import Room, TimeSlot


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

    def validate_time_from(self, attr):
        if len(str(attr)) != 4:
            raise serializers.ValidationError("time_from should be in format HHMM (24-hr format)")
        return attr

    def validate_time_to(self, attr):
        if len(str(attr)) != 4:
            raise serializers.ValidationError("time_to should be in format HHMM (24-hr format)")
        return attr

    def validate(self, attrs):
        if int(attrs['time_from']) >= int(attrs['time_to']):
            raise serializers.ValidationError("time_to should be greater than time_from")
        print(TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from']).count())
        if TimeSlot.objects.filter(room_id=attrs['room_id'], time_to__gte=attrs['time_from'],
                                   time_from__lte=attrs['time_to']).count():
            raise serializers.ValidationError("Time slots should not overlap for a particular room")
        return attrs
