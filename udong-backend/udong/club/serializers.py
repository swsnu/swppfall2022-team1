from rest_framework import serializers
from club.models import Club
from user.models import UserClub
from event.models import Event
from user.serializers import UserSerializer
from event.serializers import EventTimeSerializer


class ClubSerializer(serializers.ModelSerializer[Club]):
    code = serializers.CharField(max_length=10, default="swppfall")
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)

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
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)

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
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)

    class Meta:
        model = Event
        fields = (
            "name",
            "created_at",
            "updated_at",
        )
