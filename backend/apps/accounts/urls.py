from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UsersView, RegisterView, MeView, UserRetrieveView, ProfileUpdateAPI

urlpatterns = [
    # User management
    path('users/', UsersView.as_view(), name='users'),            # list all users / create (admin)
    path('users/<int:id>', UserRetrieveView.as_view(), name='user-details'),            # list all users / create (admin)
    path('register/', RegisterView.as_view(), name='register'),   # user registration
    path('me/', MeView.as_view(), name='me'),                     # get logged-in user info
    path("profile/", ProfileUpdateAPI.as_view(), name="profile-update"),


    # JWT token endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


# from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .views import UsersView, RegisterView

# urlpatterns = [
#     path('users/', UsersView.as_view(), name='users'),
#     path('register/', RegisterView.as_view(), name='register'),
#     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
#     # path('login/', ),
#     # path('logout/', ),
# ]

# urlpatterns += [
#     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]