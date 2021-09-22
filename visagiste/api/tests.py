from django.urls import reverse
from rest_framework import status
from core.testing import BaseTestCases
from widgets.models import TextWidget
from .models import Course


class CourseViewSetTests(BaseTestCases):
    base_url_name = 'courses'

    def setUp(self):
        super().setUp()
        self.course = Course.objects.create(title="Test Course")
        self.text_widget = TextWidget.objects.create(content='<p>Lorem ipsum</p>', course=self.course.id)
        self.non_existent_course_id = 10


class CourseViewSetRetriveTests(CourseViewSetTests):
    def setUp(self):
        super().setUp()
        self.url_name = self.base_url_name + '-detail'

    def test_200(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.user.get(url)
        self.assertEqual(len([response.data]), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_404(self):
        url = reverse(self.url_name, kwargs={"pk": self.non_existent_course_id})
        response = self.user.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_401(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.anon.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CourseViewSetListTests(CourseViewSetTests):
    def setUp(self):
        super().setUp()
        self.url_name = self.base_url_name + '-list'

    def test_200(self):
        url = reverse(self.url_name)
        response = self.user.get(url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_401(self):
        url = reverse(self.url_name)
        response = self.anon.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CourseViewSetDestroyTests(CourseViewSetTests):
    def setUp(self):
        super().setUp()
        self.url_name = self.base_url_name + '-detail'

    def test_204(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.user.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_404(self):
        url = reverse(self.url_name, kwargs={"pk": self.non_existent_course_id})
        response = self.user.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_401(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.anon.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CourseViewSetCreateTests(CourseViewSetTests):
    def setUp(self):
        super().setUp()
        self.url_name = self.base_url_name + '-list'
        self.correct_creation_data = {
            "title": "Test Course",
            "widgets": [
                {
                    "type": "TEXT_WIDGET",
                    "content": "<p>Some text</p>",
                },
                {
                    "type": "OPTIONS_WIDGET",
                    "options": [
                        {
                            "icon": "CM",
                            "title": "Test Option 1"
                        },
                        {
                            "icon": "CM",
                            "title": "Test Option 2"
                        }
                    ]
                },
            ]
        }
        self.incorrect_creation_data = {
            {
                "title": "Test Course",
                "widgets": [
                    {
                        "type": "NON-EXISTENT_WIDGET",
                        "content": "<p>Some text</p>",
                    }
                ]
            }
        }
    
    def test_201(self):
        url = reverse(self.url_name)
        response = self.user.post(url, self.course_correct_creation_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_400(self):
        url = reverse(self.url_name)
        response = self.user.post(url, self.course_incorrect_creation_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_401(self):
        url = reverse(self.url_name)
        response = self.anon.post(url, self.course_correct_creation_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CourseViewSetUpdateTests(CourseViewSetTests):
    def setUp(self):
        super().setUp()
        self.url_name = self.base_url_name + '-detail'
        self.correct_update_data = {
            "id": self.course.id,
            "title": "New Test Course Title",
            "widgets": [
                {
                    "id": self.text_widget.id,
                    "type": "TEXT_WIDGET",
                    "content": "<p>Updated lorem ipsum</p>"
                }
            ]
        }
        self.incorrect_update_data = {
            "id": self.course.id,
            "title": "New Test Course Title",
            "widgets": [
                {
                    "type": "NON_EXISTENT_WIDGET",
                }
            ]
        }

    def test_204(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.user.put(url, self.correct_update_data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_400(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.user.put(url, self.incorrect_update_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_401(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.anon.put(url, self.correct_update_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_404(self):
        url = reverse(self.url_name, kwargs={"pk": self.non_existent_course_id})
        response = self.user.put(url, self.correct_update_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
