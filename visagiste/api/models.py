from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from core.models import Image, Draggable


class Course(Draggable):
    title = models.CharField(max_length=255)
    

class InstagramReview(Draggable):
    pass


class StudentWorkImage(Draggable):
    image = GenericRelation(Image)
