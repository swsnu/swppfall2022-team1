from rest_framework import serializers
from user.models import User, UserClub
from typing import Dict, Any


class UserSerializer(serializers.ModelSerializer[User]):
    time_table = serializers.CharField(default="")
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "image",
            "email",
            "time_table",
            "name",
            "created_at",
            "updated_at",
        )


class AuthSerializer(serializers.ModelSerializer[User]):
    token = serializers.CharField(write_only=True)
    image = serializers.CharField(default="", read_only=True)
    email = serializers.EmailField(max_length=255, validators=[])
    time_table = serializers.CharField(default="", read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "image",
            "email",
            "token",
            "time_table",
            "name",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data: Dict[str, Any]) -> User:
        return User.objects.get_or_create_user(**validated_data)


class UserClubSerializer(serializers.ModelSerializer[UserClub]):
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
