from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class Draggable(models.Model):
    position = models.PositiveSmallIntegerField(default=1)

    class Meta:
        abstract = True
        ordering = ['position']


class Image(Draggable):
    image = models.ImageField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()
