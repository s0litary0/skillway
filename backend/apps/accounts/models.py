from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    ROLES_CHOICES = [
        ('S', 'Student'),
        ('T', 'Teacher'),
        ('A', 'Admin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    role = models.CharField(max_length=1, choices=ROLES_CHOICES)

class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    courses_completed = models.IntegerField(default=0)
    courses_in_progress = models.IntegerField(default=0)