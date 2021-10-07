from functools import reduce
from enum import Enum
from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from ckeditor.fields import RichTextField
from core.models import Draggable, Image

OPTION_ICONS = [
    ('CM', 'CHECK_MARK')
]


class WidgetTypes(Enum):
    BASE_WIDGET = 'BASE_WIDGET'
    TEXT_WIDGET = 'TEXT_WIDGET'
    IMAGE_WIDGET = 'IMAGE_WIDGET'
    COURSE_SCHEDULE_WIDGET = 'COURSE_SCHEDULE_WIDGET'
    OPTIONS_WIDGET = 'OPTIONS_WIDGET'
    COURSE_FORMATS_WIDGET = 'COURSE_FORMATS_WIDGET'
    COURSE_IMAGES_WIDGET = 'COURSE_IMAGES_WIDGET'
    COURSE_PROGRAM_WIDGET = 'COURSE_PROGRAM_WIDGET'
    SIGN_UP_FORM_WIDGET = 'SIGN_UP_FORM_WIDGET'


class WidgetManager(models.Manager):
    def get_course_widgets(self, course):
        widgets = reduce(
            lambda elems, next_elem: elems + next_elem, [list(w.objects.filter(course=course)) for w in WIDGET_CLASSES]
        )
        return sorted(widgets, key=lambda w: w.position)

    def add_widget_to_course(self, course, widget) -> None:
        Widget.objects.get(id=widget).courses.add(course)

    def remove_widget_from_course(self, course, widget) -> None:
        Widget.objects.get(id=widget).courses.remove(course)


class Widget(Draggable):
    course = models.ForeignKey('api.Course', blank=True, on_delete=models.CASCADE)
    is_visible = models.BooleanField(default=True)

    objects = WidgetManager()
    type = WidgetTypes.BASE_WIDGET.value


class TextWidget(Widget):
    content = RichTextField()
    type = WidgetTypes.TEXT_WIDGET.value


class ImageWidget(Widget):
    image = models.ImageField()
    type = WidgetTypes.IMAGE_WIDGET.value


class CourseScheduleWidget(Widget):
    type = WidgetTypes.COURSE_SCHEDULE_WIDGET.value


class OptionsWidget(Widget):
    type = WidgetTypes.OPTIONS_WIDGET.value


class CourseFormatsWidget(Widget):
    type = WidgetTypes.COURSE_FORMATS_WIDGET.value


class CourseImagesWidget(Widget):
    images = GenericRelation(Image)
    type = WidgetTypes.COURSE_IMAGES_WIDGET.value


class CourseProgramWidget(Widget):
    type = WidgetTypes.COURSE_PROGRAM_WIDGET.value


class SignUpFormWidget(Widget):
    type = WidgetTypes.SIGN_UP_FORM_WIDGET.value


class CourseLessonComponent(models.Model):
    widget = models.ForeignKey(CourseScheduleWidget, on_delete=models.CASCADE, related_name='lessons')
    date = models.DateTimeField()


class OptionComponent(Draggable):
    widget = models.ForeignKey(OptionsWidget, on_delete=models.CASCADE, related_name='options')
    icon = models.CharField(choices=OPTION_ICONS, max_length=255)
    title = models.CharField(max_length=255)


class CourseFormatComponent(Draggable):
    widget = models.ForeignKey(CourseFormatsWidget, on_delete=models.CASCADE, related_name='formats')
    title = models.CharField(max_length=255)
    text = models.TextField(blank=True)
    price = models.PositiveIntegerField()


class CourseProgramComponent(Draggable):
    widget = models.ForeignKey(CourseProgramWidget, on_delete=models.CASCADE, related_name='programs')
    title = models.CharField(max_length=255)
    content = RichTextField()


WIDGET_CLASSES = [
    TextWidget, ImageWidget, CourseScheduleWidget, OptionsWidget, CourseFormatsWidget, CourseImagesWidget,
    CourseProgramWidget, SignUpFormWidget
]
