from rest_framework.routers import SimpleRouter
from user.views import AuthViewSet, UserViewSet

app_name = "user"

router = SimpleRouter()
router.register("user", UserViewSet)
router.register("auth", AuthViewSet)

urlpatterns = router.urls
