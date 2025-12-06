import django_filters
from .models import Course


class CourseFilter(django_filters.FilterSet):
    class Meta:
        model = Course
        # fields = ('name', 'category', 'difficulty_level')
        fields = {
            'name': ['icontains'],
            'category': ['exact'],
            'difficulty_level': ['exact']
        }