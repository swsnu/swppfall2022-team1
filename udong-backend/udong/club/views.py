from django.db.models import Q, Model
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import MethodNotAllowed, PermissionDenied
from rest_framework.serializers import BaseSerializer
from rest_framework.permissions import IsAuthenticated
from club.models import Club
from tag.models import Tag
from event.models import Event
from club.serializers import (
    ClubSerializer,
    ClubUserSerializer,
    ClubEventSerializer,
    ClubTagSerializer,
)
from common.permissions import IsAdmin
from drf_yasg.utils import swagger_auto_schema
from typing import Any, Type, TYPE_CHECKING

from post.models import Post
from post.serializers import PostBoardSerializer
from post.models import PostTag
from post.models import Enrollment, Scheduling
from user.models import UserClub

# Create your views here.

if TYPE_CHECKING:
    _GenereicViewSet = viewsets.GenericViewSet[Club]
    from rest_framework.permissions import _SupportsHasPermission

    _SupportsHasPermissionType = list[_SupportsHasPermission]
else:
    _GenereicViewSet = viewsets.GenericViewSet
    _SupportsHasPermissionType = list


class ClubViewSet(_GenereicViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def get_permissions(self) -> _SupportsHasPermissionType:
        if self.action in ("update", "destroy"):
            return [IsAuthenticated(), IsAdmin()]
        return super().get_permissions()

    def get_serializer_class(self) -> Type[BaseSerializer[Club]]:
        if self.action == "user":
            return ClubUserSerializer
        if self.action == "event":
            return ClubEventSerializer
        if self.action == "tag":
            return ClubTagSerializer
        if self.action == "post":
            return PostBoardSerializer
        return ClubSerializer

    def list(self, request: Request) -> Response:
        club = self.get_queryset().filter(club_user_set__user__id=request.user.id)
        return Response(self.get_serializer(club, many=True).data)

    def retrieve(self, request: Request, pk: Any = None) -> Response:
        club = self.get_object()
        return Response(self.get_serializer(club).data)

    def create(self, request: Request) -> Response:
        serializer = self.get_serializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(responses={200: ClubSerializer(), 403: "User is not admin"})
    def update(self, request: Request, pk: Any) -> Response:
        club = self.get_object()
        self.check_object_permissions(request, club)
        serializer = self.get_serializer(club, request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @swagger_auto_schema(responses={204: "", 403: "User is not admin"})
    def destroy(self, request: Request, pk: Any) -> Response:
        club = self.get_object()
        self.check_object_permissions(request, club)
        club.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(responses={200: ClubUserSerializer(many=True)})
    @action(detail=True, methods=["GET"])
    def user(self, request: Request, pk: Any) -> Response:
        club_user = (
            self.get_queryset()
            .prefetch_related("club_user_set__user")
            .get(id=pk)
            .club_user_set
        )
        return Response(self.get_serializer(club_user, many=True).data)

    @swagger_auto_schema(responses={200: ClubEventSerializer(many=True)})
    @action(detail=True, methods=["GET"])
    def event(self, request: Request, pk: Any) -> Response:
        club_event = (
            self.get_queryset()
            .prefetch_related("event_set__time_set")
            .get(id=pk)
            .event_set
        )
        return Response(self.get_serializer(club_event, many=True).data)

    @swagger_auto_schema(responses={200: ClubTagSerializer(many=True)})
    @action(detail=True, methods=["GET"])
    def tag(self, request: Request, pk: Any) -> Response:
        club_tag = self.get_object().tag_set
        return Response(self.get_serializer(club_tag, many=True).data)

    @action(detail=True, methods=["GET", "POST"])
    def post(self, request: Request, pk: Any) -> Response:
        if request.method == "GET":
            return self._get_posts(request, pk)
        elif request.method == "POST":
            return self._post_post(request, pk)
        else:
            raise MethodNotAllowed(
                request.method if request.method else "unknown method"
            )

    # @swagger_auto_schema(responses={200: PostBoardSerializer(many=True)})
    def _get_posts(self, request: Request, pk: Any) -> Response:
        try:
            auth = UserClub.objects.get(Q(user_id=request.user.id) & Q(club_id=pk)).auth
        except UserClub.DoesNotExist:
            return Response("User is not in the club", status=status.HTTP_404_NOT_FOUND)

        post = (
            Post.objects.get_queryset()
            .select_related("event")
            .select_related("author")
            .prefetch_related("post_tag_set__tag__tag_user_set")
            .filter(club_id=pk)
        )
        if auth == "A":
            return Response(
                self.get_serializer(
                    post, many=True, context={"id": request.user.id, "club": False}
                ).data
            )
        elif auth == "M":
            all_post = self.get_serializer(
                post, many=True, context={"id": request.user.id, "club": False}
            ).data
            result = filter(lambda post: len(post["include_tag"]) != 0, all_post)
            return Response(result)
        else:
            return Response()

    def _post_post(self, request: Request, pk: Any) -> Response:
        try:
            auth = UserClub.objects.get(Q(user_id=request.user.id) & Q(club_id=pk)).auth
        except UserClub.DoesNotExist:
            return Response("User is not in the club", status=status.HTTP_404_NOT_FOUND)
        if auth != "A":
            raise PermissionDenied()

        try:
            event = Event.objects.get(id=request.data.get("event_id", -1))
        except Event.DoesNotExist:
            event = None

        serializer = self.get_serializer(
            data=request.data,
            context={
                "club_id": pk,
                "user": request.user,
                "id": request.user.id,
                "club": False,
                "event": event,
            },
        )
        serializer.is_valid(raise_exception=True)
        post = serializer.save()

        if post.type == "E":  # type: ignore
            Enrollment.objects.create(post=post, closed=False)  # type: ignore
        if post.type == "S":  # type: ignore
            Scheduling.objects.create(**request.data.get("scheduling", {}), post=post, closed=False)  # type: ignore

        tag_list = Tag.objects.filter(id__in=request.data.get("tag_list", []))
        for tag in tag_list:
            PostTag.objects.create(post=post, tag=tag)  # type: ignore

        return Response(serializer.data, status=status.HTTP_201_CREATED)
