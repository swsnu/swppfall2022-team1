from django.db.models import Q
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework import serializers
from post.models import Post
from post.models import Club
from post.models import Enrollment
from post.models import Participation
from tag.serializers import TagPostSerializer
from user.serializers import UserSerializer
from event.serializers import EventNameSerializer
from club.serializers import ClubSerializer
from drf_yasg.utils import swagger_serializer_method
from typing import Optional
from typing import Dict, Any


class PostBoardSerializer(serializers.ModelSerializer[Post]):
    author = serializers.SerializerMethodField()
    club = serializers.SerializerMethodField()
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
            "id",
            "author",
            "club",
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

    @swagger_serializer_method(serializer_or_field=ClubSerializer())
    def get_club(self, post: Post) -> Optional[ReturnDict]:
        if self.context["club"]:
            return ClubSerializer(post.club).data
        return None

    def get_author(self, post: Post) -> Optional[str]:
        if post.author is None:
            return None
        else:
            return post.author.name

    @swagger_serializer_method(serializer_or_field=EventNameSerializer())
    def get_event(self, post: Post) -> Optional[ReturnDict]:
        if post.event is None:
            return None
        else:
            return EventNameSerializer(post.event).data

    def get_closed(self, post: Post) -> Optional[bool]:
        if post.get_type_display() == "Announcement":
            return None
        if post.get_type_display() == "Enrollment":
            return post.enrollment.closed
        if post.get_type_display() == "Scheduling":
            return post.scheduling.closed
        return None

    @swagger_serializer_method(serializer_or_field=TagPostSerializer(many=True))
    def get_include_tag(self, post: Post) -> ReturnDict:
        post_tag_list = post.post_tag_set.select_related("tag").filter(
            tag__tag_user_set__user__id__contains=self.context["id"]
        )
        tags = list(map(lambda post_tag: post_tag.tag, post_tag_list))
        return TagPostSerializer(tags, many=True).data

    @swagger_serializer_method(serializer_or_field=TagPostSerializer(many=True))
    def get_exclude_tag(self, post: Post) -> ReturnDict:
        post_tag_list = post.post_tag_set.select_related("tag").filter(
            ~Q(tag__tag_user_set__user__id__contains=self.context["id"])
        )
        tags = list(map(lambda post_tag: post_tag.tag, post_tag_list))
        return TagPostSerializer(tags, many=True).data

    def create(self, validated_data: Dict[str, Any]) -> Post:
        club = Club.objects.get(id=self.context["club_id"])
        post = Post.objects.create(
            **validated_data, club=club, author=self.context["user"]
        )
        return post


class EnrollmentSerializer(serializers.ModelSerializer[Enrollment]):
    post_id = serializers.IntegerField(read_only=True)
    closed = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Enrollment
        fields = (
            "post_id",
            "closed",
            "created_at",
            "updated_at",
        )


class ParticipationSerializer(serializers.ModelSerializer[Participation]):
    user = serializers.SerializerMethodField()
    enrollment_id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Participation
        fields = (
            "id",
            "user",
            "enrollment_id",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=UserSerializer())
    def get_user(self, participation: Participation) -> ReturnDict:
        return UserSerializer(participation.user).data
