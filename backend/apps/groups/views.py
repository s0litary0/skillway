from rest_framework import viewsets, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Friend, Group, GroupMembership, GroupScore
from .serializers import (
    FriendSerializer,
    GroupSerializer,
    GroupMembershipSerializer,
    GroupScoreSerializer,
    UserSerializer,
)

User = get_user_model()


# --------------------
# Friend ViewSet
# --------------------
class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer

    def get_queryset(self):
        # Optionally filter by user
        user_id = self.request.query_params.get("user_id")
        qs = super().get_queryset()
        if user_id:
            qs = qs.filter(user1_id=user_id) | qs.filter(user2_id=user_id)
        return qs.distinct()


# --------------------
# Group ViewSet
# --------------------
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    @action(detail=True, methods=['post'])
    def add_members(self, request, pk=None):
        group = self.get_object()
        user_ids = request.data.get("user_ids", [])
        for uid in user_ids:
            try:
                user = User.objects.get(id=uid)
                group.members.add(user)
            except User.DoesNotExist:
                continue
        group.save()
        return Response(GroupSerializer(group).data)

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['owner']

# --------------------
# Group Membership ViewSet
# --------------------
class GroupMembershipViewSet(viewsets.ModelViewSet):
    queryset = GroupMembership.objects.all()
    serializer_class = GroupMembershipSerializer

    def get_queryset(self):
        group_id = self.request.query_params.get("group_id")
        qs = super().get_queryset()
        if group_id:
            qs = qs.filter(group_id=group_id)
        return qs


# --------------------
# Group Score ViewSet
# --------------------
class GroupScoreViewSet(viewsets.ModelViewSet):
    queryset = GroupScore.objects.all()
    serializer_class = GroupScoreSerializer

    def get_queryset(self):
        group_id = self.request.query_params.get("group_id")
        qs = super().get_queryset()
        if group_id:
            qs = qs.filter(group_id=group_id).order_by('-score')
        return qs

    @action(detail=True, methods=['post'])
    def update_score(self, request, pk=None):
        score = request.data.get("score")
        if score is None:
            return Response({"detail": "Score is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        group_score = self.get_object()
        group_score.score = score
        group_score.save()
        return Response(GroupScoreSerializer(group_score).data)
