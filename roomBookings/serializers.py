from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator, UniqueTogetherValidator

from userAuth.models import User
from roomBookings.models import Room


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {'owner': {'required': False}}
