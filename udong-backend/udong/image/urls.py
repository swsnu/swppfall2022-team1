from rest_framework.routers import SimpleRouter
from image.views import ImageViewSet

app_name = "image"

router = SimpleRouter()
router.register("image", ImageViewSet, basename="image")

urlpatterns = router.urls
