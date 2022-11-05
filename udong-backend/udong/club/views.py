from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from club.models import Club
from club.serializers import ClubSerializer

# Create your views here.


class ClubViewSet(viewsets.GenericViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def list(self, request: Request) -> Response:
        club = self.get_queryset().filter(club_user_set__user__id=request.user.id)
        return Response(self.get_serializer(club, many=True).data)
