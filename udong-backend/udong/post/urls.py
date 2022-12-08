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
router.register("enroll", EnrollmentViewSet)
router.register("schedule", SchedulingViewSet)

urlpatterns = router.urls
