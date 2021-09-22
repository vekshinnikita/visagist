from rest_framework import serializers
from .models import Image, Draggable


class DraggableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draggable
        fields = ['id', 'position']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']
