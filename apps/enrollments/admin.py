from django.contrib import admin
from apps.enrollments.models import Enrollment, LessonProgress, LessonBlockProgress


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ["id", "student", "course", "status",
                    "progress", "created_at", "completed_at", "deleted_at"]
    list_filter = ["status", "course"]
    search_fields = ["student__username", "course__name"]


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ["id", "enrollment", "lesson",
                    "is_completed", "created_at", "completed_at", "deleted_at"]
    list_filter = ["is_completed"]
    search_fields = ["enrollment__student__username"]


@admin.register(LessonBlockProgress)
class LessonBlockProgressAdmin(admin.ModelAdmin):
    list_display = ["id", "lesson_progress", "lesson_block",
                    "is_completed", "created_at", "deleted_at"]
    list_filter = ["is_completed"]
