from django.contrib import admin
from .models import TeacherNotification, StudentNotification, LeaveApplication

# Register your models here.
admin.site.register(TeacherNotification)
admin.site.register(StudentNotification)
admin.site.register(LeaveApplication)