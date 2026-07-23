from django.shortcuts import render

def project_view(request):
    return render(request, 'projects/projects.html')

def project_single(request):
    return render(request, 'projects/project-single.html')

# Create your views here.
