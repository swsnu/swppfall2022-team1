from typing import Dict, Any
from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from comment.models import Comment
from user.models import User
from user.serializers import UserSerializer
from post.models import Post
from drf_yasg.utils import swagger_serializer_method


class CommentSerializer(serializers.ModelSerializer[Comment]):
    user = serializers.SerializerMethodField()
    post_id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Comment
        fields = (
            "id",
            "user",
            "post_id",
            "content",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=UserSerializer())
    def get_user(self, comment: Comment) -> ReturnDict:
        return UserSerializer(comment.user).data

    def create(self, validated_data: Dict[str, Any]) -> Comment:
        post = Post.objects.get(id=self.context["post_id"])
        comment = Comment.objects.create(
            **validated_data, post=post, user=self.context["user"]
        )
        return comment
