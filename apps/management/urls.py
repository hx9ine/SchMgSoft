from django.urls import path
from . import views

urlpatterns = [
    path('notify/teachers/', views.notify_teachers, name='notify-teachers'),
    path('notify/students/', views.notify_students, name='notify-students'),
    path('leave-requests/teachers', views.teachers_leave_requests, name='teachers-leave-requests'),
    path('leave-apply/', views.leave_apply, name='leave-apply'),
    path('notifications/view/', views.view_notifications, name='view-notifications'),
]
