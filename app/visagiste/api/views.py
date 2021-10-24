from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes

from core.views import DraggableImageViewSet
from .models import Course, Review, StudentWork
from .serializers import Base64StudentWorkSerializer, CourseRetriveSerializer, CourseCreateSerializer, ShortCourseRetriveSerializer, Base64CourseRetriveSerializer, Base64ReviewSerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = ShortCourseRetriveSerializer

    def retrieve(self, request, pk):
        instance = self.get_object()
        serializer = CourseRetriveSerializer(instance, context={"request": request})        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), context={"request": request}, many=True)        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        return super().get_queryset().filter(is_visible=True)


class AdminCourseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShortCourseRetriveSerializer
    queryset = Course.objects.all()
    
    def retrieve(self, request, pk):
        instance = self.get_object()
        serializer = Base64CourseRetriveSerializer(instance, context={"request": request})
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


@authentication_classes([permissions.IsAuthenticated])
@api_view(['POST'])
def hide_courses(request):
    courses_ids = request.data['ids']
    for i in courses_ids:
        c: Course = Course.objects.get(id=i)
        c.is_visible = False
        c.save()
    return Response(status=status.HTTP_200_OK)


@authentication_classes([permissions.IsAuthenticated])
@api_view(['POST'])
def reveal_courses(request):
    courses_ids: list[int] = request.data['ids']
    for i in courses_ids:
        c: Course = Course.objects.get(id=i)
        c.is_visible = True
        c.save()
    return Response(status=status.HTTP_200_OK)


@authentication_classes([permissions.IsAuthenticated])
@api_view(['POST'])
def delete_courses(request):
    courses_ids = request.data['ids']
    for i in courses_ids:
        course = Course.objects.get(id=i)
        course.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


class AdminReviewViewSet(DraggableImageViewSet):
    permission_classes = []
    serializer_class = Base64ReviewSerializer
    queryset = Review.objects.all()
    model = Review


class AdminStudentWorkViewSet(DraggableImageViewSet):
    permission_classes = []
    serializer_class = Base64StudentWorkSerializer
    queryset = StudentWork.objects.all()
    model = StudentWork
