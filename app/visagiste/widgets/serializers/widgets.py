from django.contrib.contenttypes.models import ContentType
from drf_extra_fields.fields import Base64ImageField
from core.serializers import ImageSerializer, DraggableSerializer
from widgets.models import Widget, TextWidget, ImageWidget, OptionsWidget, CourseScheduleWidget, CourseFormatsWidget, CourseImagesWidget, CourseProgramWidget
from .components import OptionComponentSerializer, CourseLessonComponentSerializer, CourseFormatComponentSerializer, CourseProgramComponentSerializer
from .fields import ImagesField


class WidgetSerializer(DraggableSerializer):
    class Meta:
        model = Widget
        fields = ['is_visible', 'type', 'course'] + DraggableSerializer.Meta.fields


class TextWidgetSerializer(WidgetSerializer):
    class Meta:
        model = TextWidget
        fields = ['content'] + WidgetSerializer.Meta.fields


class ImageWidgetSerializer(WidgetSerializer):
    image = Base64ImageField(represent_in_base64=True)

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
            serializer = OptionComponentSerializer(data={'widget': widget.id, **o})
            serializer.is_valid(raise_exception=True)
            serializer.save()
        
        return widget


class CourseScheduleWidgetSerializer(WidgetSerializer):
    lessons = CourseLessonComponentSerializer(many=True)

    class Meta:
        model = CourseScheduleWidget
        fields = ['lessons'] + WidgetSerializer.Meta.fields
    
    def create(self, validated_data):
        widget = CourseScheduleWidget.objects.create(course=validated_data['course'])
        lessons = validated_data['lessons']

        for l in lessons:
            serializer = CourseLessonComponentSerializer(data={'widget': widget.id, **l})
            serializer.is_valid(raise_exception=True)
            serializer.save()


class CourseFormatsWidgetSerializer(WidgetSerializer):
    formats = CourseFormatComponentSerializer(many=True)

    class Meta:
        model = CourseFormatsWidget
        fields = ['formats'] + WidgetSerializer.Meta.fields
    
    def create(self, validated_data):
        widget = CourseFormatsWidget.objects.create(course=validated_data['course'])
        formats = validated_data['formats']

        for f in formats:
            serializer = CourseFormatComponentSerializer(data={'widget': widget.id, **f})
            serializer.is_valid(raise_exception=True)
            serializer.save()
        
        return widget


class CourseImagesWidgetSerializer(WidgetSerializer):
    images = ImagesField()

    class Meta:
        model = CourseImagesWidget
        fields = ['images'] + WidgetSerializer.Meta.fields
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['images'].context.update(self.context)

    def create(self, validated_data):
        widget = CourseImagesWidget.objects.create(course=validated_data['course'])
        images = validated_data['images']

        for i in images:
            serializer = ImageSerializer(data={
                'content_type': ContentType.objects.get_for_model(widget).id,
                'object_id': widget.id,
                **i
            })
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return widget


class CourseProgramWidgetSerializer(WidgetSerializer):
    programs = CourseProgramComponentSerializer(many=True)

    class Meta:
        model = CourseProgramWidget
        fields = ['programs'] + WidgetSerializer.Meta.fields
    
    def create(self, validated_data):
        widget = CourseProgramWidget.objects.create(course=validated_data['course'])
        programs = validated_data['programs']

        for p in programs:
            serializer = CourseProgramWidgetSerializer(data={'widget': widget.id, **p})
            serializer.is_valid(raise_exception=True)
            serializer.save()
    
        return widget


class SignUpFormWidgetSerializer(WidgetSerializer):
    pass
