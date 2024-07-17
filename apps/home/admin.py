from django.contrib import admin
from .models import Class, Session, Subject

# Register your models here.
admin.site.register(Class)
admin.site.register(Session)
admin.site.register(Subject)