from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from django.http import JsonResponse
from .models import WeddingInaquiry

def index(value):
    if value.method == 'POST':
        name = value.POST.get('client-name')
        email = value.POST.get('email')
        phone = value.POST.get('phone')  # <-- GET PHONE NUMBER
        wedding_date = value.POST.get('wedding-date')
        message = value.POST.get('message')

        # Fix blank date edge case
        if wedding_date == "":
            wedding_date = None

        #save data to database
        inquiry = WeddingInaquiry(
            name=name,
            email=email,
            phone=phone,
            wedding_date=wedding_date,
            message=message
        )
        inquiry.save()

        # Send JSON success response to JaveScript
        return JsonResponse({'status': 'success'})
    
    return render(value, 'index.html')
