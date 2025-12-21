from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import LeaderboardViewSet, LeaderboardEntryViewSet

router = DefaultRouter()
router.register(r'leaderboards', LeaderboardViewSet, basename='leaderboard')
router.register(r'entries', LeaderboardEntryViewSet, basename='leaderboard-entry')


urlpatterns = [
    path('', include(router.urls)),
]
