from rest_framework.routers import SimpleRouter
from event.views import EventViewSet

app_name = "event"

router = SimpleRouter()
router.register("event", EventViewSet)

urlpatterns = router.urls
