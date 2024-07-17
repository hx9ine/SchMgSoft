from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from apps.home.models import Session, Class, Subject

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