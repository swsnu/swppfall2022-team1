from rest_framework import serializers
from timedata.models import Time


class EventTimeSerializer(serializers.ModelSerializer[Time]):
    type = serializers.CharField(source="get_type_display")
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)

    class Meta:
        model = Time
        fields = (
            "type",
            "start_date",
            "end_date",
            "repeat_start",
            "repeat_end",
            "weekday",
            "start_time",
            "end_time",
            "created_at",
            "updated_at",
        )
