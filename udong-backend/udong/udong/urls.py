"""udong URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, include, re_path, URLPattern, URLResolver
from typing import List, Union
from rest_framework import routers
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from udong.views import ping


router = routers.DefaultRouter()

schema_view = get_schema_view(
    openapi.Info(
        title="Udong",
        default_version="v1",
        description="API docs for Udong",
        terms_of_service="https://www.google.com/policies/terms/",
    ),
    public=False,
    permission_classes=[permissions.AllowAny],
)

urlpatterns: List[Union[URLPattern, URLResolver]] = [
    path("api/", include("user.urls")),
    path("api/", include("club.urls")),
    path("api/", include("post.urls")),
    path("api/", include("comment.urls")),
    path("ping/", ping),
]

if settings.DEBUG:
    # django-admin
    urlpatterns += [
        path("admin/", admin.site.urls),
    ]

    # django-debug-toolbar
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]

if True:
    # swagger
    urlpatterns += [
        re_path(
            r"^swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
        re_path(
            r"^swagger/$",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        re_path(
            r"^redoc/$",
            schema_view.with_ui("redoc", cache_timeout=0),
            name="schema-redoc",
        ),
    ]
