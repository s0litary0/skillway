from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer, ProfileSerializer, UserStatsSerializer, RegisterSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

class UsersView(APIView):
    
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registred successfully'},
                            status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, 
                        status=status.HTTP_400_BAD_REQUEST)