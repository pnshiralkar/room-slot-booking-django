from django.contrib.auth.password_validation import validate_password as default_password_validation
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from userAuth.models import User


# Serializer for User model
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

    # Validate that user is either a customer or Room Manager
    def validate(self, attrs):
        if not (attrs.get('is_customer') ^ attrs.get('is_room_manager')):
            raise serializers.ValidationError("User should be either customer or room manager (include and set either "
                                              "is_customer or is_room_manager to true")
        return attrs

    # Remove password field from response when returning User object
    def to_representation(self, instance):
        ret = super(UserSerializer, self).to_representation(instance)
        ret.pop('password')
        return ret

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


# Serializer for User model for Retrieve, Update and Delete operations
class UserRUDSerializer(serializers.ModelSerializer):
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
        return user

    # Remove password field from response when returning User object
    def to_representation(self, instance):
        ret = super(UserRUDSerializer, self).to_representation(instance)
        ret.pop('password')
        return ret

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'is_customer', 'is_room_manager', 'password']
        extra_kwargs = {'first_name': {'required': True}, 'last_name': {'required': True}}
        read_only_fields = ['is_customer', 'is_room_manager']
        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['email']
            )
        ]


# User Field to return whole User object instead of user_id in nested objects
class UserField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        pk = super(UserField, self).to_representation(value)
        items = User.objects.filter(pk=pk)
        if len(items) > 0:
            serializer = UserSerializer(items[0])
            return serializer.data
        else:
            return None
