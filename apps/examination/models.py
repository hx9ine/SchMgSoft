from django.db import models
from apps.home.models import Session
from apps.academics.models import Student

# Create your models here.
class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    marksheet = models.FileField(upload_to='marksheets/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Marksheet for {self.student.admin.first_name} {self.student.admin.last_name} ({self.session.start_session} - {self.session.end_session})"