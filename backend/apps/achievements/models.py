from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Achievement(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    icon = models.ImageField()
    criteria_type = models.ForeignKey('AchievementCriteria', on_delete=models.PROTECT)
    criteria_value = models.IntegerField()

    def __str__(self):
        return f"{self.name}: {self.criteria_type, self.criteria_value}"

class AchievementCriteria(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self): 
        return self.name

class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.user.username} earned {self.achievement.name} at {self.earned_at}"
    

class Leaderboard(models.Model):
    type = models.CharField(max_length=20)
    period_start = models.DateTimeField()
    period_end = models.DateTimeField()

    def __str__(self):
        return f"{self.period_start} - {self.period_end}"
    
class LeaderboardEntry(models.Model):
    leaderboard = models.ForeignKey(Leaderboard, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=6, decimal_places=2)
    rank = models.CharField(max_length=50)