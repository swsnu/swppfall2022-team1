from django.db import models
from user.models import User
from event.models import Event
from tag.models import Tag

# Create your models here.


class Post(models.Model):
    # id: auto-generated
    author = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="post_set"
    )
    event = models.ForeignKey(
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


class Enrollment(models.Model):
    post = models.OneToOneField(
        Post, primary_key=True, on_delete=models.CASCADE, related_name="enrollment"
    )
    closed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Scheduling(models.Model):
    post = models.OneToOneField(
        Post, primary_key=True, on_delete=models.CASCADE, related_name="scheduling"
    )
    type = models.CharField(max_length=1, choices=[("D", "Date"), ("W", "Weekday")])
    start_time = models.TimeField()
    end_time = models.TimeField()

    # Date
    dates = models.JSONField(null=True)

    # Weekday
    weekdays = models.CharField(max_length=7)
    repeat_start = models.DateField(null=True)
    repeat_end = models.DateField(null=True)

    closed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PostTag(models.Model):
    # id: auto-generated
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="post_tag_set"
    )
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="tag_post_set")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
