from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('swagger/', TemplateView.as_view(
        template_name='docs/swagger.html',
    ), name='swagger'),
]