from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView


# @csrf_exempt
from userAuth.models import User
from userAuth.serializers import UserSerializer


class signup(CreateAPIView):
    model = User
    serializer_class = UserSerializer


def get_role(req):
    try:
        if Token.objects.get(key=req.headers.get('Authorization').split(' ')[1]).user.is_customer:
            return JsonResponse({"role": "customer"})
        else:
            return JsonResponse({"role": "roomManager"})
    except:
        return JsonResponse({"details": "Invalid token"}, status=403)