from django.db import models
from django.contrib.auth.hashers import get_hasher
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, BaseUserManager
from club.models import Club
from common.random import Random
from typing import Any, List

# Create your models here.


class UserManager(BaseUserManager["User"]):
    def get_or_create_user(
        self, email: str, password: str = "password", **extra_fields: Any
    ) -> "User":
        try:
            return User.objects.get(email=email)
        except:
            return self.create_user(email, password, **extra_fields)

    def create_user(
        self, email: str, password: str = "password", **extra_fields: Any
    ) -> "User":
        if "token" in extra_fields:
            del extra_fields["token"]

        hasher = get_hasher("default")
        encoded_password = hasher.encode(password, salt=hasher.salt())
        user = self.model(
            email=email,
            password=encoded_password,
            image=Random.choice_image(),
            **extra_fields
        )
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    # id: auto-generated
    email = models.EmailField(
        verbose_name="email",
        max_length=255,
        unique=True,
    )
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD: str = "email"
    REQUIRED_FIELDS: List[str] = []
    image = models.CharField(max_length=255)
    time_table = models.TextField()
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    def __str__(self) -> str:
        return self.email


class UserClub(models.Model):
    # id: auto-generated
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_club_set"
    )
    club = models.ForeignKey(
        Club, on_delete=models.CASCADE, related_name="club_user_set"
    )
    auth = models.CharField(max_length=1, choices=[("M", "Member"), ("A", "Admin")])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "club"], name="unique register")
        ]
