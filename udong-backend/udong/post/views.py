from django.db.models import Q, Model
from rest_framework import viewsets, status
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework.exceptions import MethodNotAllowed, PermissionDenied
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from rest_framework.decorators import action
from tag.models import Tag, UserTag
from tag.models import UserTag
from post.models import Post, Enrollment, Participation, Scheduling
from post.serializers import (
    PostBoardSerializer,
    EnrollmentSerializer,
    ParticipationSerializer,
    SchedulingSerializer,
)
from user.models import UserClub
from comment.models import Comment
from comment.serializers import CommentSerializer
from drf_yasg.utils import swagger_auto_schema
from typing import Any, TYPE_CHECKING, TypeVar

# Create your views here.


if TYPE_CHECKING:
    _PostGenericViewSet = viewsets.GenericViewSet[Post]
    _EnrollmentGenericViewSet = viewsets.GenericViewSet[Enrollment]
    _SchedulingGenericViewSet = viewsets.GenericViewSet[Scheduling]
else:
    _PostGenericViewSet = viewsets.GenericViewSet
    _EnrollmentGenericViewSet = viewsets.GenericViewSet
    _SchedulingGenericViewSet = viewsets.GenericViewSet

_MT_co = TypeVar("_MT_co", bound=Model, covariant=True)


class PostViewSet(_PostGenericViewSet):
    queryset = Post.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_class(self) -> type[BaseSerializer[_MT_co]]:
        if self.action in ("list", "retrieve", "update"):
            return PostBoardSerializer
        elif self.action == "comment":
            return CommentSerializer
        return self.serializer_class

    # TODO: Need to be optimized
    def list(self, request: Request) -> Response:
        user_club = UserClub.objects.filter(Q(user_id=request.user.id))
        user_club_auth: list[tuple[int, str]] = [
            (userclub.club_id, userclub.auth) for userclub in user_club
        ]
        response: list[ReturnDict] = []
        for club_id, auth in user_club_auth:
            post = (
                self.get_queryset()
                .select_related("event")
                .select_related("author")
                .select_related("club")
                .prefetch_related("post_tag_set__tag__tag_user_set")
                .filter(club_id=club_id)
            )
            if auth == "A":
                response.extend(
                    self.get_serializer(
                        post, many=True, context={"id": request.user.id, "club": True}
                    ).data
                )
            elif auth == "M":
                all_post = self.get_serializer(
                    post, many=True, context={"id": request.user.id, "club": True}
                ).data
                response.extend(
                    filter(lambda post: len(post["include_tag"]) != 0, all_post)
                )
            else:
                return Response()
        return Response(response)

    def retrieve(self, request: Request, pk: Any) -> Response:
        post = (
            self.get_queryset()
            .select_related("author")
            .prefetch_related("post_tag_set__tag__tag_user_set")
            .get(id=pk)
        )
        return Response(
            self.get_serializer(
                post, context={"id": request.user.id, "club": False}
            ).data
        )

    @swagger_auto_schema(
        responses={
            200: PostBoardSerializer(),
            403: "When the non-admin user try to update",
        }
    )
    def update(self, request: Request, pk: Any = None) -> Response:
        post = self.get_object()

        try:
            auth = UserClub.objects.get(
                Q(user_id=request.user.id) & Q(club_id=post.club_id)
            ).auth
        except UserClub.DoesNotExist:
            return Response("User is not in the club", status=status.HTTP_404_NOT_FOUND)
        if auth != "A":
            raise PermissionDenied()

        serializer = self.get_serializer(
            post,
            data={request.data},
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={204: "", 403: "When the non-admin user try to delete"}
    )
    def destroy(self, request: Request, pk: Any = None) -> Response:
        post = self.get_object()

        try:
            auth = UserClub.objects.get(
                Q(user_id=request.user.id) & Q(club_id=post.club_id)
            ).auth
        except UserClub.DoesNotExist:
            return Response("User is not in the club", status=status.HTTP_404_NOT_FOUND)
        if auth != "A":
            raise PermissionDenied()

        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["GET", "POST"])
    def comment(self, request: Request, pk: Any) -> Response:
        if request.method == "GET":
            return self._get_comments(request, pk)
        elif request.method == "POST":
            return self._post_comment(request, pk)
        else:
            raise MethodNotAllowed(
                request.method if request.method else "unknown method"
            )

    def _get_comments(self, request: Request, pk: Any) -> Response:
        comment_list = self.get_serializer(
            Comment.objects.select_related("user").filter(post_id=pk),
            many=True,
        ).data
        return Response(comment_list)

    def _post_comment(self, request: Request, pk: Any) -> Response:
        serializer = self.get_serializer(
            data=request.data, context={"post_id": pk, "user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EnrollmentViewSet(_EnrollmentGenericViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_serializer_class(self) -> type[BaseSerializer[_MT_co]]:
        if self.action == "status":
            return ParticipationSerializer
        elif self.action == "close":
            return EnrollmentSerializer
        return self.serializer_class

    @action(detail=True, methods=["GET"])
    def status(self, request: Request, pk: Any) -> Response:
        participation_list = self.get_serializer(
            Participation.objects.select_related("user").filter(enrollment_id=pk),
            many=True,
        ).data
        return Response(participation_list)

    @action(detail=True, methods=["PUT"])
    def close(self, request: Request, pk: Any = None) -> Response:
        enrollment = self.get_object()
        enrollment.closed = True
        enrollment.save()
        serializer = self.get_serializer(enrollment)
        return Response(serializer.data)


class SchedulingViewSet(_SchedulingGenericViewSet):
    queryset = Scheduling.objects.all()
    serializer_class = SchedulingSerializer

    @action(detail=True, methods=["GET"])
    def status(self, request: Request, pk: Any) -> Response:
        try:
            scheduling = (
                self.get_queryset()
                .prefetch_related("available_time_set__user")
                .get(post_id=pk)
            )
        except Scheduling.DoesNotExist:
            return Response(
                "Scheduling does not exist", status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(scheduling)
        return Response(serializer.data)
