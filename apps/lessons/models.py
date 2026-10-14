from django.db.models import (
    CharField,
    TextField,
    ForeignKey,
    PositiveIntegerField,
    FileField,
    BooleanField,
    URLField,
    PROTECT,
    UniqueConstraint,
    Q,
)
from django.core.validators import FileExtensionValidator

from apps.abstracts.models import AbstractBaseModel
from apps.courses.models import Course


class Lesson(AbstractBaseModel):
    """Lesson model"""

    NAME_MAX_LENGTH = 100
    name = CharField(max_length=NAME_MAX_LENGTH, verbose_name="Lesson title")
    description = TextField(blank=True, default="", verbose_name="Lesson description")
    course = ForeignKey(
        to=Course,
        on_delete=PROTECT,
        related_name="lessons",
        verbose_name="Related course",
    )
    order = PositiveIntegerField(verbose_name="Lesson order")

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=("course", "order"),
                condition=Q(deleted_at__isnull=True),
                name="unique_course_order",
            )
        ]
        verbose_name_plural = "Lessons"


class LessonBlock(AbstractBaseModel):
    """LessonBlock Model"""

    NAME_MAX_LENGTH = 100

    name = CharField(max_length=NAME_MAX_LENGTH, verbose_name="Lesson block title")
    description = TextField(
        blank=True, default="", verbose_name="Lesson block description"
    )
    lesson = ForeignKey(
        to=Lesson,
        on_delete=PROTECT,
        related_name="blocks",
        verbose_name="Related lesson",
    )
    order = PositiveIntegerField(verbose_name="Lesson block order")

    class Meta:
        ordering = ["order"]
        constraints = [
            UniqueConstraint(
                fields=("lesson", "order"),
                condition=Q(deleted_at__isnull=True),
                name="unique_lesson_order",
            )
        ]
        verbose_name_plural = "Lesson blocks"


class TextBlock(LessonBlock):
    """LessonBlock's TextBlock model"""

    text = TextField(verbose_name="Text block text")

    class Meta:
        verbose_name_plural = "Text blocks"


def video_directory_path(instance, filename: str):
    return f"videos/lessons/{instance.lesson.id}/{filename}"


class VideoBlock(LessonBlock):
    """LessonBlock's VideoBlock model"""

    URL_MAX_LENGTH = 200

    video = FileField(
        upload_to=video_directory_path,
        blank=True,
        null=True,
        verbose_name="Video block video file",
        validators=[
            FileExtensionValidator(allowed_extensions=["mp4", "avi", "mkv", "mov"])
        ],
    )
    external_link = URLField(
        blank=True,
        default="",
        max_length=URL_MAX_LENGTH,
        verbose_name="External video link",
    )

    class Meta:
        verbose_name_plural = "Video blocks"


class TestQuestionBlock(LessonBlock):
    """LessonBlock's TestQuestionBlock model"""

    class Meta:
        verbose_name_plural = "Test question blocks"


class TestQuestion(AbstractBaseModel):
    """TestQuestion model"""

    QUESTION_MAX_LENGTH = 200
    HINT_MAX_LENGTH = 100

    question = CharField(max_length=QUESTION_MAX_LENGTH, verbose_name="Test question")
    hint = CharField(
        blank=True, default="", max_length=HINT_MAX_LENGTH, verbose_name="Question hint"
    )
    test_question_block = ForeignKey(
        to=TestQuestionBlock,
        on_delete=PROTECT,
        related_name="test_questions",
        verbose_name="Related test question block",
    )

    class Meta:
        verbose_name_plural = "Test questions"


class TestQuestionAnswer(AbstractBaseModel):
    """TestQuestionAnswer model"""

    ANSWER_MAX_LENGTH = 200

    answer = CharField(
        max_length=ANSWER_MAX_LENGTH, verbose_name="Test question answer"
    )
    is_correct = BooleanField(
        default=False, blank=True, verbose_name="Is correct answer"
    )
    test_question = ForeignKey(
        to=TestQuestion,
        on_delete=PROTECT,
        related_name="answers",
        verbose_name="Related test question",
    )

    class Meta:
        verbose_name_plural = "Test question answers"