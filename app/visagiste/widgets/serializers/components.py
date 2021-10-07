from core.serializers import DraggableSerializer
from widgets.models import *


class OptionRetriveComponentSerializer(DraggableSerializer):
    class Meta:
        model = OptionComponent
        fields = ['icon', 'title'] + DraggableSerializer.Meta.fields


class OptionComponentSerializer(DraggableSerializer):
    class Meta:
        model = OptionComponent
        fields = ['icon', 'title', 'widget'] + DraggableSerializer.Meta.fields
        extra_kwargs = {'widget': {'required': False}} 
    
    def to_representation(self, instance):
        return OptionRetriveComponentSerializer(instance=instance).data


class CourseLessonComponentSerializer(DraggableSerializer):
    class Meta:
        model = CourseLessonComponent
        fields = ['date', 'widget'] + DraggableSerializer.Meta.fields
        extra_kwargs = {'widget': {'required': False}} 


class CourseFormatComponentSerializer(DraggableSerializer):
    class Meta:
        model = CourseFormatComponent
        fields = ['title', 'text', 'price', 'widget'] + DraggableSerializer.Meta.fields
        extra_kwargs = {'widget': {'required': False}} 


class CourseProgramComponentSerializer(DraggableSerializer):
    class Meta:
        model = CourseProgramComponent
        fields = ['title', 'content', 'widget'] + DraggableSerializer.Meta.fields
        extra_kwargs = {'widget': {'required': False}} 
