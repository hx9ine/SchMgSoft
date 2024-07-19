from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from apps.academics.models import Student, Teacher
from apps.home.models import Class, Session
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
def take_attendance(request):
    return render(request, 'take-attendance.html')