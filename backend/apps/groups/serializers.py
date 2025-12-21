from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Friend, Group, GroupMembership, GroupScore

User = get_user_model()


# --------------------
# User Serializer (for nested representation)
# --------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


# --------------------
# Friend Serializer
# --------------------
class FriendSerializer(serializers.ModelSerializer):
    user1 = UserSerializer(read_only=True)
    user2 = UserSerializer(read_only=True)
    user1_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user1', write_only=True
    )
    user2_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user2', write_only=True
    )

    class Meta:
        model = Friend
        fields = ['id', 'user1', 'user2', 'user1_id', 'user2_id', 'created_at']


# --------------------
# Group Serializer
# --------------------
class GroupSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='owner', write_only=True
    )
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'owner', 'owner_id', 'members', 'created_at']


# --------------------
# Group Membership Serializer
# --------------------
class GroupMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )
    group = GroupSerializer(read_only=True)
    group_id = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(), source='group', write_only=True
    )

    class Meta:
        model = GroupMembership
        fields = ['id', 'group', 'group_id', 'user', 'user_id', 'joined_at']


# --------------------
# Group Score Serializer
# --------------------
class GroupScoreSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )
    group = GroupSerializer(read_only=True)
    group_id = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(), source='group', write_only=True
    )

    class Meta:
        model = GroupScore
        fields = ['id', 'group', 'group_id', 'user', 'user_id', 'score', 'last_updated']
