import base64
from django.core.files.base import ContentFile
from rest_framework import serializers
from drf_extra_fields.fields import Base64FieldMixin, Base64ImageField
from .models import Image, Draggable


class Base64ImageField(Base64ImageField):
    def to_representation(self, file):
        if self.represent_in_base64:
            if not file:
                return ''

            try:
                with open(file.path, 'rb') as f:
                    return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode()
            except Exception:
                raise IOError("Error encoding file")
        else:
            return super(Base64FieldMixin, self).to_representation(file)

    def to_internal_value(self, base64_data):
        if isinstance(base64_data, ContentFile):
            return super(Base64FieldMixin, self).to_internal_value(base64_data)
        return super().to_internal_value(base64_data)


class DraggableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draggable
        fields = ['id', 'position']


class Base64ImageRetriveSerializer(DraggableSerializer):
    image = Base64ImageField(required=False, allow_null=True, default=None, represent_in_base64=True)

    class Meta:
        model = Image
        fields = ['image'] + DraggableSerializer.Meta.fields


class Base64ImageSerializer(Base64ImageRetriveSerializer):
    class Meta:
        model = Image
        fields = ['content_type', 'object_id'] + Base64ImageRetriveSerializer.Meta.fields
        extra_kwargs = {'content_type': {'required': False}, 'object_id': {'required': False}, 'image': {'required': False}}
    
    def to_representation(self, instance):
        return Base64ImageRetriveSerializer(instance).data


class ImageSerializer(DraggableSerializer):
    class Meta:
        model = Image
        fields = ['image'] + DraggableSerializer.Meta.fields
