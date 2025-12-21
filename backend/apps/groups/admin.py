from django.contrib import admin
from .models import Friend, Group, GroupScore, GroupMembership


# Register your models here.
admin.site.register([Friend, Group, GroupScore, GroupMembership])