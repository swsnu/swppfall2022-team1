from django.db import models
from event.models import Event
from post.models import Scheduling

# Create your models here.


class Time(models.Model):
    # id: auto-generated
    event_id = models.ForeignKey(
        Event, null=True, on_delete=models.SET_NULL, related_name="time_set"
    )
    scheduling_id = models.ForeignKey(
        Scheduling, null=True, on_delete=models.SET_NULL, related_name="time_set"
    )
    type = models.CharField(max_length=1, choices=[("D", "Date"), ("W", "Weekday")])

    # Date
    start_date = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)

    # Weekday
    repeat_start = models.DateField(null=True)
    repeat_end = models.DateField(null=True)
    weekday = models.IntegerField(null=True)
    start_time = models.TimeField(null=True)
    end_time = models.TimeField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
