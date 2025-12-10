from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Profile, UserStats
from django.contrib.auth import get_user_model
import base64
from django.core.files.base import ContentFile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'

class UserStatsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserStats
        fields = '__all__'


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField(
        validators = [UniqueValidator(queryset=User.objects.all(), 
                                      message="User with this email already exists.")]
    )
    password = serializers.CharField(
        write_only=True, validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Passwords don't match"})
        return attrs

    def create(self, validated_data):
        # Remove password2 from data
        validated_data.pop('password2')
        avatar_base64 = validated_data.pop('avatar_base64', None)

        # Create the user
        user = User.objects.create_user(**validated_data)

        # Create Profile and set role = Student
        profile = Profile.objects.create(user=user, role='S')

        # If avatar_base64 provided, save it
        if avatar_base64:
            try:
                format, imgstr = avatar_base64.split(';base64,')
                ext = format.split('/')[-1]  # e.g., png or jpeg
                profile.avatar.save(f"{user.username}.{ext}", ContentFile(base64.b64decode(imgstr)), save=True)
            except Exception as e:
                print("Error saving avatar:", e)

        # Create UserStats
        UserStats.objects.create(user=user)

        return user