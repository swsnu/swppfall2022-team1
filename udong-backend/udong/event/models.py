from django.db import models
from club.models import Club

# Create your models here.


class Event(models.Model):
    # id: auto-generated
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="event_set")
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
