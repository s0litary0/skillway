from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from .models import Course, Lesson, Task, TaskType, Submission, Enrollment, MultipleChoiceQuestion
from .serializers import CourseSerializer, LessonSerializer, TaskSerializer, TaskTypeSerializer, SubmissionSerializer, EnrollmentSerializer, MCQSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    filterset_fields = ['name', 'difficulty_level',]
    ordering_fields = ['created_at', 'difficulty_level']
    ordering = ["-created_at"]

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['course__id', 'user__id']
    filterset_fields = ['user', 'course']

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name']
    filterset_fields = ['course']


class TaskTypeViewSet(viewsets.ModelViewSet):
    queryset = TaskType.objects.all()
    serializer_class = TaskTypeSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name', 'lesson__name']

class MCQViewSet(viewsets.ModelViewSet):
    queryset = MultipleChoiceQuestion.objects.all()
    serializer_class = MCQSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['task']

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['user', 'task']



