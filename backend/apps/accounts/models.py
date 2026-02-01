from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
# from django.core.validators import 


class User(AbstractUser):
    class RoleChoices(models.TextChoices):
        STUDENT = "S", "Student"
        TEACHER = "T", "Teacher"
        ADMIN = "A", "Admin"

    role = models.CharField(max_length=1, choices=RoleChoices.choices)

    def __str__(self):
        return f"role: {self.role} username: {self.username}"
    

class Profile(models.Model):
    class LanguageChoices(models.TextChoices):
        RU = "RU", "Russian"
        EN = "EN", "English"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="avatars/", null=True)
    language = models.CharField(max_length=2, choices=LanguageChoices.choices, default=LanguageChoices.EN)

    def __str__(self):
        return f"username: {self.user.username}"
    
    
class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    achievements = models.PositiveIntegerField(default=0)
    courses_in_progress = models.PositiveIntegerField(default=0)
    courses_completed = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"username: {self.user.username} courses_completed: {self.courses_completed}"