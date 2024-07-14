from django.urls import path
from . import views

urlpatterns = [
    path('edit/', views.profile, name='profile'),
    path('update/', views.profile_update, name='profile-update'),
]
