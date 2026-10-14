from django.contrib import admin
from apps.attempts.models import TestQuestionAttempt, TestQuestionAttemptAnswer

@admin.register(TestQuestionAttempt)
class TestQuestionAttemptAdmin(admin.ModelAdmin):
    list_display=["id", "user", "test_question_block", "status", "created_at", "deleted_at"]
    list_filter = ["status", "created_at"]
    search_fields=["user__email", "test_question_block__name"]

@admin.register(TestQuestionAttemptAnswer)
class TestQuestionAttemptAnswerAdmin(admin.ModelAdmin):
    list_display = ["id", "test_question_attempt", "test_question", "selected_options", "is_correct", "created_at"]
    list_filter = ["is_correct", "created_at"]
    search_fields = ["test_question_attempt__user__email", "test_question__question"]