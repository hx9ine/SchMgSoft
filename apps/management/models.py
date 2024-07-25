from django.db import models
from django.conf import settings
from apps.academics.models import Teacher, Student
from apps.home.models import Session

# Create your models here.
class TeacherNotification(models.Model):
    MESSAGE_TYPE_CHOICES = [
        ('text', 'Text'),
        ('file', 'File'),
        ('image', 'Image'),
    ]

    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
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

    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    recipients = models.ManyToManyField(Student)
    message = models.TextField()
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPE_CHOICES, default='text')
    file = models.FileField(upload_to='notifications/files/', null=True, blank=True)
    image = models.ImageField(upload_to='notifications/images/', null=True, blank=True)
    confidential = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification sent on {self.created_at}"



class LeaveApplication(models.Model):
    MESSAGE_TYPE_CHOICES = [
        ('text', 'Text'),
        ('file', 'File'),
        ('image', 'Image'),
    ]

    STATUS_CHOICES = [
        ('Declined', 'Declined'),
        ('Approved', 'Approved'),
        ('Requested', 'Requested'),
    ]

    applicant_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_from = models.DateField()
    date_to = models.DateField()
    title = models.CharField(max_length=500)
    file = models.FileField(upload_to='leave_applications/files/', null=True, blank=True)
    image = models.ImageField(upload_to='leave_applications/images/', null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPE_CHOICES, default='text')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Requested')
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def duration(self):
        return (self.date_to - self.date_from).days

    def __str__(self):
        return f"Leave applied by {self.applicant_id.first_name} {self.applicant_id.last_name} on {self.created_at}"