from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView


# @csrf_exempt
from userAuth.models import User
from userAuth.serializers import UserSerializer


class signup(CreateAPIView):
    model = User
    serializer_class = UserSerializer
