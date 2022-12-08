from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from drf_yasg.utils import swagger_serializer_method
from tag.models import Tag
from user.serializers import UserSerializer


class TagPostSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "is_default",
        )


class TagClubSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)
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


class TagUserSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)
    users = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
            "is_default",
            "users",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=UserSerializer(many=True))
    def get_users(self, tag: Tag) -> ReturnDict:
        users = list(
            map(lambda user_tag: user_tag.user, tag.tag_user_set.select_related("user"))
        )
        return UserSerializer(users, many=True).data
