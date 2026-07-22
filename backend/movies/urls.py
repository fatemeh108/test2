from django.urls import path
from .views import (
    MovieListAPIView,
    MovieDetailAPIView,
    MovieCommentListCreateAPIView,
    RegisterAPIView,
    LoginAPIView
)

urlpatterns = [
    path('movies/', MovieListAPIView.as_view(), name='movie-list'),
    path('movies/<int:id>/', MovieDetailAPIView.as_view(), name='movie-detail'),
    path('movies/<int:movie_id>/comments/', MovieCommentListCreateAPIView.as_view(), name='movie-comments'),
    path('auth/register/', RegisterAPIView.as_view(), name='auth-register'),
    path('auth/login/', LoginAPIView.as_view(), name='auth-login'),
]