from rest_framework import serializers
from .models import Course, Enrollment, Lesson, Task, TaskType, Submission, MultipleChoiceQuestion

class TaskTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskType
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    task_type = TaskTypeSerializer(read_only=True)
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'
        read_only_fields = ['enrolled_at']


class MCQSerializer(serializers.ModelSerializer):
    class Meta: 
        model = MultipleChoiceQuestion
        fields = '__all__'
