from django.contrib import admin
from .models import Leaderboard, LeaderboardEntry


# Register your models here.
admin.site.register([Leaderboard, LeaderboardEntry])