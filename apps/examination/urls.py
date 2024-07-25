from django.urls import path
from . import views

urlpatterns = [
    path('results/', views.results, name='results'),
    path('results/upload-marksheets/', views.upload_marksheets, name='upload-marksheets'),
    path('results/upload-marksheets/<int:session_id>/<int:class_id>/', views.upload_students_marksheets, name='upload-students-marksheets'),
]
