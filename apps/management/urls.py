from django.urls import path
from . import views

urlpatterns = [
    path('notify/teachers/', views.notify_teachers, name='notify-teachers'),
]
