from django.db import models
from user.models import User
from event.models import Event
from club.models import Club
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
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="post_set")
    title = models.CharField(max_length=255)
    content = models.TextField()
    type = models.CharField(
        max_length=1,
        choices=[("A", "Announcement"), ("E", "Enrollment"), ("S", "Scheduling")],
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


class Participation(models.Model):
    # id: auto-generated
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="participation_set"
    )
    enrollment = models.ForeignKey(
        Enrollment,
        on_delete=models.CASCADE,
        related_name="participation_set",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Scheduling(models.Model):
    post = models.OneToOneField(
        Post, primary_key=True, on_delete=models.CASCADE, related_name="scheduling"
    )
    type = models.CharField(max_length=1, choices=[("D", "Date"), ("W", "Weekday")])

    # Date
    dates = models.JSONField(null=True)

    # Weekday
    weekdays = models.CharField(max_length=7, null=True)
    repeat_start = models.DateField(null=True)
    repeat_end = models.DateField(null=True)

    start_time = models.IntegerField()
    end_time = models.IntegerField()
    closed = models.BooleanField()
    confirmed_time = models.TextField(null=True)

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
