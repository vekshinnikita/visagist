from rest_framework import serializers
from core.serializers import DraggableSerializer
from ..models import OptionComponent, CourseLessonComponent, CourseFormatComponent, CourseProgramComponent


class OptionComponentSerializer(DraggableSerializer):
    class Meta:
        model = OptionComponent
        fields = ['icon', 'title'] + DraggableSerializer.Meta.fields


class CourseLessonComponentSerializer(DraggableSerializer):
    date = serializers.DateTimeField()

    class Meta:
        model = CourseLessonComponent
        fields = ['date'] + DraggableSerializer.Meta.fields


class CourseFormatComponentSerializer(DraggableSerializer):
    class Meta:
        model = CourseFormatComponent
        fields = ['title', 'text', 'price'] + DraggableSerializer.Meta.fields


class CourseProgramComponentSerializer(DraggableSerializer):
    class Meta:
        model = CourseProgramComponent
        fields = ['title', 'content'] + DraggableSerializer.Meta.fields
