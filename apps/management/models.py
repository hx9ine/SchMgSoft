from django.db import models
from apps.academics.models import Teacher, Student

# Create your models here.
class TeacherNotification(models.Model):
    MESSAGE_TYPE_CHOICES = [
        ('text', 'Text'),
        ('file', 'File'),
        ('image', 'Image'),
    ]

    recipients = models.ManyToManyField(Teacher)
    message = models.TextField()
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPE_CHOICES, default='text')
    file = models.FileField(upload_to='notifications/files/', null=True, blank=True)
    image = models.ImageField(upload_to='notifications/images/', null=True, blank=True)
    confidential = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification sent on {self.created_at}"
    

class StudentNotification(models.Model):
    MESSAGE_TYPE_CHOICES = [
        ('text', 'Text'),
        ('file', 'File'),
        ('image', 'Image'),
    ]

    recipients = models.ManyToManyField(Student)
    message = models.TextField()
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPE_CHOICES, default='text')
    file = models.FileField(upload_to='notifications/files/', null=True, blank=True)
    image = models.ImageField(upload_to='notifications/images/', null=True, blank=True)
    confidential = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification sent on {self.created_at}"
