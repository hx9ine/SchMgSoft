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
    


class Teacher(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    gender = models.CharField(max_length=20)
    dob = models.DateField()
    mobile_number = models.PositiveIntegerField()
    pan_number = models.CharField(max_length=10)
    aadhaar_number = models.PositiveBigIntegerField()
    vill_town = models.CharField(max_length=200)
    post_office = models.CharField(max_length=200)
    police_station = models.CharField(max_length=200)
    district = models.CharField(max_length=200)
    permanent_address = models.CharField(max_length=300)
    state = models.CharField(max_length=200)
    pin = models.PositiveIntegerField()
    tenth_percentage = models.DecimalField(max_digits=4, decimal_places=2)
    twelfth_percentage = models.DecimalField(max_digits=4, decimal_places=2)
    qualification = models.CharField(max_length=500)
    bank_name = models.CharField(max_length=350)
    account_number = models.PositiveIntegerField()
    branch_name = models.CharField(max_length=350)
    ifsc = models.CharField(max_length=100)
    teacher_photo = models.ImageField(upload_to='media/profile_pic')
    cv_resume = models.FileField(upload_to='media/teachers/cv')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.admin.first_name + " " + self.admin.last_name