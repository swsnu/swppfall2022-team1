from django.db.models import Q
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView
from club.models import Club
from user.models import UserClub
from comment.models import Comment
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
