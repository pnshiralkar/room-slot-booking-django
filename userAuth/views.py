from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from . import permissions as my_permissions

# @csrf_exempt
from userAuth.models import User
from userAuth.serializers import UserSerializer, UserRUDSerializer


class Signup(CreateAPIView):
    model = User
    serializer_class = UserSerializer


class Profile(RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, my_permissions.IsSelf]
    serializer_class = UserRUDSerializer

    def get_object(self):
        return get_object_or_404(User.objects.filter(id=self.request.user.id))

    def get_queryset(self):
        self.id = self.request.user.id
        return User.objects.filter(id=self.request.user.id)



def get_role(req):
    try:
        if Token.objects.get(key=req.headers.get('Authorization').split(' ')[1]).user.is_customer:
            return JsonResponse({"role": "customer"})
        else:
            return JsonResponse({"role": "roomManager"})
    except:
        return JsonResponse({"details": "Invalid token"}, status=403)
