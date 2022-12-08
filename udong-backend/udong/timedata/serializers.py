from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from drf_yasg.utils import swagger_serializer_method
from timedata.models import Time, AvailableTime
from user.serializers import UserSerializer


class PureTimeSerializer(serializers.ModelSerializer[Time]):
    type = serializers.CharField(source="get_type_display")
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


class AvailableTimeSerializer(serializers.ModelSerializer[AvailableTime]):
    user = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = AvailableTime
        fields = ("id", "user", "scheduling", "time", "created_at", "updated_at")

    @swagger_serializer_method(serializer_or_field=UserSerializer())
    def get_user(self, availableTime: AvailableTime) -> ReturnDict:
        return UserSerializer(availableTime.user).data
