import string
import random
from rest_framework import serializers
from club.models import Club
from user.models import UserClub
from tag.models import Tag, UserTag
from typing import Dict, Any
from common.random import Random


class ClubSerializer(serializers.ModelSerializer[Club]):
    code = serializers.CharField(max_length=10, read_only=True)
    image = serializers.CharField(read_only=True)
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
        club = Club.objects.create(
            **validated_data, code=code, image=Random.choice_image()
        )
        UserClub.objects.create(user=self.context["user"], club=club, auth="A")
        tag = Tag.objects.create(club=club, name="전체", is_default=True)
        UserTag.objects.create(user=self.context["user"], tag=tag)
        return club


class ClubRegisterSerializer(serializers.ModelSerializer[Club]):
    code = serializers.CharField(max_length=10, write_only=True)

    class Meta:
        model = Club
        fields = ("code",)
