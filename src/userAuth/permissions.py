from rest_framework import permissions


# Grant Permission if object is the user itself
class IsSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj == request.user:
            return True
        return False
