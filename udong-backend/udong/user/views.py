from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.request import Request
from user.models import User
from user.serializers import UserSerializer
from typing import Any

# Create your views here.


class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request: Request, pk: Any = None) -> Response:
        user = request.user if pk == "me" else self.get_object()
        return Response(self.get_serializer(user).data)
