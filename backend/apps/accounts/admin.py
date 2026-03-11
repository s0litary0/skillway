from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, UserStats


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Profile) 
admin.site.register(UserStats) 