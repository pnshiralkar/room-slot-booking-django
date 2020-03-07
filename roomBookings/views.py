from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveDestroyAPIView, ListAPIView

from roomBookings.models import Room, TimeSlot, Booking
from roomBookings import permissions as my_permissions
from roomBookings.serializers import RoomSerializer, TimeSlotsSerializer, BookingSerializer, RoomForCustomerSerializer


class Rooms(ListCreateAPIView):
    # permission_classes = [my_permissions.IsOwner, permissions.IsAuthenticated, my_permissions.IsRoomManager]
    # serializer_class = RoomSerializer

    def get_serializer_class(self):
        if self.request.user.is_room_manager:
            return RoomSerializer
        else:
            return RoomForCustomerSerializer

    def get_queryset(self):
        if self.request.user.is_room_manager:
            return Room.objects.filter(owner=self.request.user)
        else:
            return Room.objects.all()

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


class TimeSlotsRD(RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, my_permissions.IsRoomOwner, my_permissions.IsRoomManager]
    lookup_url_kwarg = 'id'
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotsSerializer


class Bookings(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, my_permissions.IsBookingOwner, my_permissions.IsCustomer]
    serializer_class = BookingSerializer

    def get_queryset(self):
        return Booking.objects.filter(customer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


class BookingsRD(RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, my_permissions.IsBookingOwner, my_permissions.IsCustomer]
    lookup_url_kwarg = 'id'
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
