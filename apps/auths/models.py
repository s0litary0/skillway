from django.db import models
from typing import Any

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin, User
from django.db.models import (
    BooleanField,
    CharField,
    EmailField,
    ImageField,
    TextField,
)
from django.utils import timezone as django_timezone

from apps.abstracts.models import AbstractBaseModel
# Create your models here.
class UserManager(BaseUserManager):

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields: Any) -> User:
        if not email:
            raise ValueError
        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self,
                    email: str,
                    password: str | None = None,
                    **extra_fields: Any) -> User:
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self,
                         email: str,
                         password: str| None = None,
                         **extra_fields: Any,) -> "User":
                         extra_fields.setdefault("is_staff", True)
                         extra_fields.setdefault("is_superuser", True)

                         if extra_fields.get("is_staff") is not True:
                             raise ValueError("Superuser must have is_staff = True")
                         if extra_fields.get("is_superuser") is not True:
                             raise ValueError("Superuser must have is_superuser = True")

                         return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, AbstractBaseModel):

    EMAIL_MAX_LENGTH = 254
    NAME_MAX_LENGTH = 150

    email = EmailField(max_length=EMAIL_MAX_LENGTH, unique=True)
    first_name = CharField(max_length=NAME_MAX_LENGTH, blank=True)
    last_name = CharField(max_length=NAME_MAX_LENGTH, blank=True)
    avatar = ImageField(upload_to="photos/users/", blank=True, null=True)
    bio = TextField(blank=True)
    is_active = BooleanField(default=True)
    is_staff = BooleanField(default=False)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: list[str] = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        ordering = ["-created_at"]

    def __str__(self) -> str:
            return self.email

    def get_full_name(self) -> str:
        full_name = f"{self.first_name} {self.last_name}".strip()
        return full_name or self.email
    def get_short_name(self) -> str:
        return self.first_name or self.email

    def delete(self, *args, **kwargs: dict[Any, Any]) -> None:

        self.is_active = False
        self.deleted_at = django_timezone.now()
        self.save(update_fields=["is_active", "deleted_at"])
