from django.urls import path, include
from .views import *

urlpatterns = [
    path('accounts/', include('apps.accounts.urls')),
    path('courses/', include('apps.courses.urls')),
]

