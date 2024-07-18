from django.urls import path
from . import views

urlpatterns = [
    path('', views.profile, name='profile'),
    path('edit/', views.profile_edit, name='profile-edit'),
    # path('edit/update/', views.profile_update, name='profile-update'),
]
