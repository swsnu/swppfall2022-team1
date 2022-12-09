from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from drf_yasg.utils import swagger_serializer_method
from club.models import Club
from tag.models import Tag, UserTag
from user.serializers import UserSerializer
from typing import Dict, Any


class TagPostSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "is_default",
        )


class ClubTagSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)
    is_default = serializers.BooleanField(read_only=True, default=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "is_default",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data: Dict[str, Any]) -> Tag:
        return Tag.objects.create(**validated_data, club=self.context["club"])


class TagUserSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)
    is_default = serializers.BooleanField(read_only=True)
    users = serializers.SerializerMethodField(read_only=True)
    new_users = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, allow_empty=False
    )
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "is_default",
            "users",
            "new_users",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=UserSerializer(many=True))
    def get_users(self, tag: Tag) -> ReturnDict:
        users = list(
            map(lambda user_tag: user_tag.user, tag.tag_user_set.select_related("user"))
        )
        return UserSerializer(users, many=True).data

    def update(self, instance: Tag, validated_data: Dict[str, Any]) -> Tag:
        if "name" in validated_data:
            instance.name = validated_data["name"]
            instance.save()
        if "new_users" in validated_data:
            old_users = [
                user_tag.user.id
                for user_tag in (
                    UserTag.objects.select_related("user")
                    .filter(tag_id=instance.id)
                    .order_by("user__id")
                )
            ]
            new_users = validated_data["new_users"]
            if not isinstance(new_users, list):
                raise Exception()
            new_users.sort()

            old_pos: int = 0
            new_pos: int = 0
            delete_list = []
            add_list = []
            while old_pos < len(old_users) and new_pos < len(new_users):
                if old_users[old_pos] < new_users[new_pos]:
                    delete_list.append(old_users[old_pos])
                    old_pos += 1
                elif old_users[old_pos] > new_users[new_pos]:
                    add_list.append(new_users[new_pos])
                    new_pos += 1
                else:
                    old_pos += 1
                    new_pos += 1
            while old_pos < len(old_users):
                delete_list.append(old_users[old_pos])
                old_pos += 1
            while new_pos < len(new_users):
                add_list.append(new_users[new_pos])
                new_pos += 1

            UserTag.objects.filter(user__id__in=delete_list).delete()
            for id in add_list:
                UserTag.objects.create(user_id=id, tag=instance)
        return instance
