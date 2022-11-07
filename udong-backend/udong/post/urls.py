from rest_framework.routers import SimpleRouter
from post.views import PostViewSet

app_name = "post"

router = SimpleRouter()
router.register("post", PostViewSet)

urlpatterns = router.urls
