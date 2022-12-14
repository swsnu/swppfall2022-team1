from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.db.utils import IntegrityError
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import MethodNotAllowed, PermissionDenied
from rest_framework.serializers import BaseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import MethodNotAllowed
from club.models import Club
from tag.models import Tag
from event.models import Event
from user.models import UserClub
from tag.models import Tag, UserTag
from club.serializers import (
    ClubSerializer,
    ClubRegisterSerializer,
)
from user.serializers import UserClubSerializer
from event.serializers import ClubEventSerializer
from tag.serializers import ClubTagSerializer
from common.permissions import IsAdmin
from common.random import Random
from drf_yasg.utils import swagger_auto_schema, no_body
from typing import Any, Type, TYPE_CHECKING

from post.models import Post
from post.serializers import PostBoardSerializer
from post.models import PostTag
from post.models import Enrollment, Scheduling
from user.models import UserClub

# Create your views here.

if TYPE_CHECKING:
    _GenericClubViewSet = viewsets.GenericViewSet[Club]
    _GenericClubUserViewSet = viewsets.GenericViewSet[UserClub]
    from rest_framework.permissions import _SupportsHasPermission

    _SupportsHasPermissionType = list[_SupportsHasPermission]
else:
    _GenericClubViewSet = viewsets.GenericViewSet
    _GenericClubUserViewSet = viewsets.GenericViewSet
    _SupportsHasPermissionType = list


class ClubViewSet(_GenericClubViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def get_permissions(self) -> _SupportsHasPermissionType:
        if self.action in ("update", "destroy", "post", "code"):
            return [IsAuthenticated(), IsAdmin()]
        return super().get_permissions()

    def get_serializer_class(self) -> Type[BaseSerializer[Club]]:
        if self.action == "user":
            return UserClubSerializer
        if self.action == "register":
            return ClubRegisterSerializer
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

    @swagger_auto_schema(
        method="POST",
        request_body=ClubRegisterSerializer(),
        responses={
            200: ClubSerializer(),
            400: "User already in the club",
            404: "Invalid Code",
        },
    )
    @action(detail=False, methods=["POST"])
    def register(self, request: Request) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        club = get_object_or_404(Club, **serializer.validated_data)
        try:
            # request.user is not anonymous
            UserClub.objects.create(user=request.user, club=club, auth="M")  # type: ignore
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        default_tag = Tag.objects.get(Q(club=club) & Q(is_default=True))
        # request.user is not anonymous
        UserTag.objects.create(user=request.user, tag=default_tag)  # type: ignore
        return Response(ClubSerializer(club).data)

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

    @swagger_auto_schema(method="GET", responses={200: UserClubSerializer(many=True)})
    @swagger_auto_schema(
        method="DELETE",
        responses={
            204: "",
            403: "User is the only admin in the club",
            404: "User is not in the club",
        },
    )
    @action(detail=True, methods=["GET", "DELETE"])
    def user(self, request: Request, pk: Any) -> Response:
        if request.method == "GET":
            club_user = (
                self.get_queryset()
                .prefetch_related("club_user_set__user")
                .get(id=pk)
                .club_user_set
            )
            return Response(self.get_serializer(club_user, many=True).data)
        elif request.method == "DELETE":
            user_club = get_object_or_404(
                UserClub, Q(user_id=request.user.id) & Q(club_id=pk)
            )
            if (
                user_club.auth == "A"
                and UserClub.objects.filter(Q(club_id=pk) & Q(auth="A")).count() == 1
            ):
                return Response(status=status.HTTP_403_FORBIDDEN)
            else:
                user_club.delete()
                UserTag.objects.select_related("club").filter(
                    Q(user_id=request.user.id) & Q(tag__club_id=pk)
                ).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise MethodNotAllowed(
                request.method if request.method else "unknown method"
            )

    @action(detail=True, methods=["GET", "POST"])
    def event(self, request: Request, pk: Any) -> Response:
        if request.method == "GET":
            return self._get_events(request, pk)
        else:
            return self._create_event(request, pk)

    @swagger_auto_schema(responses={200: ClubEventSerializer(many=True)})
    def _get_events(self, reqeust: Request, pk: Any) -> Response:
        club_event = (
            self.get_queryset()
            .prefetch_related("event_set__time_set")
            .get(id=pk)
            .event_set
        )
        return Response(self.get_serializer(club_event, many=True).data)

    @swagger_auto_schema(responses={201: ClubEventSerializer()})
    def _create_event(self, request: Request, pk: Any) -> Response:
        club = self.get_object()

        obj_permission = IsAdmin()
        if not obj_permission.has_object_permission(request, self, club):
            self.permission_denied(
                request,
                message=getattr(obj_permission, "message", None),
                code=getattr(obj_permission, "code", None),
            )

        serializer = self.get_serializer(data=request.data, context={"club": club})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["GET", "POST"])
    def tag(self, request: Request, pk: Any) -> Response:
        if request.method == "GET":
            return self._get_tags(request, pk)
        else:
            return self._create_tag(request, pk)

    @swagger_auto_schema(responses={200: ClubTagSerializer(many=True)})
    def _get_tags(self, request: Request, pk: Any) -> Response:
        club_tag = self.get_object().tag_set
        return Response(self.get_serializer(club_tag, many=True).data)

    @swagger_auto_schema(responses={201: ClubTagSerializer()})
    def _create_tag(self, request: Request, pk: Any) -> Response:
        club = self.get_object()

        obj_permission = IsAdmin()
        if not obj_permission.has_object_permission(request, self, club):
            self.permission_denied(
                request,
                message=getattr(obj_permission, "message", None),
                code=getattr(obj_permission, "code", None),
            )

        serializer = self.get_serializer(data=request.data, context={"club": club})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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

    @swagger_auto_schema(responses={200: PostBoardSerializer(many=True)})
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
            .order_by("-created_at", "id")
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
        club = self.get_object()
        self.check_object_permissions(request, club)

        serializer = self.get_serializer(
            data=request.data,
            context={
                "club_obj": club,
                "user": request.user,
                "id": request.user.id,
                "club": False,
            },
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        request_body=no_body,
        responses={403: "User is not a admin", 200: ClubSerializer()},
    )
    @action(detail=True, methods=["PUT"])
    def code(self, request: Request, pk: Any) -> Response:
        club = self.get_object()
        club.code = Random.generate_code()
        club.save()
        return Response(self.get_serializer(club).data)


class ClubUserViewSet(_GenericClubUserViewSet):
    queryset = UserClub.objects.all()
    serializer_class = UserClubSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    lookup_field: str = "user_id"

    @swagger_auto_schema(
        responses={200: UserClubSerializer(), 404: "User is not in the club"}
    )
    @action(detail=False, methods=["GET"])
    def me(self, request: Request, club_id: Any) -> Response:
        user_club = get_object_or_404(
            UserClub, Q(user_id=request.user.id) & Q(club_id=club_id)
        )
        return Response(self.get_serializer(user_club).data)

    @swagger_auto_schema(
        responses={
            204: "",
            400: "Admin cannot be kicked out",
            403: "User is not admin",
            404: "User is not in the club / Invalid club",
        },
    )
    def destroy(self, request: Request, club_id: Any, user_id: Any) -> Response:
        club = get_object_or_404(Club, id=club_id)
        self.check_object_permissions(request, club)
        user_club = get_object_or_404(UserClub, Q(user_id=user_id) & Q(club_id=club_id))
        if user_club.auth == "A":
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user_club.delete()
        UserTag.objects.select_related("club").filter(
            Q(user_id=user_id) & Q(tag__club_id=club_id)
        ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        request_body=no_body,
        responses={
            200: UserClubSerializer(),
            400: "User is not in the club",
            403: "User is not admin",
            404: "User is not in the club / Invalid club",
        },
    )
    @action(detail=True, methods=["PUT"])
    def role(self, request: Request, club_id: Any, user_id: Any) -> Response:
        club = get_object_or_404(Club, id=club_id)
        self.check_object_permissions(request, club)
        if (
            int(user_id) == request.user.id
            and UserClub.objects.filter(Q(club_id=club_id) & Q(auth="A")).count() == 1
        ):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user_club = get_object_or_404(UserClub, Q(user_id=user_id) & Q(club_id=club_id))
        if user_club.auth == "M":
            user_club.auth = "A"
        else:
            user_club.auth = "M"
        user_club.save()
        return Response(self.get_serializer(user_club).data)
