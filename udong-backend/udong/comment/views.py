from typing import Any
from django.core.exceptions import PermissionDenied
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from comment.models import Comment
from comment.serializers import CommentSerializer

# Create your views here.


class CommentViewSet(viewsets.GenericViewSet[Comment]):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

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

    def destroy(self, request: Request, pk: Any = None) -> Response:
        user = request.user
        comment = self.get_object()
        if comment.user_id != user.id:
            raise PermissionDenied()
        comment.delete()
        return Response()
