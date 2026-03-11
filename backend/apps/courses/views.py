from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Course, Enrollment
from .serializers import (CourseSerializer,
                          EnrollmentSerializer)

@api_view(["GET"])
def course_list(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def enrollments_list(request):
    enrollments = Enrollment.objects.all()
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data)