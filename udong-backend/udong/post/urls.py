from rest_framework.routers import SimpleRouter
from post.views import PostViewSet, PostClubViewSet

app_name = "post"

router = SimpleRouter()
router.register("post", PostViewSet)
router.register("post/club", PostClubViewSet)

urlpatterns = router.urls
