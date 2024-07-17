from django.db import models
from apps.users.models import CustomUser
from apps.home.models import *

# Create your models here.
class Student(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    father_name = models.CharField(max_length=200)
    mother_name = models.CharField(max_length=200)
    gender = models.CharField(max_length=20)
    dob = models.DateField()
    mobile_no = models.PositiveIntegerField()
    vill_town = models.CharField(max_length=200)
    post_office = models.CharField(max_length=200)
    police_station = models.CharField(max_length=200)
    district = models.CharField(max_length=200)
    permanent_address = models.CharField(max_length=300)
    state = models.CharField(max_length=200)
    pin = models.PositiveIntegerField()
    session_id = models.ForeignKey(Session, on_delete=models.DO_NOTHING)
    class_id = models.ForeignKey(Class, on_delete=models.DO_NOTHING)
    student_photo = models.ImageField(upload_to='media/profile_pic')
    dob_certificate = models.FileField(upload_to='media/students/certificates')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.admin.first_name + " " + self.admin.last_name