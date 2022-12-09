from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework import serializers
from club.models import Club
from tag.models import Tag
from event.models import Event
from post.models import Post, Enrollment, Participation, Scheduling, PostTag
from tag.serializers import TagPostSerializer
from common.utils import myIntListComparison
from user.serializers import UserSerializer
from event.serializers import EventNameSerializer
from club.serializers import ClubSerializer
from timedata.serializers import AvailableTimeSerializer
from drf_yasg.utils import swagger_serializer_method
from typing import Optional
from typing import Dict, Any


class EnrollmentSerializer(serializers.ModelSerializer[Enrollment]):
    closed = serializers.BooleanField(default=False)
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

    def create(self, validated_data: Dict[str, Any]) -> Enrollment:
        enrollment = Enrollment.objects.create(
            **validated_data, post=self.context["post"]
        )
        return enrollment


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

    def create(self, validated_data: Dict[str, Any]) -> Participation:
        participation = Participation.objects.create(
            user=self.context["user"], enrollment=self.context["enrollment"]
        )
        return participation


class SchedulingSerializer(serializers.ModelSerializer[Scheduling]):
    closed = serializers.BooleanField(default=False)
    available_times = serializers.SerializerMethodField()
    confirmed_time = serializers.CharField(allow_null=True, default=None)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Scheduling
        fields = (
            "post_id",
            "type",
            "start_time",
            "end_time",
            "dates",
            "weekdays",
            "repeat_start",
            "repeat_end",
            "closed",
            "confirmed_time",
            "available_times",
            "confirmed_time",
            "created_at",
            "updated_at",
        )

    @swagger_serializer_method(serializer_or_field=AvailableTimeSerializer())
    def get_available_times(self, scheduling: Scheduling) -> ReturnDict:
        return AvailableTimeSerializer(scheduling.available_time_set, many=True).data

    def create(self, validated_data: Dict[str, Any]) -> Scheduling:
        scheduling = Scheduling.objects.create(
            **validated_data, post=self.context["post"]
        )
        return scheduling


class PostBoardSerializer(serializers.ModelSerializer[Post]):
    author = serializers.SerializerMethodField()
    club = serializers.SerializerMethodField()
    event = serializers.SerializerMethodField()
    event_id = serializers.IntegerField(write_only=True, required=False)
    title = serializers.CharField(max_length=255)
    type = serializers.ChoiceField(choices=["A", "E", "S"])
    closed = serializers.SerializerMethodField()
    include_tag = serializers.SerializerMethodField()
    exclude_tag = serializers.SerializerMethodField()
    tag_list = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    scheduling = SchedulingSerializer(allow_null=True, required=False, write_only=True)

    class Meta:
        model = Post
        fields = (
            "id",
            "author",
            "club",
            "event",
            "event_id",
            "title",
            "content",
            "type",
            "scheduling",
            "closed",
            "tag_list",
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
        if post.type == "A":
            return None
        if post.type == "E":
            return post.enrollment.closed
        if post.type == "S":
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
        tag_list = validated_data.pop("tag_list", None)
        scheduling = validated_data.pop("scheduling", {})
        event_id = validated_data.pop("event_id", None)
        if event_id:
            event = get_object_or_404(Event, id=event_id)
        else:
            event = None

        if not isinstance(tag_list, list):
            raise Exception()

        post = Post.objects.create(
            **validated_data,
            club=self.context["club_obj"],
            author=self.context["user"],
            event=event
        )

        type = validated_data.get("type", None)

        if type == "S":
            scheduling["post_id"] = post.id
            scheduleSerializer = SchedulingSerializer(
                data=scheduling, context={"post": post}
            )
            scheduleSerializer.is_valid(raise_exception=True)
            scheduleSerializer.save()
        elif type == "E":
            enrollmentSerializer = EnrollmentSerializer(data={}, context={"post": post})
            enrollmentSerializer.is_valid(raise_exception=True)
            enrollmentSerializer.save()

        tags = Tag.objects.filter(id__in=tag_list)
        for tag in tags:
            PostTag.objects.create(post=post, tag=tag)

        return post

    def update(self, instance: Post, validated_data: Dict[str, Any]) -> Post:
        old_tags = [
            post_tag.id for post_tag in PostTag.objects.filter(post_id=instance.id)
        ]
        new_tags = validated_data.pop("tag_list", None)
        if not isinstance(new_tags, list):
            raise Exception()
        delete_list, add_list = myIntListComparison(old_tags, new_tags)
        PostTag.objects.filter(id__in=delete_list).delete()
        for id in add_list:
            PostTag.objects.create(post=instance, tag_id=id)

        event_id = validated_data.pop("event_id", None)
        if instance.event_id != event_id:
            instance.event = get_object_or_404(Event, id=event_id)

        if "title" in validated_data:
            instance.title = validated_data["title"]
        if "content" in validated_data:
            instance.content = validated_data["content"]

        instance.save()
        return instance
