from rest_framework import serializers
from user.models import User


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
