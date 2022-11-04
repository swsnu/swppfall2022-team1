from django.db import models
from club.models import Club

# Create your models here.


class User(models.Model):
    # id: auto-generated
    google = models.TextField()
    image = models.TextField()
    time_table = models.TextField()
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserClub(models.Model):
    # id: auto-generated
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_club_set"
    )
    club_id = models.ForeignKey(
        Club, on_delete=models.CASCADE, related_name="club_user_set"
    )
    auth = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
