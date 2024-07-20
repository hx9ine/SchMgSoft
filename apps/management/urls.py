from django.urls import path
from . import views

urlpatterns = [
    path('notify/teachers/', views.notify_teachers, name='notify-teachers'),
    path('notify/students/', views.notify_students, name='notify-students'),
]
