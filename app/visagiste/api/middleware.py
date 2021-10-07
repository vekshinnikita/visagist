from django.http import JsonResponse
from rest_framework import status
from .models import Course


class Proccess500:
    def __init__(self, get_response) -> None:
        self._get_response = get_response
    
    def __call__(self, request):
        return self._get_response(request)
    
    def process_exception(self, request, exception):
        if isinstance(exception, Course.DoesNotExist):
            return JsonResponse({'error': str(exception)}, status=status.HTTP_404_NOT_FOUND)

        return JsonResponse({'error': str(exception)}, status=status.HTTP_400_BAD_REQUEST)
