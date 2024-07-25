from django.urls import path
from . import views

urlpatterns = [
    path('notify/teachers/', views.notify_teachers, name='notify-teachers'),
    path('notify/students/', views.notify_students, name='notify-students'),
    path('leave-requests/teachers', views.teachers_leave_requests, name='teachers-leave-requests'),
    path('leave-requests/teachers/view/<int:id>/', views.view_teachers_leave_requests, name='view-leave-request'),
    path('leave-requests/teachers/view/status/update/<int:id>/', views.update_leave_status, name='update-leave-request-status'),
    path('leave-apply/', views.leave_apply, name='leave-apply'),
    path('notifications/view/', views.view_notifications, name='view-notifications'),
]
