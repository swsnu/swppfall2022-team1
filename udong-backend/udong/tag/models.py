from django.db import models
from club.models import Club
from user.models import User

# Create your models here.


class Tag(models.Model):
    # id: auto-generated
    club_id = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="tag_set")
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserTag(models.Model):
    # id: auto-generated
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_tag_set"
    )
    tag_id = models.ForeignKey(
        Tag, on_delete=models.CASCADE, related_name="tag_user_set"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
