# apps/groups/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendViewSet, GroupViewSet, GroupMembershipViewSet, GroupScoreViewSet

router = DefaultRouter()
router.register(r'friends', FriendViewSet, basename='friend')
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'memberships', GroupMembershipViewSet, basename='membership')
router.register(r'scores', GroupScoreViewSet, basename='score')

urlpatterns = [
    path('', include(router.urls)),
]
