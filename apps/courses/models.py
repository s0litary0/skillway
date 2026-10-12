from django.db import models
from django.conf import settings
from apps.abstracts.models import AbstractBaseModel
# Create your models here.

class Category(AbstractBaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class Course(AbstractBaseModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="photos/courses/", blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="courses")
    categories = models.ManyToManyField(Category, related_name="courses")

    def __str__(self):
        return self.name

class Review(AbstractBaseModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="reviews")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True)

    def __str__(self):
        return f"{self.course} - {self.rating}"