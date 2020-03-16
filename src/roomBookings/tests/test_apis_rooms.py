from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, RequestsClient

from roomBookings.models import Room
from userAuth.models import User


# Tests for Rooms API
class TestRooms(APITestCase):

    def setUp(self):
        self.client = RequestsClient()

        # Create 2 customer and 2 room manager users
        self.user1 = User.objects.create(username='test_user_room_manager', password='test_password',
                                         is_room_manager=True)
        self.user2 = User.objects.create(username='test_user_customer', password='test_password',
                                         is_customer=True)
        self.user3 = User.objects.create(username='test_user_room_manager2', password='test_password',
                                         is_customer=True)
        self.user4 = User.objects.create(username='test_user_customer2', password='test_password',
                                         is_customer=True)

        # Generate tokens for the users
        self.token1 = Token.objects.create(user=self.user1)
        self.token2 = Token.objects.create(user=self.user2)
        self.token3 = Token.objects.create(user=self.user3)
        self.token4 = Token.objects.create(user=self.user4)

        # Create room objects
        Room.objects.create(name="Sample Room1", num_days_in_adv=2, owner=self.user1)
        Room.objects.create(name="Sample Room2", num_days_in_adv=7, owner=self.user3)

    # Call create room without authentication
    def test_rooms_create_as_customer(self):
        response = self.client.post('http://localhost:8000/api/rooms', {"name": "SampleRoom", "num_days_in_adv": 3})
        self.assertEquals(response.status_code, 401 or 403)
        self.assertEquals(Room.objects.all().count(), 2)

    # Call create as customer user
    def test_rooms_create_without_auth(self):
        response = self.client.post('http://localhost:8000/api/rooms', {"name": "SampleRoom", "num_days_in_adv": 3},
                                    headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(Room.objects.all().count(), 2)

    # Call create room with incomplete input fields
    def test_rooms_create_incomplete_input(self):
        response = self.client.post('http://localhost:8000/api/rooms', {"name": "SampleRoom"},
                                    headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 400)
        self.assertEquals(Room.objects.all().count(), 2)

    # Call create room with right all fields and authentication
    def test_rooms_create(self):
        response = self.client.post('http://localhost:8000/api/rooms', {"name": "SampleRoom", "num_days_in_adv": 3},
                                    headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 201)
        self.assertEquals(Room.objects.all().count(), 3)

    # Call get rooms without authentication
    def test_rooms_get_without_auth(self):
        response = self.client.get('http://localhost:8000/api/rooms')
        self.assertEquals(response.status_code, 401)

    # Call get rooms as customer
    def test_rooms_get_as_customer(self):
        response = self.client.get('http://localhost:8000/api/rooms',
                                   headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 2)

    # Call get rooms as room manager
    def test_rooms_get_as_room_manager(self):
        response = self.client.get('http://localhost:8000/api/rooms',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)  # Gets only the room he owns

    # Call retrieve specific room without authentication
    def test_rooms_retrieve_without_auth(self):
        response = self.client.get('http://localhost:8000/api/rooms/1')
        self.assertEquals(response.status_code, 401)

    # Call retrieve specific room as customer
    def test_rooms_retrieve_as_customer(self):
        response = self.client.get('http://localhost:8000/api/rooms/1',
                                   headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)

    # Call retrieve specific room as other room manager (not the owner)
    def test_rooms_retrieve_as_not_owner(self):
        response = self.client.get('http://localhost:8000/api/rooms/1',
                                   headers={"Authorization": "token " + str(self.token3)})
        self.assertEquals(response.status_code, 403)

    # Call retrieve specific room as the owner
    def test_rooms_retrieve_as_owner(self):
        response = self.client.get('http://localhost:8000/api/rooms/1',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)

    # Call update (patch) specific room without authentication
    def test_rooms_update_without_auth(self):
        response = self.client.patch('http://localhost:8000/api/rooms/1',
                                     {"name": "Other Room"})
        self.assertEquals(response.status_code, 401)

    # Call update (patch) specific room as customer
    def test_rooms_update_as_customer(self):
        response = self.client.patch('http://localhost:8000/api/rooms/1',
                                     {"name": "Other Room"},
                                     headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)

    # Call update (patch) specific room as other room manager (not the owner)
    def test_rooms_update_as_not_owner(self):
        response = self.client.patch('http://localhost:8000/api/rooms/1',
                                     {"name": "Other Room"},
                                     headers={"Authorization": "token " + str(self.token3)})
        self.assertEquals(response.status_code, 403)

    # Call update (patch) specific room as the owner
    def test_rooms_update_as_owner(self):
        response = self.client.patch('http://localhost:8000/api/rooms/1',
                                     {"name": "Other Room"},
                                     headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)

    # Call delete specific room without authentication
    def test_rooms_delete_without_auth(self):
        response = self.client.delete('http://localhost:8000/api/rooms/1')
        self.assertEquals(response.status_code, 401)
        self.assertEquals(Room.objects.all().count(), 2)

    # Call delete specific room as customer
    def test_rooms_delete_as_customer(self):
        response = self.client.delete('http://localhost:8000/api/rooms/1',
                                      headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(Room.objects.all().count(), 2)

    # Call delete specific room as other room manager (not the owner)
    def test_rooms_delete_as_not_owner(self):
        response = self.client.delete('http://localhost:8000/api/rooms/1',
                                      headers={"Authorization": "token " + str(self.token3)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(Room.objects.all().count(), 2)

    # Call delete specific room as the owner
    def test_rooms_delete_as_owner(self):
        response = self.client.delete('http://localhost:8000/api/rooms/1',
                                      headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 204)
        self.assertEquals(Room.objects.all().count(), 1)
