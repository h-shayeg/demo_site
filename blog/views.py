from django.shortcuts import render

def blog_view(request):
    return render(request, 'blog/blog.html')

def blog_single(request):
    return render(request, 'blog/blog_single.html')
# Create your views here.
