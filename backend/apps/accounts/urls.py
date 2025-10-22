from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UsersView

urlpatterns = [
    path('users/', UsersView.as_view(), name='users')
    # path('register/', ),
    # path('login/', ),
    # path('logout/', ),
]

urlpatterns += [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]