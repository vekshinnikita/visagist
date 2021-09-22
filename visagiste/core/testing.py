from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient


class BaseTestCases(APITestCase):
    def setUp(self):
        user_login_data = {'username': "User", 'password': "12345678"}
        self.user_ = User.objects.create_user(**user_login_data)
        self.user_.save()

        user_token = self.client.post(reverse('token_obtain'), user_login_data, format='json').data['access']

        self.user = APIClient()
        self.user.credentials(HTTP_AUTHORIZATION='Bearer ' + user_token)

        self.anon = APIClient()
        self.anon.credentials(HTTP_AUTHORIZATION='Bearer')
