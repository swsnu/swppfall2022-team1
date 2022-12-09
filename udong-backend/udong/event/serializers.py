from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from event.models import Event
from timedata.models import Time
from timedata.serializers import PureTimeSerializer
from drf_yasg.utils import swagger_serializer_method
from club.serializers import ClubSerializer
from typing import Dict, Any, Optional


class EventNameSerializer(serializers.ModelSerializer[Event]):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Event
        fields = ("id", "name")


class ClubEventSerializer(serializers.ModelSerializer[Event]):
    name = serializers.CharField(max_length=255)
    time = serializers.SerializerMethodField(read_only=True)
    new_time = serializers.ListField(child=PureTimeSerializer(), write_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "name",
            "time",
            "new_time",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=PureTimeSerializer(many=True))
    def get_time(self, event: Event) -> ReturnDict:
        return PureTimeSerializer(event.time_set, many=True, context=self.context).data

    def create(self, validated_data: Dict[str, Any]) -> Event:
        return Event.objects.create(**validated_data, club=self.context["club"])

    def update(self, instance: Event, validated_data: Dict[str, Any]) -> Event:
        if "name" in validated_data:
            instance.name = validated_data["name"]
            instance.save()
        if "new_time" in validated_data:
            new_times = validated_data["new_time"]
            if not isinstance(new_times, list):
                raise Exception()

            old_times = Time.objects.filter(event_id=instance.id)
            for old_time in old_times:
                old_time.delete()

            for new_time in new_times:
                Time.objects.create(**new_time, event=instance)
        return instance
