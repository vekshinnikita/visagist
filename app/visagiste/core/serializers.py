from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from .models import Image, Draggable


class DraggableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draggable
        fields = ['id', 'position']


class ImageSerializer(DraggableSerializer):
    image = Base64ImageField(required=False, allow_null=True, default=None)

    class Meta:
        model = Image
        fields = ['image', 'content_type', 'object_id'] + DraggableSerializer.Meta.fields
        extra_kwargs = {'content_type': {'required': False}, 'object_id': {'required': False}, 'image': {'required': False}} 
