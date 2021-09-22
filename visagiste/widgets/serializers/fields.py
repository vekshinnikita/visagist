from rest_framework import serializers


class WidgetSerializerField(serializers.Field):
    def to_representation(self, value):
        return value

    def to_internal_value(self, data):
        return data
