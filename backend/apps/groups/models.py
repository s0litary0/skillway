from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Q, F

User = get_user_model()


class Friend(models.Model):
    """
    Bidirectional friendship between users.
    """
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friend_user1")
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friend_user2")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=~Q(user1=F('user2')),
                name="user_cannot_add_self"
            ),
            models.UniqueConstraint(
                fields=['user1', 'user2'],
                name='unique_friend_pair'
            )
        ]

    def save(self, *args, **kwargs):
        if self.user1.id > self.user2.id:
            self.user1, self.user2 = self.user2, self.user1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user1.username} ↔ {self.user2.username}"


class Group(models.Model):
    """
    A group created by a user, containing multiple friends.
    """
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_groups")
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(User, through='GroupMembership')

    def __str__(self):
        return f"{self.name} (Owner: {self.owner.username})"


class GroupMembership(models.Model):
    """
    Links users to groups.
    """
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['group', 'user'], name='unique_group_member')
        ]

    def __str__(self):
        return f"{self.user.username} in {self.group.name}"


class GroupScore(models.Model):
    """
    Stores user's score inside a group for comparison.
    """
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="scores")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['group', 'user'], name='unique_group_score')
        ]

    def __str__(self):
        return f"{self.user.username} - {self.score} in {self.group.name}"
