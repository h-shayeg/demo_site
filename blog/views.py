from django.shortcuts import render

def blog_view(request):
    return render(request, 'blog/blog.html')

def blog_single(request):
    context = {
        'title': 'Blog Single',
        'content': 'This is the content of the blog single page.',
    }
    return render(request, 'blog/blog_single.html', context)

def chemist_view(request):
    context = {
        'title': 'A Practical Introduction to Graph Neural Networks for Chemists',
        'content': 'Graph neural networks are a natural fit for molecules. Here\'s the intuition behind message passing, without skipping the math.',
    }
    return render(request, 'blog/chemist.html', context)
# Create your views here.
