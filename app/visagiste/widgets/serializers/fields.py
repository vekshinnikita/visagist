from rest_framework import serializers
from core.serializers import ImageSerializer


class SkipIsValidField(serializers.Field):
    def to_representation(self, value):
        return value

    def to_internal_value(self, data):
        return data


class WidgetField(SkipIsValidField):
    pass


class ImagesField(SkipIsValidField):
    def to_representation(self, value):
        return ImageSerializer(value, many=True, context=self.context).data
    
    def to_internal_value(self, data):
        return super().to_internal_value(data)
