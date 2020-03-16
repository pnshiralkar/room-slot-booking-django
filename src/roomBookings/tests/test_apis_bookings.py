from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, RequestsClient

from roomBookings.models import Room, TimeSlot, Booking
from userAuth.models import User


# Tests for Bookings API
class TestBookings(APITestCase):

    # Initialize setup before starting tests
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

        # Create room, time-slot and booking objects
        room1 = Room.objects.create(name="Sample Room1", num_days_in_adv=2, owner=self.user1)
        room2 = Room.objects.create(name="Sample Room2", num_days_in_adv=7, owner=self.user3)
        time_slot_1 = TimeSlot.objects.create(time_from='00:00', time_to='12:00', room_id=room1)
        time_slot_2 = TimeSlot.objects.create(time_from='12:00', time_to='18:00', room_id=room2)
        Booking.objects.create(date='2020-03-15', time_slot=time_slot_1, customer=self.user2)
        Booking.objects.create(date='2020-03-15', time_slot=time_slot_2, customer=self.user4)

    # Call create booking without authentication
    def test_bookings_create_without_auth(self):
        response = self.client.post('http://localhost:8000/api/bookings', {"date": '2020-03-16', "time_slot": '1'})
        self.assertEquals(response.status_code, 401 or 403)
        self.assertEquals(Booking.objects.all().count(), 2)

    # Call create as room manager user
    def test_bookings_create_as_room_manager(self):
        response = self.client.post('http://localhost:8000/api/bookings', {"date": '2020-03-16', "time_slot": '1'},
                                    headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(Booking.objects.all().count(), 2)

    # Call create booking with incomplete input fields
    def test_bookings_create_incomplete_input(self):
        response = self.client.post('http://localhost:8000/api/bookings', {"date": '2020-03-16'},
                                    headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 400)
        self.assertEquals(Booking.objects.all().count(), 2)

    # Call create booking a time-slot already booked for that date
    def test_bookings_create_already_booked(self):
        response = self.client.post('http://localhost:8000/api/bookings', {"date": '2020-03-15', "time_slot": '1'},
                                    headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 400)
        self.assertEquals(Booking.objects.all().count(), 2)

    # Call create booking with right all fields and authentication
    def test_bookings_create(self):
        response = self.client.post('http://localhost:8000/api/bookings', {"date": '2020-03-16', "time_slot": '1'},
                                    headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 201)
        self.assertEquals(Booking.objects.all().count(), 3)

    # Call get bookings without authentication
    def test_bookings_get_without_auth(self):
        response = self.client.get('http://localhost:8000/api/bookings')
        self.assertEquals(response.status_code, 401)

    # Call get bookings as customer
    def test_bookings_get_as_customer(self):
        response = self.client.get('http://localhost:8000/api/bookings',
                                   headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)  # Gets only the booking booked by him

    # Call get bookings as room manager
    def test_bookings_get_as_room_manager(self):
        response = self.client.get('http://localhost:8000/api/bookings',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)  # Gets only the bookings of the room he owns

    # Call retrieve specific booking without authentication
    def test_bookings_retrieve_without_auth(self):
        response = self.client.get('http://localhost:8000/api/bookings/1')
        self.assertEquals(response.status_code, 401)

    # Call retrieve specific booking as other customer (not the owner of booking)
    def test_bookings_retrieve_as_not_owner(self):
        response = self.client.get('http://localhost:8000/api/bookings/1',
                                   headers={"Authorization": "token " + str(self.token4)})
        self.assertEquals(response.status_code, 403)

    # Call retrieve specific booking as the owner
    def test_bookings_retrieve_as_owner(self):
        response = self.client.get('http://localhost:8000/api/bookings/1',
                                   headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 200)

    # Call retrieve specific booking as other room manager (not the owner of the room corresponding to the booking)
    def test_bookings_retrieve_as_not_room_owner(self):
        response = self.client.get('http://localhost:8000/api/bookings/1',
                                   headers={"Authorization": "token " + str(self.token3)})
        self.assertEquals(response.status_code, 403)

    # Call retrieve specific booking as the room owner (the owner of the room corresponding to the booking)
    def test_bookings_retrieve_as_room_owner(self):
        response = self.client.get('http://localhost:8000/api/bookings/1',
                                   headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 200)

    # Call delete specific booking without authentication
    def test_bookings_delete_without_auth(self):
        response = self.client.delete('http://localhost:8000/api/bookings/1')
        self.assertEquals(response.status_code, 401)
        self.assertEquals(Booking.objects.all().count(), 2)

    # Call delete specific booking as room manager
    def test_bookings_delete_as_room_manager(self):
        response = self.client.delete('http://localhost:8000/api/bookings/1',
                                      headers={"Authorization": "token " + str(self.token1)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(Booking.objects.all().count(), 2)

    # Call delete specific booking as other customer (not the owner of booking)
    def test_bookings_delete_as_not_owner(self):
        response = self.client.delete('http://localhost:8000/api/bookings/1',
                                      headers={"Authorization": "token " + str(self.token4)})
        self.assertEquals(response.status_code, 403)
        self.assertEquals(Booking.objects.all().count(), 2)

    # Call delete specific booking as the owner of booking
    def test_bookings_delete_as_owner(self):
        response = self.client.delete('http://localhost:8000/api/bookings/1',
                                      headers={"Authorization": "token " + str(self.token2)})
        self.assertEquals(response.status_code, 204)
        self.assertEquals(Booking.objects.all().count(), 1)
