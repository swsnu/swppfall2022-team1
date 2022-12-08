from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.serializers import BaseSerializer
from club.models import Club
from club.serializers import (
    ClubSerializer,
    ClubUserSerializer,
    ClubEventSerializer,
    ClubTagSerializer,
)
from drf_yasg.utils import swagger_auto_schema
from typing import Any, Type, TYPE_CHECKING

# Create your views here.

if TYPE_CHECKING:
    _GenereicViewSet = viewsets.GenericViewSet[Club]
else:
    _GenereicViewSet = viewsets.GenericViewSet


class ClubViewSet(_GenereicViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def get_serializer_class(self) -> Type[BaseSerializer[Club]]:
        if self.action == "user":
            return ClubUserSerializer
        if self.action == "event":
            return ClubEventSerializer
        if self.action == "tag":
            return ClubTagSerializer
        return ClubSerializer

    def list(self, request: Request) -> Response:
        club = self.get_queryset().filter(club_user_set__user__id=request.user.id)
        return Response(self.get_serializer(club, many=True).data)

    def retrieve(self, request: Request, pk: Any = None) -> Response:
        club = self.get_object()
        return Response(self.get_serializer(club).data)

    def create(self, request: Request) -> Response:
        serializer = self.serializer_class(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
