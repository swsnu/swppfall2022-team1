from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from tag.models import UserTag
from tag.serializers import TagUserSerializer
from typing import TYPE_CHECKING, Any

# Create your views here.

if TYPE_CHECKING:
    _GenericViewSet = viewsets.GenericViewSet[UserTag]
else:
    _GenericViewSet = viewsets.GenericViewSet


class TagViewSet(_GenericViewSet):
    queryset = UserTag.objects.all()
    serializer_class = TagUserSerializer

    def retrieve(self, request: Request, pk: Any = None) -> Response:
        return Response(self.get_serializer(self.get_object()).data)
