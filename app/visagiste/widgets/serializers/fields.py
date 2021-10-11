from rest_framework import serializers

class WidgetField(serializers.Field):
    def to_representation(self, value):
        return value

    def to_internal_value(self, data):
        return data
