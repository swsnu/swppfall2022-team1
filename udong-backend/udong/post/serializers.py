from django.db.models import Q
from rest_framework import serializers
from post.models import Post
from typing import List


class PostBoardSerializer(serializers.ModelSerializer[Post]):
    event = serializers.SerializerMethodField()
    title = serializers.CharField(max_length=255)
    type = serializers.CharField(source="get_type_display")
    closed = serializers.SerializerMethodField()
    include_tag = serializers.SerializerMethodField()
    exclude_tag = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Post
        fields = (
            "event",
            "title",
            "content",
            "type",
            "closed",
            "include_tag",
            "exclude_tag",
            "created_at",
            "updated_at",
        )

    def get_event(self, post: Post) -> str:
        if post.event is None:
            return ""
        else:
            return post.event.name

    def get_closed(self, post: Post) -> bool | None:
        if post.type == "A":
            return None
        if post.type == "P":
            return post.enrollment.closed
        if post.type == "T":
            return post.scheduling.closed
        return None

    def get_include_tag(self, post: Post) -> List[str]:
        post_tag_list = post.post_tag_set.select_related("tag").filter(
            tag__tag_user_set__user__id__contains=self.context["id"]
        )
        return [post_tag.tag.name for post_tag in post_tag_list]

    def get_exclude_tag(self, post: Post) -> List[str]:
        post_tag_list = post.post_tag_set.select_related("tag").filter(
            ~Q(tag__tag_user_set__user__id__contains=self.context["id"])
        )
        return [post_tag.tag.name for post_tag in post_tag_list]
