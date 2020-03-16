from django.test import SimpleTestCase
from django.urls import resolve, reverse
from rest_framework.authtoken.views import obtain_auth_token


from roomBookings import views as roomViews


class TestUrls(SimpleTestCase):

    def test_url_rooms(self):
        url = reverse('rooms')
        self.assertEquals(resolve(url).func.__name__, roomViews.Rooms.as_view().__name__)

    def test_url_rooms_rud(self):
        url = reverse('rooms_rud', kwargs={'id': 2})
        self.assertEquals(resolve(url).func.__name__, roomViews.RoomsRUD.as_view().__name__)

    def test_url_timeslots(self):
        url = reverse('timeslots')
        self.assertEquals(resolve(url).func.__name__, roomViews.TimeSlots.as_view().__name__)

    def test_url_timeslots_rd(self):
        url = reverse('timeslots_rd', kwargs={'id': 2})
        self.assertEquals(resolve(url).func.__name__, roomViews.TimeSlotsRD.as_view().__name__)

    def test_url_bookings(self):
        url = reverse('bookings')
        self.assertEquals(resolve(url).func.__name__, roomViews.Bookings.as_view().__name__)

    def test_url_bookings_rd(self):
        url = reverse('bookings_rd', kwargs={'id': 2})
        self.assertEquals(resolve(url).func.__name__, roomViews.BookingsRD.as_view().__name__)
