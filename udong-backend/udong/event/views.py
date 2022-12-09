from django.db.models import Q, Model
from typing import TYPE_CHECKING
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from event.models import Event
from post.models import Post
from event.serializers import ClubEventSerializer
from user.models import UserClub
from typing import Any, TYPE_CHECKING, TypeVar

from post.serializers import PostBoardSerializer

if TYPE_CHECKING:
    _GenericViewSet = viewsets.GenericViewSet[Event]
else:
    _GenericViewSet = viewsets.GenericViewSet

_MT_co = TypeVar("_MT_co", bound=Model, covariant=True)


class EventViewSet(_GenericViewSet):
    queryset = Event.objects.all()
    serializer_class = ClubEventSerializer 

    def get_serializer_class(self) -> type[BaseSerializer[_MT_co]]:
        if self.action in ("retrieve", "update", "destroy"):
            return ClubEventSerializer 
        elif self.action == "post":
            return PostBoardSerializer
        return self.serializer_class

    def retrieve(self, request: Request, pk: Any) -> Response:
        return Response(self.get_serializer(self.get_object()).data)

    def update(self, request: Request, pk: Any) -> Response:
        event = self.get_object()
        serializer = self.get_serializer(event, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request: Request, pk: Any) -> Response:
        event = self.get_object()
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
