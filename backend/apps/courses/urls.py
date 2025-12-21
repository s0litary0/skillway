from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .view import (
    CourseViewSet,
    LessonViewSet,
    TaskViewSet,
    TaskTypeViewSet,
    SubmissionViewSet,
    EnrollmentViewSet,
    MCQViewSet,
)
from .submissions import SubmitMCQAPIView


router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'task-types', TaskTypeViewSet)
router.register(r'submissions', SubmissionViewSet)
router.register(r'mcqs', MCQViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path(
        "tasks/<int:task_id>/submit/",
        SubmitMCQAPIView.as_view(),
        name="submit-mcq",
    ),
]
