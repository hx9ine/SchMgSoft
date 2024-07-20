# Generated by Django 5.0.7 on 2024-07-20 07:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academics', '0004_teacher_attendance'),
    ]

    operations = [
        migrations.CreateModel(
            name='TeacherAttendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('attendance_type', models.CharField(choices=[('PRESENT', 'Present'), ('ABSENT', 'Absent'), ('PAID LEAVE', 'Paid Leave'), ('HOLIDAY', 'Holiday')], max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='academics.teacher')),
            ],
            options={
                'unique_together': {('teacher', 'date')},
            },
        ),
        migrations.DeleteModel(
            name='Teacher_Attendance',
        ),
    ]