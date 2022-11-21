from django.contrib.auth import authenticate, login
from rest_framework import serializers
from user.models import User
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
        try:
            user = User.objects.get(email=validated_data["email"])
        except:
            user = User.objects.create_user(**validated_data)
        login(self.context["request"], user)
        return User()
