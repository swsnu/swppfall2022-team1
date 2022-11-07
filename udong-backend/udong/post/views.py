from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from post.models import Post
from post.serializers import PostBoardSerializer
from user.models import UserClub
from typing import Any

# Create your views here.


class PostClubViewSet(viewsets.GenericViewSet):
    queryset = Post.objects.all()
    serializer_class = PostBoardSerializer

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
