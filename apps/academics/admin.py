from django.contrib import admin
from .models import Student, Teacher, Teacher_Attendance

# Register your models here.
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Teacher_Attendance)
