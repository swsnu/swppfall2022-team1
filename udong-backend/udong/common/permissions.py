from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView
from club.models import Club
from user.models import UserClub


class IsAdmin(BasePermission):
    def has_object_permission(self, request: Request, view: APIView, obj: Club) -> bool:
        try:
            user_club = UserClub.objects.get(
                Q(user_id=request.user.id) & Q(club_id=obj.id)
            )
            if user_club.auth == "M":
                return False
            return True
        except:
            return False
