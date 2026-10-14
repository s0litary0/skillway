from django.db.models import (
    CharField,
    TextField,
    ForeignKey,
    PositiveIntegerField,
    FileField,
    BooleanField,
    PROTECT
)

from apps.abstracts.models import AbstractBaseModel
from apps.courses.models import Course


class Lesson(AbstractBaseModel):
    """Lesson model"""

    NAME_MAX_LENGTH = 100
    name = CharField(max_length=NAME_MAX_LENGTH)
    description = TextField()
    course = ForeignKey(to=Course, on_delete=PROTECT, related_name="lessons")
    order = PositiveIntegerField()


class LessonBlock(AbstractBaseModel):
    """LessonBlock Model"""

    NAME_MAX_LENGTH = 100

    name = CharField(max_length=NAME_MAX_LENGTH)
    description = TextField()
    lesson = ForeignKey(to=Lesson, on_delete=PROTECT, related_name="blocks")
    order = PositiveIntegerField()

    class Meta:
        ordering = ["order"]


class TextBlock(LessonBlock):
    """LessonBlock's TextBlock model"""

    text = TextField()


def video_directory_path(instance, filename: str):
    return f"videos/lessons/{instance.lesson.id}/{filename}"


class VideoBlock(LessonBlock):
    """LessonBlock's VideoBlock model"""

    video = FileField(upload_to=video_directory_path, blank=True, null=True)


class TestQuestionBlock(LessonBlock):
    """LessonBlock's TestQuestionBlock model"""

    ...


class TestQuestion(AbstractBaseModel):
    """TestQuestion model"""

    QUESTION_MAX_LENGTH = 200
    HINT_MAX_LENGTH = 100

    question = CharField(max_length=QUESTION_MAX_LENGTH)
    hint = CharField(max_length=HINT_MAX_LENGTH)
    test_question_block = ForeignKey(
        to=TestQuestionBlock, on_delete=PROTECT, related_name="test_questions"
    )


class TestQuestionAnswer(AbstractBaseModel):
    """TestQuestionAnswer model"""

    ANSWER_MAX_LENGTH = 200

    answer = CharField(max_length=ANSWER_MAX_LENGTH)
    is_correct = BooleanField(default=False)
    test_question = ForeignKey(
        to=TestQuestion, on_delete=PROTECT, related_name="answers"
    )
