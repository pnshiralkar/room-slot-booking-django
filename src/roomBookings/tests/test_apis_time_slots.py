from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, RequestsClient

from roomBookings.models import Room, TimeSlot
from userAuth.models import User


# Tests for TimeSlots API
class TestTimeSlots(APITestCase):

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

        # Create room and time-slot objects
        room1 = Room.objects.create(name="Sample Room1", num_days_in_adv=2, owner=self.user1)
        room2 = Room.objects.create(name="Sample Room2", num_days_in_adv=7, owner=self.user3)
        TimeSlot.objects.create(time_from='00:00', time_to='12:00', room_id=room1)
        TimeSlot.objects.create(time_from='12:00', time_to='18:00', room_id=room2)

    # Call create time slot without authentication
    def test_time_slots_create_as_customer(self):
        response = self.client.post('http://localhost:8000/api/timeslots',
                                    {"time_from": '00:00', "time_to": '12:00', "room_id": 1})
        self.assertEquals(response.status_code, 401 or 403)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call create time slot as customer user
    def test_time_slots_create_without_auth(self):
        response = self.client.post('http://localhost:8000/api/timeslots',
                                    {"time_from": '00:00', "time_to": '12:00', "room_id": 1},
                                    headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call create time slot with incomplete input fields
    def test_time_slots_create_incomplete_input(self):
        response = self.client.post('http://localhost:8000/api/timeslots', {"time_from": '00:00', "room_id": 1},
                                    headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 400)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call create time slot with invalid input fields
    def test_time_slots_create_invalid_input(self):
        response = self.client.post('http://localhost:8000/api/timeslots',
                                    {"time_from": '0', "time_to": '1200', "room_id": 1},
                                    headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 400)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call create time slot with overlapping time slots
    def test_time_slots_create_overlapping(self):
        response = self.client.post('http://localhost:8000/api/timeslots',
                                    {"time_from": '00:00', "time_to": '12:00', "room_id": 1},
                                    headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 400)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call create time slot with appropriate fields and authentication
    def test_time_slots_create(self):
        response = self.client.post('http://localhost:8000/api/timeslots',
                                    {"time_from": '12:01', "time_to": '18:00', "room_id": 1},
                                    headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 201)
        self.assertEquals(TimeSlot.objects.all().count(), 3)

    # Call get time slots without authentication
    def test_time_slots_get_without_auth(self):
        response = self.client.get('http://localhost:8000/api/timeslots?room_id=1')
        self.assertEquals(response.status_code, 401)

    # Call get time slots as customer
    def test_time_slots_get_as_customer(self):
        response = self.client.get('http://localhost:8000/api/timeslots?room_id=1',
                                   headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)

    # Call get time slots without room_id in query string
    def test_time_slots_get_without_query_string_param(self):
        response = self.client.get('http://localhost:8000/api/timeslots',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 0)

    # Call get time slots as room manager
    def test_time_slots_get_as_room_manager(self):
        response = self.client.get('http://localhost:8000/api/timeslots?room_id=1',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)  # Gets time-slots corresponding to only the room he owns

    # Call retrieve specific time slot without authentication
    def test_time_slots_retrieve_without_auth(self):
        response = self.client.get('http://localhost:8000/api/timeslots/1')
        self.assertEquals(response.status_code, 401)

    # Call retrieve specific time slot as customer
    def test_time_slots_retrieve_as_customer(self):
        response = self.client.get('http://localhost:8000/api/timeslots/1',
                                   headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)

    # Call retrieve specific time slot as other room manager (not the room owner)
    def test_time_slots_retrieve_as_not_room_owner(self):
        response = self.client.get('http://localhost:8000/api/timeslots/1',
                                   headers={"Authorization": "token " + str(self.token3)})
        self.assertEquals(response.status_code, 403)

    # Call retrieve specific time slot as the room owner
    def test_time_slots_retrieve_as_room_owner(self):
        response = self.client.get('http://localhost:8000/api/timeslots/1',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)

    # Call delete specific time slot without authentication
    def test_time_slots_delete_without_auth(self):
        response = self.client.delete('http://localhost:8000/api/timeslots/1')
        self.assertEquals(response.status_code, 401)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call delete specific time slot as customer
    def test_time_slots_delete_as_customer(self):
        response = self.client.delete('http://localhost:8000/api/timeslots/1',
                                      headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call delete specific time slot as other room manager (not the owner)
    def test_time_slots_delete_as_not_room_owner(self):
        response = self.client.delete('http://localhost:8000/api/timeslots/1',
                                      headers={"Authorization": "token " + str(self.token3)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(TimeSlot.objects.all().count(), 2)

    # Call delete specific time slot as the owner
    def test_time_slots_delete_as_room_owner(self):
        response = self.client.delete('http://localhost:8000/api/timeslots/1',
                                      headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 204)
        self.assertEquals(TimeSlot.objects.all().count(), 1)
