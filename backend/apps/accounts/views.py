from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model

from .serializers import (
    UserSerializer, ProfileSerializer, UserStatsSerializer, RegisterSerializer
)
from .models import Profile, UserStats

User = get_user_model()


# List all users or create a user (admin use)
class UsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Registration endpoint
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User registered successfully',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get logged-in user's profile and stats
class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            stats = UserStats.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
        except UserStats.DoesNotExist:
            return Response({'error': 'Stats not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'user': UserSerializer(request.user).data,
            'profile': ProfileSerializer(profile).data,
            'stats': UserStatsSerializer(stats).data
        })


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from .serializers import UserSerializer, ProfileSerializer, UserStatsSerializer, RegisterSerializer
# from django.contrib.auth import get_user_model


# User = get_user_model()

# class UsersView(APIView):
    
#     def get(self, request):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         print(serializer.errors)
#         return Response(status=status.HTTP_400_BAD_REQUEST)
    

# class RegisterView(APIView):
#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'User registred successfully'},
#                             status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, 
#                         status=status.HTTP_400_BAD_REQUEST)

