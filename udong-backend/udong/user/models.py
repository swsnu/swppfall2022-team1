from django.db import models
from club.models import Club

# Create your models here.


class User(models.Model):
    # id: auto-generated
    google = models.CharField(max_length=25)
    image = models.CharField(max_length=40)
    time_table = models.TextField()
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserClub(models.Model):
    # id: auto-generated
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_club_set"
    )
    club = models.ForeignKey(
        Club, on_delete=models.CASCADE, related_name="club_user_set"
    )
    auth = models.CharField(max_length=1, choices=[("M", "Member"), ("A", "Admin")])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)