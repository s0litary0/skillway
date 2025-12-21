from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Enrollment
from apps.accounts.models import UserStats

# Create UserStats for new users
@receiver(post_save, sender=User)
def create_user_stats(sender, instance, created, **kwargs):
    if created:
        UserStats.objects.create(user=instance)

# Update courses_in_progress on enrollment creation
@receiver(post_save, sender=Enrollment)
def update_user_stats_on_enroll(sender, instance, created, **kwargs):
    if created:
        stats, _ = UserStats.objects.get_or_create(user=instance.user)
        stats.courses_in_progress += 1
        stats.save()
