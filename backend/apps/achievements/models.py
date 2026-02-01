from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Achievement(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField()
    icon = models.ImageField(upload_to="achievements_icons")

    def __str__(self):
        return f"name: {self.name}"


class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.user.username} earned {self.achievement.name} at {self.earned_at}"
    

class Leaderboard(models.Model):
    class TypeChoices(models.TextChoices):
        WORLD = "W", "World"
        REGIONAL = "R", "Regional"
        GROUP = "G", "Group"

    type = models.CharField(max_length=1, choices=TypeChoices.choices)
    period_start = models.DateTimeField()
    period_end = models.DateTimeField()

    def __str__(self):
        return f"type: {self.type} {self.period_start} - {self.period_end}"
    
class LeaderboardEntry(models.Model):
    leaderboard = models.ForeignKey(Leaderboard, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.PositiveBigIntegerField()
    place = models.PositiveBigIntegerField()