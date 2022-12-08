from rest_framework.routers import SimpleRouter
from post.views import PostViewSet, PostClubViewSet
from post.views import EnrollmentViewSet

app_name = "post"

router = SimpleRouter()
router.register("post", PostViewSet)
router.register("enroll", EnrollmentViewSet)

urlpatterns = router.urls
