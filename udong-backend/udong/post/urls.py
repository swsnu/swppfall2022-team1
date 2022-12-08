from rest_framework.routers import SimpleRouter
from post.views import (
    PostViewSet,
    PostClubViewSet,
    EnrollmentViewSet,
    SchedulingViewSet,
)

app_name = "post"

router = SimpleRouter()
router.register("post", PostViewSet)
router.register("post/club", PostClubViewSet)
router.register("enroll", EnrollmentViewSet)
router.register("scheduling", SchedulingViewSet)

urlpatterns = router.urls
