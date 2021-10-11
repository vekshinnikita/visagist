from rest_framework import serializers
from core.serializers import DraggableSerializer
from widgets.models import *


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['widget']
        extra_kwargs = {'widget': {'required': False}} 


class FeatureRetriveSerializer(DraggableSerializer):
    class Meta:
        model = Feature
        fields = ['icon', 'title'] + DraggableSerializer.Meta.fields


class FeatureSerializer(FeatureRetriveSerializer, ChildSerializer):
    class Meta:
        model = Feature
        fields = ChildSerializer.Meta.fields + FeatureRetriveSerializer.Meta.fields
        extra_kwargs = ChildSerializer.Meta.extra_kwargs
    
    def to_representation(self, instance):
        return FeatureRetriveSerializer(instance).data


class CourseLessonRetriveSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField()

    class Meta:
        model = CourseLesson
        fields = ['date', 'id']


class CourseLessonSerializer(CourseLessonRetriveSerializer, ChildSerializer):
    class Meta:
        model = CourseLesson
        fields = ChildSerializer.Meta.fields + CourseLessonRetriveSerializer.Meta.fields
        extra_kwargs = ChildSerializer.Meta.extra_kwargs
    
    def to_representation(self, instance):
        return CourseLessonRetriveSerializer(instance).data


class CourseProgramModuleRetriveSerializer(DraggableSerializer):
    class Meta:
        model = CourseProgramModule
        fields = ['title', 'content'] + DraggableSerializer.Meta.fields


class CourseProgramModuleSerializer(CourseProgramModuleRetriveSerializer, ChildSerializer):
    class Meta:
        model = CourseProgramModule
        fields = ChildSerializer.Meta.fields + CourseProgramModuleRetriveSerializer.Meta.fields
        extra_kwargs = ChildSerializer.Meta.extra_kwargs
    
    def to_representation(self, instance):
        return CourseProgramModuleRetriveSerializer(instance).data
