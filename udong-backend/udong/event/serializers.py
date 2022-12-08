from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from event.models import Event
from timedata.serializers import PureTimeSerializer
from drf_yasg.utils import swagger_serializer_method


class EventNameSerializer(serializers.ModelSerializer[Event]):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Event
        fields = (
            "id",
            "name",
        )


class ClubEventSerializer(serializers.ModelSerializer[Event]):
    name = serializers.CharField(max_length=255)
    time = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "name",
            "time",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=PureTimeSerializer(many=True))
    def get_time(self, event: Event) -> ReturnDict:
        return PureTimeSerializer(event.time_set, many=True, context=self.context).data
