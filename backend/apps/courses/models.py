import datetime

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class Course(models.Model):
    class DifficultyChoices(models.TextChoices):
        EASY = "E", "Easy"
        MEDIUM = "M", "Medium"
        HARD = "H", "Hard"

    name = models.CharField(max_length=64)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to="course_images/", null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses_taught')
    learners = models.ManyToManyField(User, through="Enrollment")
    # category = models.CharField(max_length=64)
    difficulty = models.CharField(max_length=1, choices=DifficultyChoices.choices, default=DifficultyChoices.EASY)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"name: {self.name} author: {self.author.username})"


class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    progress = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} enrolled in {self.course.name}"
    

class Module(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="modules")
    order = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"name: {self.name} course: {self.course.name}"
    
class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="lessons")
    name = models.CharField(max_length=64)
    description = models.TextField(null=True)
    order = models.PositiveIntegerField()
    duration = models.DurationField(verbose_name="Lesson time", default=datetime.timedelta(minutes=10))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"name: {self.name} order: {self.order} course: {self.course}"

class LessonBlock(models.Model):
    class BlockChoices(models.TextChoices):
        TEXT = "TEXT", "Text"
        IMAGE = "IMAGE", "Image"
        VIDEO = "VIDEO", "Video"
        TASK = "TASK", "Task"

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="blocks")
    type = models.CharField(max_length=20, choices=BlockChoices.choices)
    order = models.PositiveIntegerField()
    data = models.JSONField()



class Task(models.Model):
    block = models.OneToOneField(LessonBlock, on_delete=models.CASCADE, related_name="task")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f""

    
class MultipleChoiceQuestion(models.Model):
    class AnswerChoices(models.TextChoices):
        A = "A"
        B = "B"
        C = "C"
        D = "D"

    task = models.OneToOneField(Task, on_delete=models.CASCADE, related_name="mcq")
    question = models.CharField(max_length=128)
    option_a = models.CharField(max_length=64)
    option_b = models.CharField(max_length=64)
    option_c = models.CharField(max_length=64)
    option_d = models.CharField(max_length=64)
    correct_option = models.CharField(max_length=1, choices=AnswerChoices.choices)
    explanation = models.TextField(null=True)

    def __str__(self):
        return f"question: {self.question[:10]}"


class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='submissions')
    answer = models.CharField(max_length=256)
    percentage = models.PositiveSmallIntegerField(validators=[
        MinValueValidator(0),
        MaxValueValidator(100)
    ])
    selected_answer = models.JSONField()
    is_correct = models.BooleanField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} submitted to {self.task.name} and got {self.percentage}"
    
