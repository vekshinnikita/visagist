from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'courses', views.AdminCourseViewSet, basename='courses')

urlpatterns = [
    path('courses/hide/', views.hide_courses, name='hide_courses'),
    path('courses/reveal/', views.reveal_courses, name='reveal_courses'),
    path('courses/delete/', views.delete_courses, name='delete_courses'),
    path('', include(router.urls)),
]
