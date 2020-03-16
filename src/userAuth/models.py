from django.contrib.auth.models import AbstractUser
from django.db import models


# Inherit User from Django and add to it the two fields below
class User(AbstractUser):
    is_customer = models.BooleanField(default=False)
    is_room_manager = models.BooleanField(default=False)
