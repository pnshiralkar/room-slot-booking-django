from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView

from roomBookings.models import Room
from roomBookings import permissions as my_permissions
from roomBookings.serializers import RoomSerializer


class Rooms(ListCreateAPIView):
    permission_classes = [my_permissions.IsOwner, permissions.IsAuthenticated, my_permissions.IsRoomManager]
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
