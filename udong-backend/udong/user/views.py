from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.request import Request
from user.models import User
from user.serializers import UserSerializer
from typing import Any, TYPE_CHECKING

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
