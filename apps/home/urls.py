from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.home, name='home'),
    path('add-session/', views.add_session, name='add-session'),
    path('add-class/', views.add_class, name='add-class'),
    path('add-subject/', views.add_subject, name='add-subject'),
]

