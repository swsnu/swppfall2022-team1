from django.db.models import Q, Model
from typing import TYPE_CHECKING
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from rest_framework.permissions import IsAuthenticated
from common.permissions import IsAdmin
from event.models import Event
from post.models import Post
from event.serializers import ClubEventSerializer
from user.models import UserClub
from typing import Any, TYPE_CHECKING, TypeVar

from post.serializers import PostBoardSerializer

if TYPE_CHECKING:
    _GenericViewSet = viewsets.GenericViewSet[Event]
    from rest_framework.permissions import _SupportsHasPermission

    _SupportsHasPermissionType = list[_SupportsHasPermission]
else:
    _GenericViewSet = viewsets.GenericViewSet
    _SupportsHasPermissionType = list

_MT_co = TypeVar("_MT_co", bound=Model, covariant=True)


class EventViewSet(_GenericViewSet):
    queryset = Event.objects.all()
    serializer_class = ClubEventSerializer

    def get_permissions(self) -> _SupportsHasPermissionType:
        if self.action in ("update", "destroy"):
            return [IsAuthenticated(), IsAdmin()]
        return super().get_permissions()

    def get_serializer_class(self) -> type[BaseSerializer[_MT_co]]:
        if self.action in ("retrieve", "update", "destroy"):
            return ClubEventSerializer
        elif self.action == "post":
            return PostBoardSerializer
        return self.serializer_class

    def retrieve(self, request: Request, pk: Any) -> Response:
        return Response(self.get_serializer(self.get_object()).data)

    def update(self, request: Request, pk: Any) -> Response:
        club = self.get_object().club

        obj_permission = IsAdmin()
        if not obj_permission.has_object_permission(request, self, club):
            self.permission_denied(
                request,
                message=getattr(obj_permission, "message", None),
                code=getattr(obj_permission, "code", None),
            )

        event = self.get_object()
        serializer = self.get_serializer(event, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request: Request, pk: Any) -> Response:
        club = self.get_object().club

        obj_permission = IsAdmin()
        if not obj_permission.has_object_permission(request, self, club):
            self.permission_denied(
                request,
                message=getattr(obj_permission, "message", None),
                code=getattr(obj_permission, "code", None),
            )

        event = self.get_object()
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["GET"])
    def post(self, request: Request, pk: Any) -> Response:
        try:
            auth = UserClub.objects.get(
                Q(user_id=request.user.id) & Q(club_id=self.get_object().club_id)
            ).auth
        except UserClub.DoesNotExist:
            return Response("User is not in the club", status=status.HTTP_404_NOT_FOUND)

        post = (
            Post.objects.get_queryset()
            .select_related("event")
            .select_related("author")
            .prefetch_related("post_tag_set__tag__tag_user_set")
            .filter(event_id=pk)
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
