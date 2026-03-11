from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (Course,
                     Enrollment,
                     Module,
                     Lesson,
                     LessonBlock,
                     Task,
                     MultipleChoiceQuestion,
                     Submission)


# Register your models here.
admin.site.register(Course) 
admin.site.register(Enrollment) 
admin.site.register(Module) 
admin.site.register(Lesson) 
admin.site.register(LessonBlock) 
admin.site.register(Task) 
admin.site.register(MultipleChoiceQuestion) 
admin.site.register(Submission) 

# admin.site.register(UserStats) 