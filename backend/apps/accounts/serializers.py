from rest_framework import serializers

from .models import Profile, UserStats


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = (
            "id",
            # "profile",
            "achievements",
            "courses_in_progress",
            "courses_completed"
        )

class ProfileSerializer(serializers.ModelSerializer):
    user_stats = UserStatsSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = (
            "id",
            "user",
            "language",
            "user_stats"
        )
    
    def validate_language(self, value):
        if value not in "RU EN":
            raise serializers.ValidationError("Not supported language")
        return value 
    
