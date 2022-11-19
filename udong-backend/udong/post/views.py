from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from post.models import Post
from post.serializers import PostBoardSerializer
from user.models import UserClub
from comment.serializers import CommentSerializer
from typing import Any

# Create your views here.


class PostViewSet(viewsets.GenericViewSet[Post]):
    queryset = Post.objects.all()
    serializer_class = CommentSerializer

    @action(detail=True, methods=["GET", "POST"])
    def comment(self, request: Request, pk: Any) -> Response:
        if request.method == "GET":
            return self._get_comments(request, pk)
        elif request.method == "POST":
            return self._post_comment(request, pk)
        else:
            raise MethodNotAllowed(
                request.method if request.method else "unknown method"
            )

    def _get_comments(self, request: Request, pk: Any) -> Response:
        # TODO: implement GET /post/:id/comment/
        return Response()

    def _post_comment(self, request: Request, pk: Any) -> Response:
        serializer = self.get_serializer(
            data=request.data, context={"post_id": pk, "user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PostClubViewSet(viewsets.GenericViewSet[Post]):
    queryset = Post.objects.all()
    serializer_class = PostBoardSerializer

    # TODO: Need to be optimized
    def retrieve(self, request: Request, pk: Any = None) -> Response:
        auth = UserClub.objects.filter(Q(user_id=request.user.id) & Q(club_id=pk))[
            0
        ].auth
        post = (
            self.get_queryset()
            .select_related("event")
            .prefetch_related("post_tag_set__tag__tag_user_set")
            .filter(club_id=pk)
        )
        if auth == "A":
            return Response(
                self.get_serializer(
                    post, many=True, context={"id": request.user.id}
                ).data
            )
        elif auth == "M":
            all_post = self.get_serializer(
                post, many=True, context={"id": request.user.id}
            ).data
            result = filter(lambda post: len(post["include_tag"]) != 0, all_post)
            return Response(result)
        else:
            return Response()
