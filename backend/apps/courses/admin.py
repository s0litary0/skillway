from django.contrib import admin
from .models import Course, Enrollment, Task, Lesson, TaskType, MultipleChoiceQuestion, Submission

# Register your models here.
admin.site.register([Course, Lesson, Enrollment, TaskType, Task, MultipleChoiceQuestion, Submission])