from django.db import models
from core.models import Draggable

class Course(Draggable):
    title = models.CharField(max_length=255)
    is_visible = models.BooleanField(default=True)
    image = models.ImageField()

    def __str__(self) -> str:
        return self.title


class Review(Draggable):
    image = models.ImageField()


class StudentWork(Draggable):
    image = models.ImageField()
