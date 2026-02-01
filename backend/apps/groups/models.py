from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(User, through="Membership")


class Membership(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)  
    date_joined = models.DateTimeField(auto_now_add=True)