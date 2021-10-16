from rest_framework import serializers
from core.serializers import Base64ImageField
from widgets.models import Widget
from widgets.utils import serialize_widget, serialize_admin_widget, clear_course_widgets, create_course_widgets
from widgets.serializers.fields import WidgetField
from .models import Course


class ShortCourseRetriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'is_visible', 'position', 'image']


class CourseRetriveSerializer(ShortCourseRetriveSerializer):
    widgets = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['widgets'] + ShortCourseRetriveSerializer.Meta.fields

    def get_widgets(self, course: Course):
        return [serialize_widget(widget, self.context) for widget in Widget.objects.get_course_widgets(course.id)]


class Base64CourseRetriveSerializer(ShortCourseRetriveSerializer):
    widgets = serializers.SerializerMethodField()
    image = Base64ImageField(represent_in_base64=True)

    class Meta:
        model = Course
        fields = ['widgets'] + ShortCourseRetriveSerializer.Meta.fields

    def get_widgets(self, course: Course):
        return [serialize_admin_widget(widget, self.context) for widget in Widget.objects.get_course_widgets(course.id)]


class CourseCreateSerializer(serializers.ModelSerializer):
    widgets = WidgetField()
    image = Base64ImageField()

    class Meta:
        model = Course
        fields = ['title', 'widgets', 'is_visible', 'position', 'image']
    
    def to_representation(self, instance):
        return Base64CourseRetriveSerializer(instance).data

    def create(self, validated_data):
        course = Course.objects.create(
            title=validated_data['title'], is_visible=validated_data['is_visible'], position=validated_data['position'], image=validated_data['image']
        )
        widgets = validated_data['widgets']
        create_course_widgets(widgets, course.id)
        return course
    
    def update(self, instance: int, validated_data):
        course: Course = Course.objects.get(id=instance)
        
        course.title = validated_data.get('title', course.title)
        course.is_visible = validated_data.get('is_visible', course.is_visible)
        course.image = validated_data.get('image', course.image)
        course.position = validated_data.get('position', course.position)
        course.save()
        
        widgets = validated_data['widgets']

        clear_course_widgets(instance)
        create_course_widgets(widgets, instance)

        return instance
