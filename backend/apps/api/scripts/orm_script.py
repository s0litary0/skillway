from pprint import pprint

from apps.accounts.models import Profile, UserStats
from apps.courses.models import Course
from django.contrib.auth import get_user_model
from django.db import connection

User = get_user_model()


def run():
    dev = User.objects.first()

    UserStats.objects.create(
        user=dev,
    )