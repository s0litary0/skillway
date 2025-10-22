from dataclasses import field
from rest_framework import serializers
from .models import Profile, UserStats
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'role']

class UserStatsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserStats
        fields = ['courses_completed', 'courses_in_progress']