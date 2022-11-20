from rest_framework.routers import SimpleRouter
from comment.views import CommentViewSet

app_name = "comment"

router = SimpleRouter()
router.register("comment", CommentViewSet)

urlpatterns = router.urls
