from django.contrib import admin
from .models import Student, Teacher, TeacherAttendance, Assignment

# Register your models here.
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(TeacherAttendance)
admin.site.register(Assignment)
