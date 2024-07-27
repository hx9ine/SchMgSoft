from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from apps.users.models import CustomUser
from apps.academics.models import Student, Teacher
from apps.management.models import TeacherNotification, StudentNotification, LeaveApplication

# Create your views here.
@login_required(login_url='/')
def notify_teachers(request):
    if request.method == 'POST':
        recipient_ids = request.POST.get('recipient_ids').split(',')
        message = request.POST.get('message')
        message_type = request.POST.get('message_type', 'text')
        file = request.FILES.get('file')
        image = request.FILES.get('image')
        confidential = request.POST.get('confidential') == 'on'

        # Ensure message is not None or empty
        if not message:
            messages.error(request, "Message cannot be empty.")
            return redirect('notify-teachers')  # Redirect back or handle accordingly

        notification = TeacherNotification(
            sender=request.user,
            message=message,
            message_type=message_type,
            file=file,
            image=image,
            confidential=confidential
        )
        notification.save()

        if recipient_ids:
            recipients = Teacher.objects.filter(id__in=recipient_ids)
            notification.recipients.set(recipients)

        messages.success(request, "Notification sent successfully!")
        return redirect('notify-teachers')

    teachers = Teacher.objects.all()
    context = {
        'teachers': teachers
    }
    return render(request, 'notify-teachers.html', context)




@login_required(login_url='/')
def notify_students(request):
    if request.method == 'POST':
        recipient_ids = request.POST.get('recipient_ids').split(',')
        message = request.POST.get('message')
        message_type = request.POST.get('message_type', 'text')
        file = request.FILES.get('file')
        image = request.FILES.get('image')
        confidential = request.POST.get('confidential') == 'on'

        # Ensure message is not None or empty
        if not message:
            # Handle the case where the message is missing
            # For example, you can return an error response or a message to the user
            return redirect('notify-students')  # Redirect back or handle accordingly

        notification = StudentNotification(
            sender=request.user,
            message=message,
            message_type=message_type,
            file=file,
            image=image,
            confidential=confidential
        )
        notification.save()
        messages.success(request, "Notification sent successfully!")

        if recipient_ids:
            recipients = Student.objects.filter(id__in=recipient_ids)
            notification.recipients.set(recipients)

        return redirect('notify-students')
    
    students = Student.objects.all()

    context = {
        'students':students
    }
    return render(request, 'notify-students.html', context)


@login_required(login_url='/')
def teachers_leave_requests(request):
    leave_requests = LeaveApplication.objects.all().order_by('-created_at')

    context = {
        'leave_requests': leave_requests
    }
    return render(request, 'leave-requests.html', context)


@login_required(login_url='/')
def view_teachers_leave_requests(request, id):
    leave_request = LeaveApplication.objects.get(id=id)

    context = {
        'leave_request' : leave_request
    }
    return render(request, 'view-leave-request.html', context)


@login_required(login_url='/')
def update_leave_status(request, id):
    try:
        leave_request = LeaveApplication.objects.get(id=id)
        if leave_request.status == 'Requested':  # Ensure status can only be updated from 'Requested'
            new_status = request.POST.get('status')
            if new_status in ['Declined', 'Approved']:
                leave_request.status = new_status
                leave_request.save()
                return redirect('view-leave-request', id=id)
        return redirect('view-leave-request', id=id)
    except LeaveApplication.DoesNotExist:
        return redirect('view-leave-request', id=id)


# ---------*****---------
# Teacher's Views
@login_required(login_url='/')
def leave_apply(request):
    if request.method == 'POST':
        # Retrieve form fields
        date_from = request.POST.get('from')
        date_to = request.POST.get('to')
        title = request.POST.get('title')
        message = request.POST.get('message')
        message_type = request.POST.get('message_type', 'text')  # Default to 'text' if not provided
        
        # Retrieve file uploads
        file = request.FILES.get('file-input')
        image = request.FILES.get('image-input')

        # Ensure message is not None or empty
        if not message:
            messages.error(request, "Message cannot be empty.")
            return redirect('leave-apply')  # Redirect back or handle accordingly

        application = LeaveApplication(
            applicant_id=request.user,  # Use the current user
            date_from=date_from,
            date_to=date_to,
            title=title,
            file=file,
            image=image,
            message=message,
            message_type=message_type
        )
        application.save()
        messages.success(request, "Leave application applied successfully!")
        return redirect('leave-apply')
        
    # Pass the current user to the template
    # context = {
    #     'user': request.user
    # }
    return render(request, 'leave-apply.html')



@login_required(login_url='/')
def view_notifications(request):
    recipient = request.user.teacher
    notifications = TeacherNotification.objects.filter(recipients=recipient)

    # Create a list of notifications with sender details
    notifications_with_sender = []
    for notification in notifications:
        notifications_with_sender.append({
            'notification': notification,
            'sender': notification.sender
        })

    total_notifications = notifications.count()

    context = {
        'notifications_with_sender': notifications_with_sender,
        'total_notifications': total_notifications,
    }
    return render(request, 'view-notifications.html', context)



def teachers_notify_students(request):
    students = Student.objects.all()

    context = {
        'students':students
    }
    return render(request, 'notify-students.html', context)

# ---------*****---------