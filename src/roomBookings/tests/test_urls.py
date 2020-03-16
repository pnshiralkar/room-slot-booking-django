from django.test import SimpleTestCase
from django.urls import resolve, reverse

from roomBookings import views as room_views


# Tests for Rooms, TimeSlots and Bookings URLs
class TestUrls(SimpleTestCase):

    def test_url_rooms(self):
        url = reverse('rooms')
        self.assertEquals(resolve(url).func.__name__, room_views.Rooms.as_view().__name__)

    def test_url_rooms_rud(self):
        url = reverse('rooms_rud', kwargs={'id': 2})
        self.assertEquals(resolve(url).func.__name__, room_views.RoomsRUD.as_view().__name__)

    def test_url_timeslots(self):
        url = reverse('timeslots')
        self.assertEquals(resolve(url).func.__name__, room_views.TimeSlots.as_view().__name__)

    def test_url_timeslots_rd(self):
        url = reverse('timeslots_rd', kwargs={'id': 2})
        self.assertEquals(resolve(url).func.__name__, room_views.TimeSlotsRD.as_view().__name__)

    def test_url_bookings(self):
        url = reverse('bookings')
        self.assertEquals(resolve(url).func.__name__, room_views.Bookings.as_view().__name__)

    def test_url_bookings_rd(self):
        url = reverse('bookings_rd', kwargs={'id': 2})
        self.assertEquals(resolve(url).func.__name__, room_views.BookingsRD.as_view().__name__)
