from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Course
from .serializers import CourseRetriveSerializer, CourseCreateSerializer, ShortCourseRetriveSerializer


class AdminCourseViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    serializer_class = ShortCourseRetriveSerializer
    queryset = Course.objects.all()
    
    def retrieve(self, request, pk):
        instance = self.get_object()
        serializer = CourseRetriveSerializer(instance, context={"request": request})
        return Response(serializer.data)

    def create(self, request):
        serializer = CourseCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, pk):
        course = Course.objects.get(id=pk)
        serializer = CourseCreateSerializer(data=request.data, instance=course.id)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def hide_courses(request):
    courses_ids = request.data['ids']
    for i in courses_ids:
        c: Course = Course.objects.get(id=i)
        c.is_visible = False
        c.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def reveal_courses(request):
    courses_ids: list[int] = request.data['ids']
    for i in courses_ids:
        c: Course = Course.objects.get(id=i)
        c.is_visible = True
        c.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def delete_courses(request):
    courses_ids = request.data['ids']
    for i in courses_ids:
        course = Course.objects.get(id=i)
        course.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
