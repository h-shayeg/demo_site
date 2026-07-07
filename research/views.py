from django.shortcuts import render

def research_view(request):
    return render(request, 'research/research.html')

def research_single(request):
    return render(request, 'research/research_single.html')

# Create your views here.
