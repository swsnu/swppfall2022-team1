from django.db.models import Q, Model
from rest_framework import viewsets, status
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from post.models import Post, Enrollment, Participation, Scheduling
from post.serializers import (
    PostBoardSerializer,
    EnrollmentSerializer,
    ParticipationSerializer,
    SchedulingSerializer,
)
from club.models import Club
from user.serializers import UserSerializer
from timedata.serializers import AvailableTimeSerializer, AvailableTimeSimpleSerializer
from timedata.models import AvailableTime
from user.models import UserClub
from comment.models import Comment
from common.permissions import IsAdmin, CanReadPost
from comment.serializers import CommentSerializer
from drf_yasg.utils import swagger_auto_schema
from typing import Any, TYPE_CHECKING, TypeVar

# Create your views here.


if TYPE_CHECKING:
    _PostGenericViewSet = viewsets.GenericViewSet[Post]
    _EnrollmentGenericViewSet = viewsets.GenericViewSet[Enrollment]
    _SchedulingGenericViewSet = viewsets.GenericViewSet[Scheduling]
    from rest_framework.permissions import _SupportsHasPermission

    _SupportsHasPermissionType = list[_SupportsHasPermission]
else:
    _PostGenericViewSet = viewsets.GenericViewSet
    _EnrollmentGenericViewSet = viewsets.GenericViewSet
    _SchedulingGenericViewSet = viewsets.GenericViewSet
    _SupportsHasPermissionType = list

_MT_co = TypeVar("_MT_co", bound=Model, covariant=True)


class PostViewSet(_PostGenericViewSet):
    queryset = Post.objects.all()
    serializer_class = PostBoardSerializer

    def get_permissions(self) -> _SupportsHasPermissionType:
        if self.action in ("update", "destroy"):
            return [IsAuthenticated(), IsAdmin()]
        if self.action in ("retrieve", "comment"):
            return [IsAuthenticated(), CanReadPost()]
        return super().get_permissions()

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
        self.check_object_permissions(request, post)
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
        club = Club.objects.get(id=post.club_id)
        self.check_object_permissions(request, club)

        serializer = self.get_serializer(
            post,
            data=request.data,
            partial=True,
            context={"id": request.user.id, "club": False},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={204: "", 403: "When the non-admin user try to delete"}
    )
    def destroy(self, request: Request, pk: Any = None) -> Response:
        post = self.get_object()
        club = Club.objects.get(id=post.club_id)
        self.check_object_permissions(request, club)

        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["GET", "POST"])
    def comment(self, request: Request, pk: Any) -> Response:
        self.get_object()
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
    permission_classes = [IsAuthenticated, CanReadPost]

    def get_permissions(self) -> _SupportsHasPermissionType:
        if self.action == "close":
            return [IsAuthenticated(), IsAdmin()]
        else:
            return super().get_permissions()

    def get_serializer_class(self) -> type[BaseSerializer[_MT_co]]:
        if self.action in ("participate", "status"):
            return ParticipationSerializer
        elif self.action == "close":
            return EnrollmentSerializer
        return self.serializer_class

    def _check_enrollment_validity(self, id: Any) -> Response | Enrollment:
        try:
            enrollment = Enrollment.objects.get(post=id)
            if enrollment.closed:
                return Response(
                    "Enrollment is closed", status=status.HTTP_400_BAD_REQUEST
                )
        except Enrollment.DoesNotExist:
            return Response(
                "Enrollment does not exist", status=status.HTTP_404_NOT_FOUND
            )
        return enrollment

    @action(detail=True, methods=["POST"])
    def participate(self, request: Request, pk: Any) -> Response:
        result = self._check_enrollment_validity(pk)
        if isinstance(result, Response):
            return result
        else:
            enrollment = result
            self.check_object_permissions(request, enrollment)
            try:
                Participation.objects.get(
                    Q(user_id=request.user.id) & Q(enrollment_id=pk)
                )
                return Response(
                    "Already registered", status=status.HTTP_400_BAD_REQUEST
                )
            except Participation.DoesNotExist:
                serializer = self.get_serializer(
                    data=request.data,
                    context={"user": request.user, "enrollment": enrollment},
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["POST"])
    def unparticipate(self, request: Request, pk: Any) -> Response:
        result = self._check_enrollment_validity(pk)
        if isinstance(result, Response):
            return result
        else:
            self.check_object_permissions(request, result)
            try:
                participation = Participation.objects.get(
                    Q(user_id=request.user.id) & Q(enrollment_id=pk)
                )
                participation.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Participation.DoesNotExist:
                return Response(
                    "Didn't register yet", status=status.HTTP_400_BAD_REQUEST
                )

    @action(detail=True, methods=["GET"])
    def status(self, request: Request, pk: Any) -> Response:
        self.get_object()
        participation_list = (
            Participation.objects.all().select_related("user").filter(enrollment_id=pk)
        )
        user_list = list(
            map(lambda participation: participation.user, participation_list)
        )
        return Response(UserSerializer(user_list, many=True).data)

    @action(detail=True, methods=["PUT"])
    def close(self, request: Request, pk: Any = None) -> Response:
        enrollment = self.get_object()
        self.check_object_permissions(request, enrollment.post.club)
        enrollment.closed = True
        enrollment.save()
        serializer = self.get_serializer(enrollment)
        return Response(serializer.data)


class SchedulingViewSet(_SchedulingGenericViewSet):
    queryset = Scheduling.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [IsAuthenticated, CanReadPost]

    def get_permissions(self) -> _SupportsHasPermissionType:
        if self.action == "close":
            return [IsAuthenticated(), IsAdmin()]
        else:
            return super().get_permissions()

    def get_serializer_class(self) -> type[BaseSerializer[_MT_co]]:
        if self.action == "participate":
            return AvailableTimeSerializer
        elif self.action in ("close", "status"):
            return SchedulingSerializer
        elif self.action in ("me"):
            return AvailableTimeSimpleSerializer
        return self.serializer_class

    @action(detail=True, methods=["POST"])
    def participate(self, request: Request, pk: Any) -> Response:
        try:
            scheduling = Scheduling.objects.get(post=pk)
            self.check_object_permissions(request, scheduling)
            if scheduling.closed:
                return Response(
                    "Scheduling is closed", status=status.HTTP_400_BAD_REQUEST
                )
        except Scheduling.DoesNotExist:
            return Response(
                "Scheduling does not exist", status=status.HTTP_404_NOT_FOUND
            )
        try:
            availableTime = AvailableTime.objects.get(
                Q(user_id=request.user.id) & Q(scheduling_id=pk)
            )
            serializer = self.get_serializer(availableTime, request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except AvailableTime.DoesNotExist:
            serializer = self.get_serializer(
                data=request.data,
                context={"user": request.user, "scheduling": scheduling},
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["GET"])
    def status(self, request: Request, pk: Any) -> Response:
        try:
            scheduling = (
                self.get_queryset()
                .prefetch_related("available_time_set__user")
                .get(post_id=pk)
            )
            self.check_object_permissions(request, scheduling)
        except Scheduling.DoesNotExist:
            return Response(
                "Scheduling does not exist", status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(scheduling)
        return Response(serializer.data)

    @action(detail=True, methods=["GET"])
    def me(self, request: Request, pk: Any) -> Response:
        try:
            availableTime = AvailableTime.objects.get(
                scheduling_id=pk, user_id=request.user.id
            )
        except AvailableTime.DoesNotExist:
            return Response(None)
        serializer = self.get_serializer(availableTime)
        return Response(serializer.data)

    @action(detail=True, methods=["PUT"])
    def close(self, request: Request, pk: Any = None) -> Response:
        scheduling = self.get_object()
        if scheduling.closed:
            return Response(
                "Scheduling is already closed", status=status.HTTP_400_BAD_REQUEST
            )
        data = request.data
        if "confirmed_time" not in data:
            return Response(
                "confirmed_time field required", status=status.HTTP_400_BAD_REQUEST
            )
        data["closed"] = True
        serializer = self.get_serializer(scheduling, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
