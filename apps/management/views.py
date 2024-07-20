from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from apps.academics.models import Student, Teacher
from apps.management.models import TeacherNotification

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
            # Handle the case where the message is missing
            # For example, you can return an error response or a message to the user
            return redirect('notify-teachers')  # Redirect back or handle accordingly

        notification = TeacherNotification(
            message=message,
            message_type=message_type,
            file=file,
            image=image,
            confidential=confidential
        )
        notification.save()
        messages.success(request, "Notification sent successfully!")

        if recipient_ids:
            recipients = Teacher.objects.filter(id__in=recipient_ids)
            notification.recipients.set(recipients)

        return redirect('notify-teachers')

    teachers = Teacher.objects.all()
    context = {
        'teachers': teachers
    }
    return render(request, 'notify.html', context)
