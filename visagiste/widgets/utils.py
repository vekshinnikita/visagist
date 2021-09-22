from rest_framework.serializers import ModelSerializer
from .models import WidgetTypes, Widget
from .serializers import widgets as widgets_serializers



WIDGET_SERIALIZERS = {
    WidgetTypes.BASE_WIDGET.value: widgets_serializers.WidgetSerializer,
    WidgetTypes.TEXT_WIDGET.value: widgets_serializers.TextWidgetSerializer,
    WidgetTypes.IMAGE_WIDGET.value: widgets_serializers.ImageWidgetSerializer,
    WidgetTypes.OPTIONS_WIDGET.value: widgets_serializers.OptionsWidgetSerializer,
    WidgetTypes.SIGN_UP_FORM_WIDGET.value: widgets_serializers.SignUpFormWidgetSerializer,
    WidgetTypes.COURSE_SCHEDULE_WIDGET.value: widgets_serializers.CourseScheduleWidgetSerializer,
    WidgetTypes.COURSE_FORMATS_WIDGET.value: widgets_serializers.CourseFormatsWidgetSerializer,
    WidgetTypes.COURSE_IMAGES_WIDGET.value: widgets_serializers.CourseImagesWidgetSerializer,
    WidgetTypes.COURSE_PROGRAM_WIDGET.value: widgets_serializers.CourseProgramWidgetSerializer
}

def get_widget_serializer_by_type(widget_type: str) -> ModelSerializer:
    return WIDGET_SERIALIZERS[widget_type]

def serialize_widget(widget: Widget):
    return get_widget_serializer_by_type(widget.type)(widget).data
