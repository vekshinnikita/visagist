from django.contrib.contenttypes.models import ContentType
from core.serializers import Base64ImageSerializer, DraggableSerializer, Base64ImageField, ImageSerializer
from widgets.models import Widget, TextWidget, ImageWidget, FeaturesWidget, CourseScheduleWidget, CourseImagesWidget, CourseProgramWidget
from .children import *


class WidgetSerializer(DraggableSerializer):
    class Meta:
        model = Widget
        fields = ['is_visible', 'type', 'course'] + DraggableSerializer.Meta.fields


class TextWidgetSerializer(WidgetSerializer):
    class Meta:
        model = TextWidget
        fields = ['content'] + WidgetSerializer.Meta.fields


class Base64ImageWidgetSerializer(WidgetSerializer):
    image = Base64ImageField(represent_in_base64=True)

    class Meta:
        model = ImageWidget
        fields = ['image'] + WidgetSerializer.Meta.fields


class ImageWidgetSerializer(WidgetSerializer):
    class Meta:
        model = ImageWidget
        fields = ['image'] + WidgetSerializer.Meta.fields


class WidgetWithChildrenSerializer(WidgetSerializer):
    children_serializer = ChildSerializer
    children_related_name = None
    children = children_serializer(source=children_related_name, many=True)

    class Meta:
        model = Widget
        fields = ['children'] + WidgetSerializer.Meta.fields
    
    def create(self, validated_data):
        children = validated_data.pop(self.children_related_name)
        widget = self.Meta.model.objects.create(**validated_data)
    
        for c in children:
            serializer = self.children_serializer(data={'widget': widget.id, **c})
            serializer.is_valid(raise_exception=True)
            serializer.save()
        
        return widget


class FeaturesWidgetSerializer(WidgetWithChildrenSerializer):
    children_serializer = FeatureSerializer
    children_related_name = 'features'
    children = children_serializer(source=children_related_name, many=True)

    class Meta:
        model = FeaturesWidget
        fields = WidgetWithChildrenSerializer.Meta.fields


class CourseScheduleWidgetSerializer(WidgetWithChildrenSerializer):
    children_serializer = CourseLessonSerializer
    children_related_name = 'lessons'
    children = children_serializer(source=children_related_name, many=True)

    class Meta:
        model = CourseScheduleWidget
        fields = WidgetWithChildrenSerializer.Meta.fields


class Base64CourseImagesWidgetSerializer(WidgetWithChildrenSerializer):
    children_serializer = Base64ImageSerializer
    children_related_name = 'images'
    children = children_serializer(source=children_related_name, many=True)

    class Meta:
        model = CourseImagesWidget
        fields = WidgetWithChildrenSerializer.Meta.fields

    def create(self, validated_data):
        images = validated_data.pop('images')
        widget = CourseImagesWidget.objects.create(**validated_data)

        for i in images:
            serializer = Base64ImageSerializer(data={
                'content_type': ContentType.objects.get_for_model(widget).id,
                'object_id': widget.id,
                **i
            })
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return widget


class CourseImagesWidgetSerializer(WidgetSerializer):
    children = ImageSerializer(source='images', many=True)

    class Meta:
        model = CourseImagesWidget
        fields = ['children'] + WidgetSerializer.Meta.fields


class CourseProgramWidgetSerializer(WidgetWithChildrenSerializer):
    children_serializer = CourseProgramModuleSerializer
    children_related_name = 'programs'
    children = children_serializer(source=children_related_name, many=True)

    class Meta:
        model = CourseProgramWidget
        fields = WidgetWithChildrenSerializer.Meta.fields
