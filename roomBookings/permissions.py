from rest_framework import permissions


# Request permissions

# Grants permission if current user is a Room Manager
class IsRoomManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_room_manager


# Grants permission if current user is Room Manager or if request is GET
class IsRoomManagerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_room_manager or request.method == "GET"


# Grants permission if current user is a customer
class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_customer


# Grants permission if current user is customer or (request is GET and user is Room manager)
class IsCustomerOrRM(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_customer or (request.method == "GET" and request.user.is_room_manager)


# Object Permissions

# Grants permission for a TimeSLot object if the current user is owner of the room corresponding to time slot
class IsRoomOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.room_id.owner == request.user or obj.time_slot.room_id.owner == request.user


# Grants permission for a Room object if the current user is owner or if request is GET
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or request.method == "GET"


# Grants permission for a Room object if the current user is owner
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


# Grants permission for a Booking object if the current user is owner of booking
class IsBookingOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.customer == request.user


# Grants permission for a room object if the current user is owner of booking or owner of corresponding room
class IsBookingOwnerOrRoomOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.customer == request.user or (
                obj.time_slot.room_id.owner == request.user and request.method in ["GET", "OPTIONS"])
