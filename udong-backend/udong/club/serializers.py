from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from club.models import Club
from user.models import UserClub
from event.models import Event
from tag.models import Tag
from user.serializers import UserSerializer
from event.serializers import EventTimeSerializer


class ClubSerializer(serializers.ModelSerializer[Club]):
    code = serializers.CharField(max_length=10, default="swppfall")
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Club
        fields = (
            "id",
            "name",
            "code",
            "created_at",
            "updated_at",
        )


class ClubUserSerializer(serializers.ModelSerializer[UserClub]):
    user = UserSerializer()
    auth = serializers.CharField(source="get_auth_display")
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = UserClub
        fields = (
            "user",
            "auth",
            "created_at",
            "updated_at",
        )


class ClubEventSerializer(serializers.ModelSerializer[Event]):
    name = serializers.CharField(max_length=255)
    time = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Event
        fields = (
            "name",
            "time",
            "created_at",
            "updated_at",
        )

    def get_time(self, event: Event) -> ReturnDict:
        return EventTimeSerializer(event.time_set, many=True, context=self.context).data


class ClubTagSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Tag
        fields = (
            "name",
            "created_at",
            "updated_at",
        )
