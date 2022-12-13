from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from drf_yasg.utils import swagger_serializer_method
from user.models import User
from tag.models import Tag, UserTag
from common.utils import myIntListComparison
from user.serializers import UserSerializer
from typing import Dict, Any, List


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
    user_list = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    is_default = serializers.BooleanField(read_only=True, default=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "user_list",
            "is_default",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data: Dict[str, Any]) -> Tag:
        tag_data = validated_data.copy()
        user_list = tag_data.pop("user_list")
        tag = Tag.objects.create(**tag_data, club=self.context["club"])
        for user_id in user_list:
            UserTag.objects.create(user_id=user_id, tag=tag)
        return tag

    def validate_user_list(self, value: List[int]) -> List[int]:
        user_cnt = User.objects.filter(id__in=value).count()
        if user_cnt != len(value):
            raise serializers.ValidationError("Invalid user_list")
        return value


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

            delete_list, add_list = myIntListComparison(old_users, new_users)

            UserTag.objects.filter(user__id__in=delete_list).delete()
            for id in add_list:
                UserTag.objects.create(user_id=id, tag=instance)
        return instance
