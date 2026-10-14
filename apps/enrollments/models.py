from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator
from apps.abstracts.models import AbstractBaseModel


class Enrollment(AbstractBaseModel):
    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        COMPLETED = "completed", "Completed"
        DROPPED = "dropped", "Dropped"

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey(
        "courses.Course", on_delete=models.CASCADE, related_name="enrollments")
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.ACTIVE)
    progress = models.PositiveSmallIntegerField(
        default=0, validators=[MaxValueValidator(100)])
    completed_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "course"], name="unique_student_course")
        ]

    def __str__(self):
        return f"{self.student} / {self.course}"


class LessonProgress(AbstractBaseModel):
    enrollment = models.ForeignKey(
        Enrollment, on_delete=models.CASCADE, related_name="lesson_progress")
    lesson = models.ForeignKey(
        "lessons.Lesson", on_delete=models.CASCADE, related_name="progress")
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "lesson progress"
        constraints = [
            models.UniqueConstraint(
                fields=["enrollment", "lesson"], name="unique_enrollment_lesson"),
        ]

        def __str__(self):
            return f"{self.enrollment} / {self.lesson}"
