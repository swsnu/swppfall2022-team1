from django.db import models
from user.models import User
from post.models import Post

# Create your models here.


class Comment(models.Model):
    # id: auto-generated
    user = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="comment_set"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comment_set")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
