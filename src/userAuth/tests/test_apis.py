from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, RequestsClient

from userAuth.models import User


class TestUserAPIs(APITestCase):

    def setUp(self):
        self.client = RequestsClient()
        self.user1 = User.objects.create(username='test_user_room_manager',
                                         first_name="Test",
                                         last_name='User',
                                         email='test@example.com',
                                         is_room_manager=True)
        self.user1.set_password('test_password')
        self.user1.save()
        self.token1 = Token.objects.create(user=self.user1)

    # Call login user with incomplete input
    def test_user_login_incomplete_input(self):
        response = self.client.post('http://localhost:8000/api/login', {"username": 'test_user_room_manager'})
        self.assertEquals(response.status_code, 400)

    # Call login user with invalid credentials
    def test_user_login_invalid_cred(self):
        response = self.client.post('http://localhost:8000/api/login', {"username": 'test_user_123',
                                                                        "password": 'password'})
        self.assertEquals(response.status_code, 400)

    # Call login user and get token
    def test_user_login(self):
        response = self.client.post('http://localhost:8000/api/login', {"username": 'test_user_room_manager',
                                                                        "password": 'test_password'})
        self.assertEquals(response.status_code, 200)
        self.assertIn("token", response.json())

    # Call user signup with incomplete details
    def test_user_signup_incomplete_details(self):
        response = self.client.post('http://localhost:8000/api/signup', {"username": 'test_user_customer1',
                                                                         "password": 'test_password',
                                                                         "first_name": "Test",
                                                                         "last_name": 'User',
                                                                         "is_customer": True})
        self.assertEquals(response.status_code, 400)

    # Call user signup with existing username
    def test_user_signup_duplicate_username(self):
        response = self.client.post('http://localhost:8000/api/signup', {"username": 'test_user_room_manager',
                                                                         "password": 'test_password',
                                                                         "first_name": "Test",
                                                                         "last_name": 'User',
                                                                         "email": 'test1@example.com',
                                                                         "is_customer": True})
        self.assertEquals(response.status_code, 400)
        self.assertIn('username', response.json())

        self.assertEquals(response.status_code, 400)

    # Call user signup without is_customer and is_room_manager
    def test_user_signup_without_role(self):
        response = self.client.post('http://localhost:8000/api/signup', {"username": 'test_user_customer1',
                                                                         "password": 'test_password',
                                                                         "first_name": "Test",
                                                                         "last_name": 'User',
                                                                         "email": 'test1@example.com'})
        self.assertEquals(response.status_code, 400)
        self.assertIn('either customer or room manager', response.json()['non_field_errors'][0])

    # Call user signup
    def test_user_signup(self):
        response = self.client.post('http://localhost:8000/api/signup', {"username": 'test_user_customer1',
                                                                         "password": 'test_password',
                                                                         "first_name": "Test",
                                                                         "last_name": 'User',
                                                                         "email": 'test1@example.com',
                                                                         "is_customer": True})
        self.assertEquals(response.status_code, 201)

    # Call user profile get without authentication
    def test_user_profile_get_without_auth(self):
        response = self.client.get('http://localhost:8000/api/profile')
        self.assertEquals(response.status_code, 401)

    # Call user profile get
    def test_user_profile_get(self):
        response = self.client.get('http://localhost:8000/api/profile',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)

    # Call user profile update without authentication
    def test_user_profile_update_without_auth(self):
        response = self.client.patch('http://localhost:8000/api/profile', {"username": "changedUsername"})
        self.assertEquals(response.status_code, 401)

    # Call user profile update to update is_customer or is_room_manager
    def test_user_profile_update_role(self):
        response = self.client.patch('http://localhost:8000/api/profile',
                                     {"is_room_manager": False, "is_customer": True},
                                     headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)
        # Verify that is_customer and is_role_manager fields are not updated
        self.assertEquals(response.json()['is_customer'], self.user1.is_customer)

    # Call user profile update
    def test_user_profile_update(self):
        response = self.client.patch('http://localhost:8000/api/profile', {"username": "changedUsername"},
                                     headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()['username'], 'changedUsername')
