from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'courses', views.CourseViewSet, basename='courses')
router.register(r'admin/courses', views.AdminCourseViewSet, basename='courses_admin')
router.register(r'admin/reviews', views.AdminReviewViewSet, basename='reviews_admin')

urlpatterns = [
    path('admin/courses/hide/', views.hide_courses, name='hide_courses'),
    path('admin/courses/reveal/', views.reveal_courses, name='reveal_courses'),
    path('admin/courses/delete/', views.delete_courses, name='delete_courses'),

    path('', include(router.urls)),
]
