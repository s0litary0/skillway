from typing import Never

from django.contrib import messages
from django.contrib.admin import register, ModelAdmin, action, TabularInline
from django.http import HttpRequest
from django.utils import timezone as django_timezone
from django.utils.translation import ngettext
from django.utils.safestring import mark_safe

from apps.abstracts.models import AbstractBaseModel
from apps.abstracts.filters import IsDeletedFilter
# from .filters import OrderListFilter
from .models import (
    Lesson,
    LessonBlock,
    TextBlock,
    VideoBlock,
    TestQuestionBlock,
    TestQuestion,
    TestQuestionAnswer,
)


class LessonAppModelAdmin(ModelAdmin):
    """Common admin configuration"""

    SHOW_ALL_MAX_RECORDS = 100
    RECORDS_PER_PAGE = 20 


    list_filter = [
        IsDeletedFilter,
    ]
    ordering = ["id"]

    list_max_show_all = SHOW_ALL_MAX_RECORDS
    list_per_page = RECORDS_PER_PAGE
    show_full_result_count = True

    readonly_fields: list[str] = ["id", "created_at", "deleted_at"]

    save_as = True
    save_on_top = True

    @action(description="Soft delete selected objects")
    def soft_delete(self, request, queryset):
        try:
            updated = queryset.filter(deleted_at__isnull=True).update(
                deleted_at=django_timezone.now()
            )
            self.message_user(
                request=request,
                message=ngettext(
                    singular="%d object was successfully soft deleted",
                    plural="%d objects were successfully soft deleted",
                    number=updated,
                )
                % updated,
                level=messages.SUCCESS,
            )
        except Exception as e:
            self.message_user(
                request=request,
                message=f"Error occured during soft deletion: {e}",
                level=messages.ERROR,
            )

    actions = [soft_delete]

    def is_deleted(self, instance: AbstractBaseModel | None = None) -> str:
        """Return html wrapped information about user existence"""

        if isinstance(instance, AbstractBaseModel):
            if not instance.deleted_at:
                return mark_safe(
                    '<span style="color: green; font-weight: bold;">Not Deleted</span>'
                )
            else:
                return mark_safe(
                    '<span style="color: red; font-weight: bold;">Deleted</span>'
                )
        return mark_safe('<span style="color: blue; font-weight: bold;">Unknown</span>')

    is_deleted.short_description = "Status"  # type: ignore



class LessonBlockInline(TabularInline):
    MAX_EXTRA_FORMS = 1

    model = LessonBlock
    fields = ["id", "name", "description", "order"]
    classes = ["collapse"]
    ordering = ["order"]
    readonly_fields = ["id", "name", "description"]

    show_change_link = True
    extra = MAX_EXTRA_FORMS
    can_delete = False


@register(Lesson)
class LessonAdmin(LessonAppModelAdmin):
    """Lesson model admin configuration class."""

    inlines = [LessonBlockInline]

    empty_value_display = "---"

    list_display = [
        "id",
        "name",
        "course__name",
        "course__author__email",
        "order",
        "is_deleted",
    ]
    list_display_links = ["name"]
    list_editable = ["order"]

    search_fields = ["name", "course__name", "course__author__email"]
    search_help_text = "Search by lesson name, course name or course author username"

    fieldsets = [
        (
            "Basic information",
            {
                "description": "Lesson general information",
                # "classes": ["collapse"],
                "fields": [("id", "name", "course", "order"), "description"],
            },
        ),
        (
            "Date and time information",
            {
                "fields": [("created_at", "deleted_at")],
                "classes": ["collapse"],
            },
        ),
    ]


    def get_readonly_fields(
        self, request: HttpRequest, obj: Lesson | None = None
    ) -> list[str] | tuple[str, ...] | tuple[Never]:
        if obj:
            updated_readonly_fields: list[str] = ["course"]
            return self.readonly_fields + updated_readonly_fields
        return self.readonly_fields


@register(LessonBlock)
class LessonBlockAdmin(LessonAppModelAdmin):
    """LessonBlock model admin configuration class"""

    list_display = [
        "id",
        "name",
        "lesson__name",
        "lesson__course__name",
        "order",
        "is_deleted",
    ]
    list_display_links = ["name"]
    list_editable = ["order"]

    search_fields = ["name", "lesson__name", "lesson__course__name"]
    search_help_text = "Search by block name, lesson name or course name"

    fieldsets = [
        (
            "Basic information",
            {
                "description": "Block general information",
                # "classes": ["collapse"],
                "fields": [("id", "name", "lesson", "order"), "description"],
            },
        ),
        (
            "Date and time information",
            {
                "fields": [("created_at", "deleted_at")],
                "classes": ["collapse"],
            },
        ),
    ]

    def get_readonly_fields(
        self, request: HttpRequest, obj: Lesson | None = None
    ) -> list[str] | tuple[str, ...] | tuple[Never]:
        if obj:
            updated_readonly_fields: list[str] = ["lesson"]
            return self.readonly_fields + updated_readonly_fields
        return self.readonly_fields


@register(TextBlock)
class TextBlockAdmin(LessonAppModelAdmin):
    """TextBlock model admin configuration class"""

    list_display = [
        "id",
        "text",
        "block_name",
        "lesson__name",
        "is_deleted"
    ]
    list_display_links = ["text", "block_name"]
    # list_editable = ["text"]

    search_fields = ["name", "text"]
    search_help_text = "Search by block name and text"

    fieldsets = [
        (
            "Basic information",
            {
                "description": "Block general information",
                # "classes": ["collapse"],
                "fields": [("id", "name", "lesson", "order"), "description"],
            },
        ),
        (
            None,
            {
                "description": "TextBlock specific information",
                "fields": ["text"],
            }
        ),
        (
            "Date and time information",
            {
                "fields": [("created_at", "deleted_at")],
                "classes": ["collapse"],
            },
        ),
    ]

    def get_readonly_fields(
        self, request: HttpRequest, obj: Lesson | None = None
    ) -> list[str] | tuple[str, ...] | tuple[Never]:
        if obj:
            updated_readonly_fields: list[str] = ["lesson"]
            return self.readonly_fields + updated_readonly_fields
        return self.readonly_fields

    def block_name(self, instance: LessonBlock | None = None) -> str:
        """Return block name"""
        if isinstance(instance, LessonBlock):
            return mark_safe(instance.name)
        return mark_safe("Unkown")
    block_name.short_description = "Block name" # type: ignore
    

@register(VideoBlock)
class VideoBlockAdmin(LessonAppModelAdmin):
    """VideoBlock model admin configuration class"""

    list_display = [
        "id",
        "video_file",
        "block_name",
        "lesson__name",
        "is_deleted"
    ]
    list_display_links = ["video_file", "block_name"]
    # list_editable = ["text"]

    search_fields = ["name"]
    search_help_text = "Search by block name"

    fieldsets = [
        (
            "Basic information",
            {
                "description": "Block general information",
                # "classes": ["collapse"],
                "fields": [("id", "name", "lesson", "order"), "description"],
            },
        ),
        (
            None,
            {
                "description": "VideoBlock specific information",
                "fields": [("video", "external_link")],
            }
        ),
        (
            "Date and time information",
            {
                "fields": [("created_at", "deleted_at")],
                "classes": ["collapse"],
            },
        ),
    ]

    def get_readonly_fields(
        self, request: HttpRequest, obj: Lesson | None = None
    ) -> list[str] | tuple[str, ...] | tuple[Never]:
        if obj:
            updated_readonly_fields: list[str] = ["lesson"]
            return self.readonly_fields + updated_readonly_fields
        return self.readonly_fields

    def block_name(self, instance: LessonBlock | None = None) -> str:
        """Return block name"""
        if isinstance(instance, LessonBlock):
            return mark_safe(instance.name)
        return mark_safe("Unkown")
    block_name.short_description = "Block name" # type: ignore

    def video_file(self, instance: VideoBlock | None = None) -> str:
        """Return block name"""
        if isinstance(instance, VideoBlock) and instance.video:
            return mark_safe(instance.video.url)
        return mark_safe("No file")
    video_file.short_description = "Video path" # type: ignore


class TestQuestionInline(TabularInline):
    MAX_EXTRA_FORMS = 2

    model = TestQuestion
    fields = ["id", "question", "hint"]
    # classes = ["collapse"]
    ordering = ["id"]
    readonly_fields = ["id"]

    show_change_link = True
    extra = MAX_EXTRA_FORMS
    can_delete = False


        
@register(TestQuestionBlock)
class TestQuestionBlockAdmin(LessonAppModelAdmin):
    """TestQuestionBlock model admin configuration class"""

    inlines = [TestQuestionInline]

    list_display = [
        "id",
        "block_name",
        "lesson__name",
        "is_deleted"
    ]
    list_display_links = ["block_name"]
    # list_editable = ["text"]

    search_fields = ["name"]
    search_help_text = "Search by block name"

    fieldsets = [
        (
            "Basic information",
            {
                "description": "Block general information",
                # "classes": ["collapse"],
                "fields": [("id", "name", "lesson", "order"), "description"],
            },
        ),
        # (
        #     None,
        #     {
        #         "description": "TestQuestionBlock specific information",
        #         "fields": [""],
        #     }
        # ),
        (
            "Date and time information",
            {
                "fields": [("created_at", "deleted_at")],
                "classes": ["collapse"],
            },
        ),
    ]

    def get_readonly_fields(
        self, request: HttpRequest, obj: Lesson | None = None
    ) -> list[str] | tuple[str, ...] | tuple[Never]:
        if obj:
            updated_readonly_fields: list[str] = ["lesson"]
            return self.readonly_fields + updated_readonly_fields
        return self.readonly_fields

    def block_name(self, instance: LessonBlock | None = None) -> str:
        """Return block name"""
        if isinstance(instance, LessonBlock):
            return mark_safe(instance.name)
        return mark_safe("Unkown")
    block_name.short_description = "Block name" # type: ignore


class TestQuestionAnswerInline(TabularInline):
    MAX_EXTRA_FORMS = 2

    model = TestQuestionAnswer
    fields = ["id", "answer", "is_correct"]
    # classes = ["collapse"]
    ordering = ["is_correct"]
    readonly_fields = ["id"]

    show_change_link = True
    extra = MAX_EXTRA_FORMS
    can_delete = False


@register(TestQuestion)
class TestQuestionAdmin(LessonAppModelAdmin):
    """TestQuestion model admin configuration class"""

    inlines = [TestQuestionAnswerInline]

    list_display = [
        "id",
        "question",
        "test_question_block__name",
        "is_deleted",
    ]

    list_display_links = ["question"]
    # list_editable = [""]

    search_fields = ["question", "hint"]
    search_help_text = "Search by question and hint"

    fieldsets = [
        (
            "Basic information",
            {
                "description": "TestQuestion general information",
                # "classes": ["collapse"],
                "fields": [("id", "question", "hint"), "test_question_block"],
            },
        ),
        (
            "Date and time information",
            {
                "fields": [("created_at", "deleted_at")],
                "classes": ["collapse"],
            },
        ),
    ]

    def get_readonly_fields(
        self, request: HttpRequest, obj: Lesson | None = None
    ) -> list[str] | tuple[str, ...] | tuple[Never]:
        if obj:
            updated_readonly_fields: list[str] = ["test_question_block"]
            return self.readonly_fields + updated_readonly_fields
        return self.readonly_fields


@register(TestQuestionAnswer)
class TestQuestionAnswerAdmin(LessonAppModelAdmin):
    """TestQuestionAnswer model admin configuration class"""

    list_display = [
        "id",
        "answer",
        "test_question__question",
        "is_correct",
        "is_deleted",
    ]
    list_display_links = ["answer"]
    list_editable = ["is_correct"]

    search_fields = ["answer", "question"]
    search_help_text = "Search by answer and question"

    fieldsets = [
        (
            "Basic information",
            {
                "description": "TestQuestionAnswer general information",
                # "classes": ["collapse"],
                "fields": [("id", "answer", "is_correct"), "test_question"],
            },
        ),
        (
            "Date and time information",
            {
                "fields": [("created_at", "deleted_at")],
                "classes": ["collapse"],
            },
        ),
    ]

    def get_readonly_fields(
        self, request: HttpRequest, obj: Lesson | None = None
    ) -> list[str] | tuple[str, ...] | tuple[Never]:
        if obj:
            updated_readonly_fields: list[str] = ["test_question"]
            return self.readonly_fields + updated_readonly_fields
        return self.readonly_fields
