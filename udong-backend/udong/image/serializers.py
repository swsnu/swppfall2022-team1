from rest_framework import serializers


class DownloadSerializer(serializers.Serializer):
    key = serializers.CharField(write_only=True)
    url = serializers.CharField(read_only=True)

    class Meta:
        fields = (
            "key",
            "url",
        )
