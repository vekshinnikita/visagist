from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from . import views

router = DefaultRouter()

router.register(r'courses', views.CourseViewSet, basename='courses')
router.register(r'admin/courses', views.AdminCourseViewSet, basename='courses_admin')
router.register(r'admin/reviews', views.AdminReviewViewSet, basename='reviews_admin')
router.register(r'admin/students_work', views.AdminStudentWorkViewSet, basename='student_work_admin')

urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('admin/courses/hide/', views.hide_courses, name='hide_courses'),
    path('admin/courses/reveal/', views.reveal_courses, name='reveal_courses'),
    path('admin/courses/delete/', views.delete_courses, name='delete_courses'),

    path('', include(router.urls)),
]
