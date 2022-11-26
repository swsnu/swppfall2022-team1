from typing import Any, TYPE_CHECKING
from django.core.exceptions import PermissionDenied
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from comment.models import Comment
from comment.serializers import CommentSerializer
from drf_yasg.utils import swagger_auto_schema

# Create your views here.


if TYPE_CHECKING:
    _GenereicViewSet = viewsets.GenericViewSet[Comment]
else:
    _GenereicViewSet = viewsets.GenericViewSet


class CommentViewSet(_GenereicViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @swagger_auto_schema(
        responses={200: CommentSerializer(), 403: "When the user try to update other's"}
    )
    def update(self, request: Request, pk: Any = None) -> Response:
        user = request.user
        comment = self.get_object()
        if comment.user_id != user.id:
            raise PermissionDenied()
        serializer = self.get_serializer(
            comment,
            data={"content": request.data.get("content")},
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={204: "", 403: "When the user try to delete other's"}
    )
    def destroy(self, request: Request, pk: Any = None) -> Response:
        user = request.user
        comment = self.get_object()
        if comment.user_id != user.id:
            raise PermissionDenied()
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
