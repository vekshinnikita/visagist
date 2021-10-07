from django.contrib import admin
from .models import TextWidget, ImageWidget, OptionsWidget, SignUpFormWidget, CourseImagesWidget, CourseFormatsWidget, \
    CourseProgramWidget, CourseScheduleWidget, CourseProgramComponent, CourseFormatComponent, OptionComponent

admin.site.register(TextWidget)
admin.site.register(ImageWidget)
admin.site.register(OptionsWidget)
admin.site.register(SignUpFormWidget)
admin.site.register(CourseImagesWidget)
admin.site.register(CourseFormatsWidget)
admin.site.register(CourseProgramWidget)
admin.site.register(CourseScheduleWidget)
admin.site.register(CourseProgramComponent)
admin.site.register(CourseFormatComponent)
admin.site.register(OptionComponent)
