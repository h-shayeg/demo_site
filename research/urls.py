from django.urls import path
from research.views import *

app_name = 'research'

urlpatterns = [
    path('', research_view, name='research_index'),
    path('single', research_single, name='research_single'),
]