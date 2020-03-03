from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsRoomOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.room_id.owner == request.user


class IsRoomManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_room_manager


class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_customer


class IsBookingOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.customer == request.user
