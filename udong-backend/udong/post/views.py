from django.db.models import Q, QuerySet, Model
from rest_framework import viewsets, status
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from rest_framework.decorators import action
from post.models import Post
from post.models import Enrollment
from post.models import Participation
from post.serializers import PostBoardSerializer
from post.serializers import EnrollmentSerializer
from udong.post.serializers import ParticipationSerializer
from user.models import UserClub
from comment.models import Comment
from comment.serializers import CommentSerializer
from typing import Any, TYPE_CHECKING, TypeVar

# Create your views here.


if TYPE_CHECKING:
    _GenereicViewSet = viewsets.GenericViewSet[Post]
else:
    _GenereicViewSet = viewsets.GenericViewSet

_MT_co = TypeVar("_MT_co", bound=Model, covariant=True)


class PostViewSet(_GenereicViewSet):
    queryset = Post.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_class(self) -> type[BaseSerializer[_MT_co]]:
        if self.action in ("list", "retrieve"):
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
                .prefetch_related("post_tag_set__tag__tag_user_set")
                .filter(club_id=club_id)
            )
            if auth == "A":
                response.extend(
                    self.get_serializer(
                        post, many=True, context={"id": request.user.id}
                    ).data
                )
            elif auth == "M":
                all_post = self.get_serializer(
                    post, many=True, context={"id": request.user.id}
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
            .prefetch_related("post_tag_set__tag__tag_user_set")
            .get(id=pk)
        )
        return Response(self.get_serializer(post, context={"id": request.user.id}).data)

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


class PostClubViewSet(_GenereicViewSet):
    queryset = Post.objects.all()
    serializer_class = PostBoardSerializer

    # TODO: Need to be optimized
    def retrieve(self, request: Request, pk: Any = None) -> Response:
        auth = UserClub.objects.filter(Q(user_id=request.user.id) & Q(club_id=pk))[
            0
        ].auth
        post = (
            self.get_queryset()
            .select_related("event")
            .prefetch_related("post_tag_set__tag__tag_user_set")
            .filter(club_id=pk)
        )
        if auth == "A":
            return Response(
                self.get_serializer(
                    post, many=True, context={"id": request.user.id}
                ).data
            )
        elif auth == "M":
            all_post = self.get_serializer(
                post, many=True, context={"id": request.user.id}
            ).data
            result = filter(lambda post: len(post["include_tag"]) != 0, all_post)
            return Response(result)
        else:
            return Response()


class EnrollmentViewSet(_GenereicViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    @action(detail=True, methods=["GET"])
    def status(self, request: Request, pk: Any) -> Response:
        if request.method == "GET":
            return self._get_participations(request, pk)
        else:
            raise MethodNotAllowed(
                request.method if request.method else "unknown method"
            )

    def _get_participations(self, request: Request, pk: Any) -> Response:
        participation_list = self.get_serializer(
            Participation.objects.select_related("user").filter(enrollment_id=pk),
            many=True,
        ).data
        return Response(participation_list)

    @action(detail=True, methods=["POST"])
    def close(self, request: Request, pk: Any = None) -> Response:
        if request.method == "POST":
            return self._close_enrollment(request, pk)
        else:
            raise MethodNotAllowed(
                request.method if request.method else "unknown method"
            )

    def _close_enrollment(self, request: Request, pk: Any) -> Response:
        serializer = self.get_serializer(
            data=request.data, context={"post_id": pk, "closed": True}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
