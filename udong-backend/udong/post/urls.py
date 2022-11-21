from rest_framework.routers import SimpleRouter
from post.views import PostViewSet, PostClubViewSet
from udong.post.views import EnrollmentViewSet

app_name = "post"

router = SimpleRouter()
router.register("post", PostViewSet)
router.register("post/club", PostClubViewSet)
router.register("enroll", EnrollmentViewSet)

urlpatterns = router.urls
