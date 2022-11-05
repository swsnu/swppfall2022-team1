from rest_framework import serializers
from club.models import Club


class ClubSerializer(serializers.ModelSerializer[Club]):
    code = serializers.CharField(max_length=10, default="swppfall")
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)

    class Meta:
        model = Club
        fields = (
            "id",
            "name",
            "code",
            "created_at",
            "updated_at",
        )
