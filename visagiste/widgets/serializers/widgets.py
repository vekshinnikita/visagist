from core.serializers import ImageSerializer, DraggableSerializer
from ..models import Widget, TextWidget, ImageWidget, OptionsWidget, CourseScheduleWidget, CourseFormatsWidget, CourseImagesWidget, CourseProgramWidget
from .components import OptionComponentSerializer, CourseLessonComponentSerializer, CourseFormatComponentSerializer, CourseProgramComponentSerializer


class WidgetSerializer(DraggableSerializer):
    class Meta:
        model = Widget
        fields = ['is_visible', 'type', 'course'] + DraggableSerializer.Meta.fields


class TextWidgetSerializer(WidgetSerializer):
    class Meta:
        model = TextWidget
        fields = ['content'] + WidgetSerializer.Meta.fields


class ImageWidgetSerializer(WidgetSerializer):
    class Meta:
        model = ImageWidget
        fields = ['image'] + WidgetSerializer.Meta.fields
    

class OptionsWidgetSerializer(WidgetSerializer):
    options = OptionComponentSerializer(many=True)

    class Meta:
        model = OptionsWidget
        fields = ['options'] + WidgetSerializer.Meta.fields
    
    def create(self, validated_data):
        widget = OptionsWidget.objects.create(course=validated_data['course'])
        options = validated_data['options']

        for o in options:
            serializer = OptionComponentSerializer(data={'widget': widget, **o})
            if serializer.is_valid():
                serializer.save()
        
        return widget


class CourseScheduleWidgetSerializer(WidgetSerializer):
    lessons = CourseLessonComponentSerializer(many=True)

    class Meta:
        model = CourseScheduleWidget
        fields = ['lessons'] + WidgetSerializer.Meta.fields


class CourseFormatsWidgetSerializer(WidgetSerializer):
    formats = CourseFormatComponentSerializer(many=True)

    class Meta:
        model = CourseFormatsWidget
        fields = ['formats'] + WidgetSerializer.Meta.fields


class CourseImagesWidgetSerializer(WidgetSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = CourseImagesWidget
        fields = ['images'] + WidgetSerializer.Meta.fields


class CourseProgramWidgetSerializer(WidgetSerializer):
    programs = CourseProgramComponentSerializer(many=True)

    class Meta:
        model = CourseProgramWidget
        fields = ['programs'] + WidgetSerializer.Meta.fields


class SignUpFormWidgetSerializer(WidgetSerializer):
    pass
