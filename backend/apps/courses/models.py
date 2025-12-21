from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    DIFFICULTY_LEVELS = [
        ("E", "EASY"),
        ("M", "MEDIUM"),
        ("H", "HARD"),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(null=True)
    image_base64 = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100)
    difficulty_level = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses_taught')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (difficulty: {self.difficulty_level})"

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress = models.DecimalField(max_digits=6, decimal_places=2, default=0.00) # type: ignore

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'course'], name='unique_user_course')
        ]

    def __str__(self):
        return f"{self.user.username} enrolled in {self.course.name}"
    
class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    name = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField(blank=True, null=True)
    order = models.PositiveBigIntegerField(default=1)
    duration = models.DurationField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta: 
        ordering = ['order']

    def __str__(self):
        return f"{self.name} (course: {self.course.name})"

class Task(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='tasks')
    task_type = models.ForeignKey('TaskType', on_delete=models.SET_NULL, null=True, related_name='tasks')
    name = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=1)
    max_score = models.PositiveBigIntegerField(default=0)
    pass_score = models.PositiveBigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} (task_type: {self.task_type.name if self.task_type else 'null'})"


class TaskType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name
    
class MultipleChoiceQuestion(models.Model):

    ANSWER_OPTIONS = [
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
    ]

    task = models.OneToOneField(Task, on_delete=models.CASCADE, related_name="mcq")
    question = models.CharField(max_length=255)
    option_a = models.CharField(max_length=150)
    option_b = models.CharField(max_length=150)
    option_c = models.CharField(max_length=150)
    option_d = models.CharField(max_length=150)
    correct_option = models.CharField(max_length=1, choices=ANSWER_OPTIONS)
    explanation = models.TextField(null=True, blank=True)
    def __str__(self):
        return f"MCQ: {self.question[:50]}..."

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='submissions')
    answer = models.CharField(max_length=255)
    is_correct = models.BooleanField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "task")

    def __str__(self):
        return f"{self.user.username} submitted to {self.task.name} and got {self.is_correct}"
    
