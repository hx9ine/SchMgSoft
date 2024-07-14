from webbrowser import get
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from apps.users.models import CustomUser

# Create your views here.
# Profile
@login_required(login_url='/')
def profile(request):
    user = CustomUser.objects.get(id=request.user.id)

    context = {
        'user':user
    }

    return render(request, 'profile.html', context)


# Update Profile
@login_required(login_url='/')
def profile_update(request):
    if request.method == "POST":
        profile_pic = request.FILES.get('profile-pic')
        first_name = request.POST.get('fname')
        last_name = request.POST.get('lname')
        city = request.POST.get('city')
        country = request.POST.get('country')

        try:
            customuser = CustomUser.objects.get(id=request.user.id)
            if profile_pic is not None and profile_pic != "":
                customuser.profile_pic = profile_pic
            customuser.first_name = first_name
            customuser.last_name = last_name
            customuser.city = city
            customuser.country = country

            customuser.save()
            messages.success(request, "Your profile has been updated successfully!")
            return redirect('profile')

        except CustomUser.DoesNotExist:
            messages.error(request, "User does not exist.")
        except Exception as e:
            messages.error(request, f"Failed to update your profile: {e}")
    
    return render(request, 'profile.html')