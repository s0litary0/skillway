from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Achievement, AchievementCriteria, UserAchievement, Leaderboard, LeaderboardEntry

User = get_user_model()

class AchievementCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementCriteria
        fields = ['id', 'name']

class AchievementSerializer(serializers.ModelSerializer):
    criteria_type = AchievementCriteriaSerializer(read_only=True)

    class Meta:
        model = Achievement
        fields = ['id', 'name', 'description', 'icon', 'criteria_type', 'criteria_value']

class UserAchievementSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    achievement = AchievementSerializer(read_only=True)

    class Meta:
        model = UserAchievement
        fields = ['id', 'user', 'achievement', 'earned_at']

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['id', 'type', 'period_start', 'period_end']

class LeaderboardEntrySerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField(read_only=True)
    # leaderboard = LeaderboardSerializer(read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'leaderboard', 'user', 'score', 'rank']
