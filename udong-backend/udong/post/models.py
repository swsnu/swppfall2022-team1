from django.db import models
from user.models import User
from event.models import Event

# Create your models here.


class Post(models.Model):
    # id: auto-generated
    author_id = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="post_set"
    )
    event_id = models.ForeignKey(
        Event, null=True, on_delete=models.SET_NULL, related_name="post_set"
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    type = models.CharField(
        max_length=1,
        choices=[("A", "Announcement"), ("P", "Participation"), ("T", "Time")],
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
