from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes

from .utils import update_reviews_sequence
from .models import Course, Review
from .serializers import CourseRetriveSerializer, CourseCreateSerializer, ShortCourseRetriveSerializer, Base64CourseRetriveSerializer, Base64ReviewSerializer


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


class AdminReviewViewSet(viewsets.ModelViewSet):
    permission_classes = []
    serializer_class = Base64ReviewSerializer
    queryset = Review.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = Base64ReviewSerializer(data={'image': request.data['image']})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        reviews_qty = Review.objects.all().count()
        update_reviews_sequence(serializer.data['id'], reviews_qty, 0)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        old_review: Review = self.get_object()
        old_position = old_review.position
        serializer = Base64ReviewSerializer(old_review, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if request.data["position"] != old_position:
            update_reviews_sequence(request.data['id'], old_position, request.data['position'])
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    
    def destroy(self, request, *args, **kwargs):
        review_to_delete: Review = self.get_object()
        reviews_qty = Review.objects.all().count()
        update_reviews_sequence(review_to_delete.id, review_to_delete.position, reviews_qty)
        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
