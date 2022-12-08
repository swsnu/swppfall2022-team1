from rest_framework.routers import SimpleRouter
from club.views import ClubViewSet, ClubUserViewSet

app_name = "club"

router = SimpleRouter()
router.register("club", ClubViewSet)
router.register(r"club/(?P<club_id>[^/.]+)/user", ClubUserViewSet)

urlpatterns = router.urls
