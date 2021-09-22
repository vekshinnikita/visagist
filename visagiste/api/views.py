from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Course
from .serializers import CourseRetriveSerializer, CourseCreateSerializer


class CourseViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    serializer_class = CourseRetriveSerializer
    queryset = Course.objects.all()

    def create(self, request):
        serializer = CourseCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
