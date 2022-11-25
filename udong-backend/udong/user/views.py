from django.shortcuts import render
from django.contrib.auth import login, logout
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from user.models import User
from user.serializers import UserSerializer, AuthSerializer
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
        user = request.user if pk == "me" else self.get_object()
        return Response(self.get_serializer(user).data)


class AuthViewSet(_GenereicViewSet):
    queryset = User.objects.all()
    serializer_class = AuthSerializer

    @action(detail=False, methods=["POST"])
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

    @action(detail=False, methods=["POST"])
    def signout(self, request: Request) -> Response:
        if request.user.is_authenticated:
            logout(request)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
