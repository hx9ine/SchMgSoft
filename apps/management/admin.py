from django.contrib import admin
from .models import TeacherNotification, StudentNotification

# Register your models here.
admin.site.register(TeacherNotification)
admin.site.register(StudentNotification)