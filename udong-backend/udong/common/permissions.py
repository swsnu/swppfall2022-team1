from django.db.models import Q
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView
from club.models import Club
from user.models import UserClub
from comment.models import Comment
from post.models import Post, Enrollment, Scheduling
from typing import Any


class IsAdmin(BasePermission):
    def has_object_permission(self, request: Request, view: APIView, obj: Any) -> bool:
        if not isinstance(obj, Club):
            return True
        try:
            user_club = UserClub.objects.get(
                Q(user_id=request.user.id) & Q(club_id=obj.id)
            )
            if user_club.auth == "M":
                return False
            return True
        except:
            return False


class IsAuthor(BasePermission):
    def has_object_permission(self, request: Request, view: APIView, obj: Any) -> bool:
        if not isinstance(obj, Comment):
            return True
        return request.user.id == obj.user_id


class CanReadPost(BasePermission):
    def has_object_permission(self, request: Request, view: APIView, obj: Any) -> bool:
        if isinstance(obj, Enrollment):
            obj = obj.post
        if isinstance(obj, Scheduling):
            obj = obj.post
        if isinstance(obj, Post):
            try:
                user_club = UserClub.objects.get(
                    Q(user_id=request.user.id) & Q(club_id=obj.club_id)
                )
                if user_club.auth == "A":
                    return True
                return (
                    obj.post_tag_set.select_related("tag")
                    .prefetch_related("post_tag_set__tag__tag_user_set")
                    .filter(tag__tag_user_set__user__id=request.user.id)
                    .exists()
                )
            except:
                return False
        else:
            return True
