from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer[User]):
    time_table = serializers.CharField(default="")
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)

    class Meta:
        model = User
        fields = (
            "id",
            "google",
            "image",
            "time_table",
            "name",
            "created_at",
            "updated_at",
        )
