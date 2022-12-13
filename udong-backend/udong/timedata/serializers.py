from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from drf_yasg.utils import swagger_serializer_method
from timedata.models import Time, AvailableTime
from user.serializers import UserSerializer
from typing import Dict, Any


class PureTimeSerializer(serializers.ModelSerializer[Time]):
    type = serializers.ChoiceField(choices=["D", "W"])
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

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

    def create(self, validated_data: Dict[str, Any]) -> Time:
        return Time.objects.create(**validated_data, event=self.context["event"])


class AvailableTimeSerializer(serializers.ModelSerializer[AvailableTime]):
    user = serializers.SerializerMethodField()
    time = serializers.CharField()
    scheduling_id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = AvailableTime
        fields = ("id", "user", "scheduling_id", "time", "created_at", "updated_at")

    @swagger_serializer_method(serializer_or_field=UserSerializer())
    def get_user(self, availableTime: AvailableTime) -> ReturnDict:
        return UserSerializer(availableTime.user).data

    def create(self, validated_data: Dict[str, Any]) -> AvailableTime:
        availableTime = AvailableTime.objects.create(
            **validated_data,
            user=self.context["user"],
            scheduling=self.context["scheduling"]
        )
        return availableTime


class AvailableTimeSimpleSerializer(serializers.ModelSerializer[AvailableTime]):
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = AvailableTime
        fields = ("id", "time", "created_at", "updated_at")
