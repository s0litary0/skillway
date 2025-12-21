from django.contrib import admin
from .models import Profile, UserStats


# Register your models here.
admin.site.register([Profile, UserStats])