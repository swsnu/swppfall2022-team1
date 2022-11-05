from rest_framework.routers import SimpleRouter
from club.views import ClubViewSet

app_name = "club"

router = SimpleRouter()
router.register("club", ClubViewSet)

urlpatterns = router.urls
