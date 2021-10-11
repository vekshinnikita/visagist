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
        self.text_widget = TextWidget.objects.create(content='<p>Lorem ipsum</p>', course=self.course)
        self.non_existent_course_id = 10


class CourseViewSetRetrieveTests(CourseViewSetTests):
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
            'title': "Test Course",
            'is_visible': True,
            'position': 1,
            'image': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAZ5B4ADASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAQFAgMGBwEICf/EAFIQAAEEAAMFBAcEBwYEBQMBCQIAAQMEBRESBhMhIjEyQUJSBxRRYWJygiNxgZIVM0ORoaLRJFOxssHCFmPS4QglNETwVHPi8RfyZIM1RZNVw//EABwBAQADAQEBAQEAAAAAAAAAAAACAwQBBQYHCP/EADcRAQACAgEDAwMCBQQBBQEAAwABAgMREgQhMRMiQQUyUUJhFCNxgZEzUqGx0QYVYsHw4SRyQ//aAAwDAQACEQMRAD8A/lUiIgIiICIiAiIgIiICIiAiI/9k=",
            'widgets': [
                {
                    'type': "TEXT_WIDGET",
                    'content': "<p>Some text</p>",
                },
                {
                    'type': "FEATURES_WIDGET",
                    'children': [
                        {
                            'icon': "CM",
                            'title': "Test Feature 1"
                        },
                        {
                            'icon': "CM",
                            'title': "Test Feature 2"
                        }
                    ]
                },
            ]
        }
        self.incorrect_creation_data = {
            "title": "Test Course",
            "widgets": [
                {
                    "type": "NON-EXISTENT_WIDGET",
                    "content": "<p>Some text</p>",
                }
            ]
        }

    def test_201(self):
        url = reverse(self.url_name)
        response = self.user.post(url, self.correct_creation_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_400(self):
        url = reverse(self.url_name)
        response = self.user.post(url, self.incorrect_creation_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_401(self):
        url = reverse(self.url_name)
        response = self.anon.post(url, self.correct_creation_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CourseViewSetUpdateTests(CourseViewSetTests):
    def setUp(self):
        super().setUp()
        self.url_name = self.base_url_name + '-detail'
        self.correct_update_data = {
            "id": self.course.id,
            "is_visible": False,
            "title": "New Test Course Title",
            "position": 2,
            "widgets": [
                {
                    "id": self.text_widget.id,
                    "type": "TEXT_WIDGET",
                    "content": "<p>Updated lorem ipsum</p>"
                },
                {
                    "type": "IMAGE_WIDGET",
                    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAZ5B4ADASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAQFAgMGBwEICf/EAFIQAAEEAAMFBAcEBwYEBQMBCQIAAQMEBRESBhMhIjEyQUJSBxRRYWJygiNxgZIVM0ORoaLRJFOxssHCFmPS4QglNETwVHPi8RfyZIM1RZNVw//EABwBAQADAQEBAQEAAAAAAAAAAAACAwQBBQYHCP/EADcRAQACAgEDAwMCBQQBBQEAAwABAgMREgQhMRMiQQUyUUJhFCNxgZEzUqGx0QYVYsHw4SRyQ//aAAwDAQACEQMRAD8A/lUiIgIiICIiAiIgIiICIiAiI/9k="
                }
            ],
            "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAZ5B4ADASIAAhEBAxEB/8QAHQABAAIDAQEBAQAAAAAAAAAAAAQFAgMGBwEICf/EAFIQAAEEAAMFBAcEBwYEBQMBCQIAAQMEBRESBhMhIjEyQUJSBxRRYWJygiNxgZIVM0ORoaLRJFOxssHCFmPS4QglNETwVHPi8RfyZIM1RZNVw//EABwBAQADAQEBAQEAAAAAAAAAAAACAwQBBQYHCP/EADcRAQACAgEDAwMCBQQBBQEAAwABAgMREgQhMRMiQQUyUUJhFCNxgZEzUqGx0QYVYsHw4SRyQ//aAAwDAQACEQMRAD8A/lUiIgIiICIiAiIgIiICIiAiI/9k=",
        }
        self.incorrect_update_data = {
            "title": "New Test Course Title",
            "widgets": [
                {
                    "type": "NON_EXISTENT_WIDGET",
                }
            ]
        }

    def test_200(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.user.put(url, self.correct_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    def test_400(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.user.put(url, self.incorrect_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_401(self):
        url = reverse(self.url_name, kwargs={"pk": self.course.id})
        response = self.anon.put(url, self.correct_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_404(self):
        url = reverse(self.url_name, kwargs={"pk": self.non_existent_course_id})
        response = self.user.put(url, self.correct_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BulkTest(CourseViewSetTests):
    def setUp(self):
        super().setUp()
        Course.objects.create(title="Some title")
        self.correct_course_ids = {'ids': [1, 2]}
        self.incorrect_course_ids = {'ids': [10, 11]}
        
    def test_hide_200(self):
        url = reverse('hide_courses')
        response = self.user.post(url, self.correct_course_ids, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_hide_404(self):
        url = reverse('hide_courses')
        response = self.user.post(url, self.incorrect_course_ids, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_hide_200(self):
        url = reverse('reveal_courses')
        response = self.user.post(url, self.correct_course_ids, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_hide_404(self):
        url = reverse('reveal_courses')
        response = self.user.post(url, self.incorrect_course_ids, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_204(self):
        url = reverse('delete_courses')
        response = self.user.post(url, self.correct_course_ids, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_delete_404(self):
        url = reverse('delete_courses')
        response = self.user.post(url, self.incorrect_course_ids, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
