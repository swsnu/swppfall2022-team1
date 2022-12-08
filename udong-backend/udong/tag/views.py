from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from tag.models import Tag
from tag.serializers import TagUserSerializer
from typing import TYPE_CHECKING, Any
from common.permissions import IsAdmin
from drf_yasg.utils import swagger_auto_schema

# Create your views here.

if TYPE_CHECKING:
    _GenericViewSet = viewsets.GenericViewSet[Tag]
    from rest_framework.permissions import _SupportsHasPermission

    _SupportsHasPermissionType = list[_SupportsHasPermission]
else:
    _GenericViewSet = viewsets.GenericViewSet
    _SupportsHasPermissionType = list


class TagViewSet(_GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagUserSerializer

    def get_permissions(self) -> _SupportsHasPermissionType:
        if self.action in ("update", "destroy"):
            return [IsAuthenticated(), IsAdmin()]
        return super().get_permissions()

    def retrieve(self, request: Request, pk: Any = None) -> Response:
        return Response(self.get_serializer(self.get_object()).data)

    @swagger_auto_schema(responses={204: "", 403: "User is not admin"})
    def destroy(self, request: Request, pk: Any = None) -> Response:
        tag = self.get_object()
        self.check_object_permissions(request, tag)
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
