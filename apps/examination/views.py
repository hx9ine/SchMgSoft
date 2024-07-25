from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from apps.academics.models import Student
from apps.home.models import Class, Session
from apps.examination.models import Result

# Create your views here.
def results(request):
    students = Student.objects.all()
    classes = Class.objects.all()
    sessions = Session.objects.all()

    context = {
        'students': students,
        'classes': classes,
        'sessions': sessions
    }
    return render(request, 'results.html', context)


def upload_marksheets(request):
    students = Student.objects.all()
    sessions = Session.objects.all()
    classes = Class.objects.all()

    context = {
        'students': students,
        'sessions': sessions,
        'classes': classes
    }
    return render(request, 'upload-marksheets.html', context)


def upload_students_marksheets(request, session_id, class_id):
    if request.method == 'POST':
        session = get_object_or_404(Session, id=session_id)
        class_obj = get_object_or_404(Class, id=class_id)

        for student in Student.objects.filter(class_id=class_obj, session_id=session):
            marksheet_file = request.FILES.get(f'marksheet_{student.id}')
            if marksheet_file:
                result = Result(student=student, session=session, marksheet=marksheet_file)
                result.save()
        
        messages.success(request, 'Marksheets uploaded successfully!')
        return redirect('upload-marksheets')

    students = Student.objects.filter(class_id=class_id, session_id=session_id)
    sessions = Session.objects.all()
    classes = Class.objects.all()

    context = {
        'students': students,
        'sessions': sessions,
        'classes': classes
    }
    return render(request, 'upload-marksheets.html', context)
