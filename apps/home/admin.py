from django.contrib import admin
from .models import Class, Session, Subject, TeacherAllotment

# Register your models here.
admin.site.register(Class)
admin.site.register(Session)
admin.site.register(Subject)
admin.site.register(TeacherAllotment)