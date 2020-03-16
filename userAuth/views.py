from rest_framework import permissions
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, get_object_or_404

from userAuth.models import User
from userAuth.serializers import UserSerializer, UserRUDSerializer
from . import permissions as my_permissions


# Class based View for User Signup API
class Signup(CreateAPIView):
    model = User
    serializer_class = UserSerializer


# Class based View for User Profile Retrieve and Update API
class Profile(RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, my_permissions.IsSelf]
    serializer_class = UserRUDSerializer

    # Select User object to return / update
    def get_object(self):
        return get_object_or_404(User.objects.filter(id=self.request.user.id))

    # Get queryset
    def get_queryset(self):
        self.id = self.request.user.id
        return User.objects.filter(id=self.request.user.id)
