from django.db import models

# Create your models here.


class Club(models.Model):
    # id: auto-generated
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
