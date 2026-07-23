from django.shortcuts import render

def blog_view(request):
    return render(request, 'blog/blog.html')

def blog_single(request):
    context = {
        'title': 'Blog Single',
        'content': 'This is the content of the blog single page.',
    }
    return render(request, 'blog/blog-single.html', context)

# Create your views here.
