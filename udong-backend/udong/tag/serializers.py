from rest_framework import serializers
from tag.models import Tag


class TagPostSerializer(serializers.ModelSerializer[Tag]):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Tag
        fields = (
            "id",
            "name",
        )
