from rest_framework.routers import SimpleRouter
from tag.views import TagViewSet

app_name = "tag"

router = SimpleRouter()
router.register("tag", TagViewSet)

urlpatterns = router.urls
