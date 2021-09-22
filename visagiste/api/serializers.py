from rest_framework import serializers
from widgets.models import Widget
from widgets.utils import get_widget_serializer_by_type, serialize_widget
from widgets.serializers.fields import WidgetSerializerField
from .models import Course


class CourseRetriveSerializer(serializers.ModelSerializer):
    widgets = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'widgets']

    def get_widgets(self, course: Course):
        return [serialize_widget(widget) for widget in Widget.objects.get_course_widgets(course.id)]


class CourseCreateSerializer(serializers.Serializer):
    title = serializers.CharField()
    widgets = WidgetSerializerField()

    def create(self, validated_data):
        course = Course.objects.create(title=validated_data['title'])
        widgets = validated_data['widgets']

        for w in widgets:
            widget_model_serializer = get_widget_serializer_by_type(w['type'])
            serializer: serializers.ModelSerializer = widget_model_serializer(data={'course': course, **w})
            if serializer.is_valid():
                serializer.save()
        
        return course
