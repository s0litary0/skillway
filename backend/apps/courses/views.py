from typing import Coroutine
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course
from .serializers import CourseSerializer

# Create your views here.

class CoursesView(APIView):

    def get(self, request):
        courses = Course.objects.all().order_by('id')
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data[:4], status=status.HTTP_200_OK)