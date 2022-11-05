from django.shortcuts import render
from django.db.models import Model
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.serializers import BaseSerializer
from club.models import Club
from club.serializers import ClubSerializer, ClubUserSerializer
from typing import Any, Type, TypeVar

# Create your views here.

_MT_co = TypeVar("_MT_co", bound=Model, covariant=True)


class ClubViewSet(viewsets.GenericViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def get_serializer_class(self) -> Type[BaseSerializer[_MT_co]]:
        if self.action == "user":
            return ClubUserSerializer
        return ClubSerializer

    def list(self, request: Request) -> Response:
        club = self.get_queryset().filter(club_user_set__user__id=request.user.id)
        return Response(self.get_serializer(club, many=True).data)

    def retrieve(self, request: Request, pk: Any = None) -> Response:
        club = self.get_object()
        return Response(self.get_serializer(club).data)

    @action(detail=True, methods=["GET"])
    def user(self, request: Request, pk: Any) -> Response:
        club_user = (
            self.get_queryset()
            .prefetch_related("club_user_set__user")
            .get(id=pk)
            .club_user_set
        )

        return Response(self.get_serializer(club_user, many=True).data)
