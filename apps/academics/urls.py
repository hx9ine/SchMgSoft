from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.students, name='students'),
    path('teachers/', views.teachers, name='teachers'),
    path('teachers/attendance', views.attendance, name='attendance'),
    path('teachers/attendance/update', views.teacher_attendance_update, name='attendance-update'),
    path('teachers/attendance/view', views.teacher_attendance_view, name='attendance-view'),
    path('assignments/', views.assignments, name='assignments'),
]
