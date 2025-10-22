from django.urls import path, include
from .views import *

urlpatterns = [
    path('courses/', CoursesView.as_view(), name='courses')
]