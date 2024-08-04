from collections import defaultdict
from datetime import datetime
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from apps.academics.models import Student, Teacher, TeacherAttendance, Assignment
from apps.home.models import Class, Session, TeacherAllotment
from apps.users.models import CustomUser

# Create your views here.
@login_required(login_url='/')
def students(request):
    classes = Class.objects.all()
    sessions = Session.objects.all()

    if request.method == 'POST':
        first_name = request.POST.get("fname")
        last_name = request.POST.get("lname")
        father_name = request.POST.get("fathername")
        mother_name = request.POST.get("mothername")
        email = request.POST.get("student-email")
        username = request.POST.get("username")
        password = request.POST.get("password")
        gender = request.POST.get("gender")
        dob = request.POST.get("dob")
        mobile_number = request.POST.get("mobilenumber")
        vill_town = request.POST.get("vill-town")
        post_office = request.POST.get("post-office")
        police_station = request.POST.get("police-station")
        district = request.POST.get("district")
        permanent_address = request.POST.get("p-address")
        state = request.POST.get("state")
        pin = request.POST.get("pin-code")
        session_id = request.POST.get("session")
        class_id = request.POST.get("class-admitted")
        student_photo = request.FILES.get("photo")
        dob_certificate = request.FILES.get("certificate")

        if CustomUser.objects.filter(email=email).exists() or CustomUser.objects.filter(username=username).exists():
            messages.warning(request, "Student with this email or username already registered!")
            return redirect('students')

        try:
            user = CustomUser(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                profile_pic=student_photo,
                user_type=3
            )
            user.set_password(password)
            user.save()

            class_admitted = Class.objects.get(id=class_id)
            session = Session.objects.get(id=session_id)

            student = Student(
                admin=user,
                father_name=father_name,
                mother_name=mother_name,
                gender=gender,
                dob=dob,
                mobile_no=mobile_number,
                vill_town=vill_town,
                post_office=post_office,
                police_station=police_station,
                district=district,
                permanent_address=permanent_address,
                state=state,
                pin=pin,
                session_id=session,
                class_id=class_admitted,
                dob_certificate=dob_certificate
            )
            student.save()
            messages.success(request, f"{user.first_name} {user.last_name} has been successfully registered!")
        except Exception as e:
            messages.error(request, "An error occurred while registering the student: " + str(e))
        
        return redirect('students')

    students = Student.objects.all()
    student_count = Student.objects.count()

    context = {
        'classes': classes,
        'sessions': sessions,
        'students': students,
        'student_count': student_count
    }

    return render(request, 'students.html', context)


@login_required(login_url='/')
def teachers(request):
    if request.method == "POST":
        first_name = request.POST.get("fname")
        last_name = request.POST.get("lname")
        email = request.POST.get("teacher-email")
        username = request.POST.get("username")
        password = request.POST.get("password")
        gender = request.POST.get("gender")
        dob = request.POST.get("dob")
        mobile_number = request.POST.get("mobilenumber")
        pan_number = request.POST.get("pan-number")
        aadhaar_number = request.POST.get("aadhaar-number")
        vill_town = request.POST.get("vill-town")
        post_office = request.POST.get("post-office")
        police_station = request.POST.get("police-station")
        district = request.POST.get("district")
        permanent_address = request.POST.get("p-address")
        state = request.POST.get("state")
        pin = request.POST.get("pin-code")
        tenth_percentage = request.POST.get("tenth-pc")
        twelfth_percentage = request.POST.get("twelfth-pc")
        qualification = request.POST.get("qualification")
        bank_name = request.POST.get("bank-name")
        account_number = request.POST.get("account-number")
        branch_name = request.POST.get("branch-name")
        ifsc = request.POST.get("ifsc")
        teacher_photo = request.FILES.get("photo")
        cv_resume = request.FILES.get("cv-resume")

        if CustomUser.objects.filter(email=email).exists() or CustomUser.objects.filter(username=username).exists():
            messages.warning(request, "Teacher with this email or username already registered!")
            return redirect('teachers')

        try:
            user = CustomUser(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                profile_pic=teacher_photo,
                user_type=2
            )
            user.set_password(password)
            user.save()

            teacher = Teacher(
                admin=user,
                gender=gender,
                dob=dob,
                mobile_number=mobile_number,
                pan_number=pan_number,
                aadhaar_number=aadhaar_number,
                vill_town=vill_town,
                post_office=post_office,
                police_station=police_station,
                district=district,
                permanent_address=permanent_address,
                state=state,
                pin=pin,
                tenth_percentage=tenth_percentage,
                twelfth_percentage=twelfth_percentage,
                qualification=qualification,
                bank_name=bank_name,
                account_number=account_number,
                branch_name=branch_name,
                ifsc=ifsc,
                cv_resume=cv_resume
            )
            teacher.save()
            messages.success(request, f"{user.first_name} {user.last_name} has been successfully registered!")
        except Exception as e:
            messages.error(request, "An error occurred while registering the teacher: " + str(e))
        
        return redirect('teachers')
    
    teachers = Teacher.objects.all()
    teacher_count = Teacher.objects.count()

    context = {
        'teachers': teachers,
        'teacher_count': teacher_count
    }
    return render(request, 'teachers.html', context)



@login_required(login_url='/')
def attendance(request):
    teachers = Teacher.objects.all()

    context = {
        'teachers' : teachers
    }
    return render(request, 'update-attendance.html', context)


@login_required(login_url='/')
def teacher_attendance_update(request):
    teachers = Teacher.objects.all()

    if request.method == 'POST':
        date_str = request.POST.get("selected-date")
        selected_date = datetime.strptime(date_str, "%d-%m-%Y").date()
        teacher_ids = request.POST.getlist("teacher_id[]")

        for i, teacher_id in enumerate(teacher_ids):
            teacher = Teacher.objects.get(id=teacher_id)
            attendance_status = request.POST.get(f"attendance{i+1}")

            # Create or update the attendance record
            TeacherAttendance.objects.update_or_create(
                teacher=teacher,
                date=selected_date,
                defaults={'attendance_type': attendance_status}
            )

        messages.success(request, f"Attendances for { selected_date } saved successfully!")
        return redirect('attendance')

    context = {
        'teachers': teachers
    }
    return render(request, 'update-attendance.html', context)



@login_required(login_url='/')
def teacher_attendance_view(request):
    current_date = datetime.now()
    month = request.GET.get('month', current_date.month)
    year = request.GET.get('year', current_date.year)

    # Convert month and year to integers
    try:
        month = int(month)
        year = int(year)
    except ValueError:
        month = current_date.month
        year = current_date.year

    # Filter attendances by the selected month and year
    attendances = TeacherAttendance.objects.filter(date__month=month, date__year=year)

    # Define the months list
    months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    # Aggregating attendance data
    attendance_summary = defaultdict(lambda: {'total_days': 0, 'present_days': 0, 'absent_days': 0, 'paid_leave_days': 0})

    for attendance in attendances:
        teacher_id = attendance.teacher.id
        attendance_summary[teacher_id]['teacher'] = attendance.teacher
        attendance_summary[teacher_id]['total_days'] += 1

        if attendance.attendance_type == 'PRESENT':
            attendance_summary[teacher_id]['present_days'] += 1
        elif attendance.attendance_type == 'ABSENT':
            attendance_summary[teacher_id]['absent_days'] += 1
        elif attendance.attendance_type == 'PAID LEAVE':
            attendance_summary[teacher_id]['paid_leave_days'] += 1

    context = {
        'attendance_summary': attendance_summary.values(),
        'selected_month': month,
        'selected_year': year,
        'months': list(enumerate(months, 1)),  # List of tuples (index, month name) for the template
        'years': range(2000, current_date.year + 1),  # Year range for the template
    }
    return render(request, 'view-attendance.html', context)


# ----------------
# Teacher's Views
def assignments(request):
    user = request.user
    teacher = Teacher.objects.get(admin=user)
    teacher_allotments = TeacherAllotment.objects.filter(teacher=teacher)

    sessions = list({allotment.subject.class_id.session for allotment in teacher_allotments})
    classes = list({allotment.subject.class_id for allotment in teacher_allotments})
    subjects = list({allotment.subject for allotment in teacher_allotments})

    assignments = Assignment.objects.filter(teacher_id__in=teacher_allotments)

    context = {
        'teacher_allotments': teacher_allotments,
        'sessions': sessions,
        'classes': classes,
        'subjects': subjects,
        'assignments': assignments
    }
    return render(request, 'assignments.html', context)






def add_assignment(request):
    if request.method == 'POST':
        session_id = request.POST.get('session')
        class_id = request.POST.get('class')
        subject_id = request.POST.get('subject')
        deadline = request.POST.get('deadline') == 'on'
        deadline_date = request.POST.get('deadline-date')
        deadline_time = request.POST.get('deadline-time')

        try:
            teacher = Teacher.objects.get(admin=request.user)
            teacher_allotment = TeacherAllotment.objects.get(
                teacher=teacher,
                subject_id=subject_id
            )

            assignment = Assignment(
                teacher_id=teacher_allotment,
                deadline=deadline
            )

            if deadline:
                deadline_date_time = f"{deadline_date} {deadline_time}"
                assignment.deadline_date_time = deadline_date_time

            assignment.save()
            messages.success(request, "Assignment added successfully!")
            return redirect('assignments')

        except Teacher.DoesNotExist:
            messages.error(request, "You are not assigned as a teacher.")
            return redirect('assignments')

        except TeacherAllotment.DoesNotExist:
            messages.error(request, "You are not allotted to this subject.")
            return redirect('assignments')

    return render(request, 'add-assignment-form.html')


# ----------------