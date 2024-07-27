from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from apps.home.models import Session, Class, Subject, TeacherAllotment
from apps.academics.models import Teacher

# Create your views here.
@login_required(login_url='/')
def home(request):
    return render(request, 'home.html')


@login_required(login_url='/')
def add_session(request):
    if request.method == 'POST':
        start_session = request.POST.get("start_session")
        end_session = request.POST.get("end_session")

        session = Session (
            start_session = start_session,
            end_session = end_session
        )
        
        session.save()
        messages.success(request, "Session is created successfully!")
        return redirect('add-session')


    sessions = Session.objects.all()
    context = {
        'sessions': sessions
    }
    return render(request, 'add-session.html', context)



@login_required(login_url='/')
def add_class(request):
    if request.method == 'POST':
        session_id = request.POST.get("session")
        class_name = request.POST.get("add_class")
        
        # Ensure session is fetched from the database
        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            messages.error(request, "Selected session does not exist.")
            return redirect('add-class')
        
        new_class = Class(
            session=session,
            class_name=class_name
        )
        
        new_class.save()
        messages.success(request, f"{new_class.class_name} is added successfully!")
        return redirect('add-class')

    classes = Class.objects.all()
    context = {
        'classes': classes
    }
    return render(request, 'add-class.html', context)



@login_required(login_url='/')
def add_subject(request):
    if request.method == 'POST':
        class_id = request.POST.get("class")
        subject = request.POST.get("subject")

        try:
            class_id = Class.objects.get(id=class_id)
        except Class.DoesNotExist:
            messages.error(request, "Selected class does not exist.")
            return redirect('add-subject')
        
        new_subject = Subject (
            class_id = class_id,
            subject_name = subject
        )

        new_subject.save()
        messages.success(request, f"{new_subject.subject_name} is added successfully!")
        return redirect('add-subject')
    
    subjects = Subject.objects.all()
    classes = Class.objects.all()

    context = {
        'subjects':subjects,
        'classes':classes
    }
    return render(request, 'add-subject.html', context)



@login_required(login_url='/')
def assign_teachers(request):
    if request.method == 'POST':
        session_id = request.POST.get("session")
        class_id = request.POST.get("class")
        subject_id = request.POST.get("subject")
        teacher_id = request.POST.get("teacher")

        try:
            # Fetch related objects
            session = Session.objects.get(id=session_id)
            class_obj = Class.objects.get(id=class_id, session=session)
            subject = Subject.objects.get(id=subject_id, class_id=class_obj)
            teacher = Teacher.objects.get(id=teacher_id)
            
            # Create TeacherAllotment
            new_allotment = TeacherAllotment(
                teacher=teacher,
                subject=subject
            )
            new_allotment.save()
            
            messages.success(request, f"{subject.subject_name} of {class_obj.class_name} is allotted to {teacher.admin.first_name} {teacher.admin.last_name} successfully!")
        except (Session.DoesNotExist, Class.DoesNotExist, Subject.DoesNotExist, Teacher.DoesNotExist) as e:
            messages.error(request, "There was an error assigning the teacher. Please ensure all selections are valid.")
        except Exception as e:
            messages.error(request, f"An unexpected error occurred: {str(e)}")
        return redirect('assign-teachers')

    teachers = Teacher.objects.all()
    subjects = Subject.objects.all()
    sessions = Session.objects.all()
    classes = Class.objects.all()
    teacher_allotments = TeacherAllotment.objects.all()

    context = {
        'teachers': teachers,
        'subjects': subjects,
        'sessions': sessions,
        'classes': classes,
        'teacher_allotments': teacher_allotments
    }
    return render(request, 'assign-teachers.html', context)

