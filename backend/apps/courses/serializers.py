from rest_framework import serializers

from .models import (Course, 
                     Enrollment,
                     Module,
                     Lesson,
                     LessonBlock,
                     Task,
                     MultipleChoiceQuestion,
                     Submission)


class Submission(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            "user",
            "task",
            "answer",
            "percentage",
            "selected_answer",
            "is_correct",
            "submitted_at",
        ]
        read_only_fields = ["is_correct", "submitted_at"]
    

class MultipleChoiceQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceQuestion
        fields = [
            "question",
            "option_a",
            "option_b",
            "option_c",
        ]


class Task(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "block",
            "created_at",
            "updated_at"
        ]


class LessonBlock(serializers.ModelSerializer):
    class Meta: 
        model = LessonBlock
        fields = [
            "lesson",
            "type",
            "order",
            "data"
        ]


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            "name",
            "description",
            "order",
            "duration",
            "created_at",
            "updated_at"
        ]


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    class Meta:
        model = Module
        fields = [
            "name",
            "description",
            "order",
            "lessons",
            "created_at",
            "updated_at"
        ]


class CourseSerializer(serializers.ModelSerializer):
    total_enrollments = serializers.SerializerMethodField()
    modules = ModuleSerializer(many=True, read_only=True)
    def get_total_enrollments(self, obj):
        enrollments = obj.enrollments.all()
        return len(enrollments)

    class Meta:
        model = Course
        fields = [
            "name",
            "description",
            "image",
            "modules",
            "author",
            "learners",
            "difficulty",
            "total_enrollments",
            "created_at"
        ]


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = [
            "user",
            "course",
            "progress",
            "enrolled_at",
        ]

