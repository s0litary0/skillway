from django.db import models
from django.conf import settings
from apps.abstracts.models import AbstractBaseModel

class TestQuestionAttempt(AbstractBaseModel):
    """Model of the questions block attempt by the user"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="test_attempts",
    )
    test_question_block = models.ForeignKey(
        "lessons.TestQuestionBlock",
        on_delete=models.CASCADE,
        related_name="test_attempts",
    )
    status=models.CharField(
        max_length=20,
        default="in_progress",
    )
    def __str__(self):
        return f"Test attempt of the user {self.user.username} in block {self.test_question_block}"

class TestQuestionAttemptAnswer(AbstractBaseModel):
    """Model of the response to certain one question in the attempt"""
    test_question_attempt = models.ForeignKey(
        TestQuestionAttempt,
        on_delete=models.CASCADE,
        related_name="answers"
    )
    test_question = models.ForeignKey(
        "lessons.TestQuestion",
        on_delete=models.CASCADE,
        related_name="attempt_answers"
    )
    selected_options = models.IntegerField()
    is_correct = models.BooleanField(
        default=False
    )

    def __str__(self):
        return f"Response to the question '{self.test_question}' from the user {self.test_question_attempt.user.username}"
