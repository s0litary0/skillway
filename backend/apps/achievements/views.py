from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Leaderboard, LeaderboardEntry
from .serializers import LeaderboardSerializer, LeaderboardEntrySerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Leaderboard, LeaderboardEntry
from .serializers import LeaderboardEntrySerializer
from apps.accounts.models import UserStats

User = get_user_model()


class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

    @action(detail=True, methods=["get"])
    def entries(self, request, pk=None):
        leaderboard = self.get_object()

        # ✅ get user from query param
        user_id = request.query_params.get("user__id")
        if not user_id:
            return Response(
                {"detail": "user__id query param is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # ✅ create entry if missing
        user_stats, _ = UserStats.objects.get_or_create(user=user)
        LeaderboardEntry.objects.get_or_create(
            leaderboard=leaderboard,
            user=user,
            defaults={"score": user_stats.courses_completed, "rank": "Unranked"},
        )
        
        entry, created = LeaderboardEntry.objects.get_or_create(
            leaderboard=leaderboard,
            user=user,
            defaults={"score": user_stats.courses_completed, "rank": "Unranked"},
        )
        if not created and entry.score != user_stats.courses_completed:
            entry.score = user_stats.courses_completed
            entry.save(update_fields=["score"])

        # ✅ get all entries ordered by score
        entries = (
            LeaderboardEntry.objects
            .filter(leaderboard=leaderboard)
            .select_related("user")
            .order_by("-score")
        )

        serializer = LeaderboardEntrySerializer(entries, many=True)
        return Response(serializer.data)



class LeaderboardEntryViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all().order_by('-score')
    serializer_class = LeaderboardEntrySerializer

    

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["leaderboard__id", "user__id"]
    ordering_fields = ["score"]