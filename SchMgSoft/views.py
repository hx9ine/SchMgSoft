from django.shortcuts import render, redirect, HttpResponse
from apps.users.email_backend import EmailBackend
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

# Create your views here.
def base(request):
    return render(request, 'base.html')


def LOGIN(request):
    return render(request, 'login.html')


def logged_in(request):
    if request.method == "POST":
        user = EmailBackend.authenticate(request, username=request.POST.get('email'), password=request.POST.get('password'))

        if user != None:
            login(request, user)
            user_type = user.user_type
            if user_type == '1':
                # return redirect('admin_home')
                return redirect('home')
            elif user_type == '2':
                # return redirect('teacher_home')
                return HttpResponse("This is Teacher's Dashboard")
            elif user_type == '3':
                # return redirect('student_home')
                return HttpResponse("This is Student's Dashboard")
            else:
                # Error message
                messages.error(request, "The email or password you've entered may be incorrect. Please try again!")
                return redirect('login')
        else:
            # Error message
            messages.error(request, "The email or password you've entered may be incorrect. Please try again!")
            return redirect('login')
        

def LOGOUT(request):
    logout(request)
    return redirect('login')