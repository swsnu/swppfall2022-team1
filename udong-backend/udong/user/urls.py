from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import UserViewSet

app_name = "user"

router = SimpleRouter()
router.register("user", UserViewSet)

urlpatterns = router.urls
