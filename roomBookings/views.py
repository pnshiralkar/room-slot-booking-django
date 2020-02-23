from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveDestroyAPIView

from roomBookings.models import Room, TimeSlot
from roomBookings import permissions as my_permissions
from roomBookings.serializers import RoomSerializer, TimeSlotsSerializer


class Rooms(ListCreateAPIView):
    permission_classes = [my_permissions.IsOwner, permissions.IsAuthenticated, my_permissions.IsRoomManager]
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RoomsRUD(RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'id'
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class TimeSlots(ListCreateAPIView):
    permission_classes = [my_permissions.IsRoomOwner, permissions.IsAuthenticated, my_permissions.IsRoomManager]
    serializer_class = TimeSlotsSerializer

    def get_queryset(self):
        return TimeSlot.objects.filter(room_id=self.request.GET.get('room_id', 0))


class TimeSlotsRUD(RetrieveDestroyAPIView):
    lookup_url_kwarg = 'id'
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotsSerializer
