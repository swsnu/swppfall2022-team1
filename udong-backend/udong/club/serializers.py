import string
import random
from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from club.models import Club
from user.models import UserClub
from event.models import Event
from tag.models import Tag
from user.serializers import UserSerializer
from timedata.serializers import PureTimeSerializer
from drf_yasg.utils import swagger_serializer_method
from typing import Dict, Any


class ClubSerializer(serializers.ModelSerializer[Club]):
    code = serializers.CharField(max_length=10, default="swppfall", read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Club
        fields = (
            "id",
            "name",
            "image",
            "code",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data: Dict[str, Any]) -> Club:
        code = "".join(
            random.choice(string.ascii_letters + string.digits) for _ in range(10)
        )
        club = Club.objects.create(**validated_data, code=code)
        UserClub.objects.create(user=self.context["user"], club=club, auth="A")
        return club


class ClubRegisterSerializer(serializers.ModelSerializer[Club]):
    code = serializers.CharField(max_length=10, write_only=True)

    class Meta:
        model = Club
        fields = ("code",)


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
            "id",
            "name",
            "time",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=PureTimeSerializer(many=True))
    def get_time(self, event: Event) -> ReturnDict:
        return PureTimeSerializer(event.time_set, many=True, context=self.context).data


class ClubTagSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "created_at",
            "updated_at",
        )
