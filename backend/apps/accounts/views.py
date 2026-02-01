# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status, permissions
# from django.contrib.auth import get_user_model
# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import filters
# from rest_framework import generics, filters
# from django.contrib.auth import get_user_model
# from .serializers import UserSerializer


# from .serializers import (
#     UserSerializer, ProfileSerializer, UserStatsSerializer, RegisterSerializer
# )
# from .models import Profile, UserStats

# User = get_user_model()


# # List all users or create a user (admin use)
# class UsersView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['username']


# class UserRetrieveView(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     # permission_classes = [permissions.IsAuthenticated]  # optional
#     lookup_field = 'id'  # use URL parameter to get user by id
#     def retrieve(self, request, *args, **kwargs):
#         """
#         Override retrieve to include Profile and UserStats.
#         """
#         user = self.get_object()

#         try:
#             profile = Profile.objects.get(user=user)
#             profile_data = ProfileSerializer(profile).data
#         except Profile.DoesNotExist:
#             profile_data = None

#         try:
#             stats = UserStats.objects.get(user=user)
#             stats_data = UserStatsSerializer(stats).data
#         except UserStats.DoesNotExist:
#             stats_data = None

#         return Response({
#             'user': UserSerializer(user).data,
#             'profile': profile_data,
#             'stats': stats_data
#         })

# # Registration endpoint
# class RegisterView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({
#                 'message': 'User registered successfully',
#                 'user': UserSerializer(user).data
#             }, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # Get logged-in user's profile and stats
# class MeView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         try:
#             profile = Profile.objects.get(user=request.user)
#             stats = UserStats.objects.get(user=request.user)
#         except Profile.DoesNotExist:
#             return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
#         except UserStats.DoesNotExist:
#             return Response({'error': 'Stats not found'}, status=status.HTTP_404_NOT_FOUND)

#         return Response({
#             'user': UserSerializer(request.user).data,
#             'profile': ProfileSerializer(profile).data,
#             'stats': UserStatsSerializer(stats).data
#         })

# class ProfileUpdateAPI(generics.UpdateAPIView):
#     serializer_class = ProfileSerializer
#     queryset = Profile.objects.all()
#     # permission_classes = [permissions.IsAuthenticated]

#     def patch(self, request, *args, **kwargs):
#         user_id = request.data.get("user_id")
#         if not user_id:
#             return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             profile = Profile.objects.get(user__id=user_id)
#         except Profile.DoesNotExist:
#             return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

#         serializer = self.get_serializer(profile, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         return Response(serializer.data)

# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework import status

# # from .serializers import UserSerializer, ProfileSerializer, UserStatsSerializer, RegisterSerializer
# # from django.contrib.auth import get_user_model


# # User = get_user_model()

# # class UsersView(APIView):
    
# #     def get(self, request):
# #         users = User.objects.all()
# #         serializer = UserSerializer(users, many=True)
# #         return Response(serializer.data)

# #     def post(self, request):
# #         serializer = UserSerializer(data=request.data)
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response(serializer.data, status=status.HTTP_201_CREATED)
# #         print(serializer.errors)
# #         return Response(status=status.HTTP_400_BAD_REQUEST)
    

# # class RegisterView(APIView):
# #     def post(self, request):
# #         serializer = RegisterSerializer(data=request.data)
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response({'message': 'User registred successfully'},
# #                             status=status.HTTP_201_CREATED)
        
# #         return Response(serializer.errors, 
# #                         status=status.HTTP_400_BAD_REQUEST)

