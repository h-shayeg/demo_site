from django.urls import path
from website.views import index_view, about_view, contact_view


urlpatterns = [
    path('', index_view, name='home'),
    path('about/', about_view, name='about'),
    path('contact/', contact_view, name='contact'),
]