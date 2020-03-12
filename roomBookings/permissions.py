from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or request.method == "GET"


class IsRoomOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.room_id.owner == request.user


class IsRoomManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_room_manager


class IsRoomManagerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_room_manager or request.method == "GET"


class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_customer


class IsCustomerOrRM(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_customer or (request.method == "GET" and request.user.is_room_manager)


class IsBookingOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.customer == request.user


class IsBookingOwnerOrRoomOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.customer == request.user or obj.time_slot.room_id.owner == request.user
