from django.shortcuts import render

def project_view(request):
    return render(request, 'projects/project.html')

def project_single(request):
    return render(request, 'projects/project_single.html')

# Create your views here.
