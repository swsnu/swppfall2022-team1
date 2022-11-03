from django.db import models

# Create your models here.


class User(models.Model):
    # id: auto-generated
    google = models.TextField()
    image = models.TextField()
    time_table = models.TextField()
    name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
