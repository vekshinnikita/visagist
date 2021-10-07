from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer
from api.models import Course
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


def get_widget_serializer_by_type(widget_type: str) -> widgets_serializers.TextWidgetSerializer:
    return WIDGET_SERIALIZERS[widget_type]


def serialize_widget(widget: Widget, context={}):
    return get_widget_serializer_by_type(widget.type)(widget, context=context).data


def clear_course_widgets(course: Course) -> None:
    widgets: list[Widget] = Widget.objects.filter(course=course)

    for w in widgets:
        w.delete()


def create_course_widgets(validated_data: list[dict], course_id: int) -> None:
    for w in validated_data:
        widget_type = w['type']
        
        if widget_type not in WIDGET_SERIALIZERS:
            raise ValidationError(f"Non-existent widget type: {widget_type}")

        widget_model_serializer: ModelSerializer = get_widget_serializer_by_type(w['type'])
        serializer = widget_model_serializer(data={'course': course_id, **w})
        serializer.is_valid(raise_exception=True)
        serializer.save()
