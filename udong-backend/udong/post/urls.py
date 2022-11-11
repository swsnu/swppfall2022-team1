from rest_framework.routers import SimpleRouter
from post.views import PostClubViewSet

app_name = "post"

router = SimpleRouter()
router.register("post/club", PostClubViewSet)

urlpatterns = router.urls
