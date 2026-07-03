from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

def index_view(request):
    return HttpResponse("<h1>Welcome to the Home Page!</h1>")

def about_view(request):
    return HttpResponse("<h1>This is the About Page!</h1>")

def contact_view(request):
    return HttpResponse("<h1>This is the Contact Page!</h1>")
