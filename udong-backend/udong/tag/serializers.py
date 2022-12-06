from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from drf_yasg.utils import swagger_serializer_method
from tag.models import Tag, UserTag
from user.serializers import UserSerializer


class TagUserSerializer(serializers.ModelSerializer[UserTag]):
    name = serializers.CharField(max_length=255)
    users = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = UserTag
        fields = (
            "id",
            "name",
            "users",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=UserSerializer(many=True))
    def get_users(self, user_tag: UserTag) -> ReturnDict:
        return UserSerializer(user_tag.user, many=True).data


class TagPostSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
        )
