from django.urls import path
from project.views import *

app_name = 'project'

urlpatterns = [
    path('', project_view, name='project_index'),
    path('project-single/', project_single, name='project_single'),
    
]