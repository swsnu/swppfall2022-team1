from django.shortcuts import render
from django.contrib.auth import login, logout
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from user.models import User
from user.serializers import UserSerializer, AuthSerializer
from drf_yasg.utils import swagger_auto_schema, no_body
from typing import Any, TYPE_CHECKING
import urllib3
import json

# Create your views here.


if TYPE_CHECKING:
    _GenereicViewSet = viewsets.GenericViewSet[User]
else:
    _GenereicViewSet = viewsets.GenericViewSet


class UserViewSet(_GenereicViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request: Request, pk: Any = None) -> Response:
        return Response(self.get_serializer(self.get_object()).data)

    @action(detail=False, methods=["GET", "PUT", "DELETE"])
    def me(self, request: Request) -> Response:
        if request.method == "GET":
            return Response(self.get_serializer(request.user).data)
        if request.method == "PUT":
            serializer = self.get_serializer(request.user, request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class AuthViewSet(_GenereicViewSet):
    queryset = User.objects.all()
    serializer_class = AuthSerializer

    @swagger_auto_schema(responses={204: ""})
    @action(detail=False, methods=["POST"], permission_classes=[AllowAny])
    def signin(self, request: Request) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resp: Any = urllib3.PoolManager().request(
            "GET",
            "https://oauth2.googleapis.com/tokeninfo?access_token="
            + serializer.validated_data["token"],
        )  # type: ignore[no-untyped-call]

        if (
            resp.status != 200
            or json.loads(resp.data.decode("utf-8"))["email"]
            != serializer.validated_data["email"]
        ):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        login(request, serializer.save())
        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(responses={204: ""}, request_body=no_body)
    @action(detail=False, methods=["POST"])
    def signout(self, request: Request) -> Response:
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
