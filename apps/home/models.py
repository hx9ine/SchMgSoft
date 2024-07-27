from django.db import models

# Create your models here.
class Session(models.Model):
    start_session = models.CharField(max_length=100)
    end_session = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.start_session} - {self.end_session}'


class Class(models.Model):
    session = models.ForeignKey(Session, on_delete=models.PROTECT)
    class_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.class_name


class Subject(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.PROTECT)
    subject_name = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.class_id.class_name} - {self.subject_name}'


class TeacherAllotment(models.Model):
    teacher = models.ForeignKey('academics.Teacher', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.teacher.admin.first_name} {self.teacher.admin.last_name} - {self.subject.class_id.class_name}, {self.subject.subject_name}, {self.subject.class_id.session.start_session} - {self.subject.class_id.session.end_session}'
