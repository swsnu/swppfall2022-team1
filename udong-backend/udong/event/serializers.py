from rest_framework import serializers
from event.models import Event


class EventNameSerializer(serializers.ModelSerializer[Event]):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Event
        fields = (
            "id",
            "name",
        )
