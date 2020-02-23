from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator, UniqueTogetherValidator

from userAuth.models import User


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_customer=validated_data['is_customer'],
            is_room_manager=validated_data['is_room_manager']
        )
        user.set_password(validated_data['password'])
        user.save()
        user.password = '**hidden**'
        return user

    def validate(self, attrs):
        print(attrs.get('is_customer'), attrs.get('is_room_manager'))
        if not (attrs.get('is_customer') ^ attrs.get('is_room_manager')):
            raise serializers.ValidationError("User should be either customer or room manager (include and set either "
                                              "is_customer or is_room_manager to true")
        return attrs

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'is_customer', 'is_room_manager', 'password']
        extra_kwargs = {'first_name': {'required': True}, 'last_name': {'required': True}}
        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['email']
            )
        ]
