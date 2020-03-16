from django.test import SimpleTestCase
from django.urls import resolve, reverse
from django.views.generic import TemplateView

from RoomSlotBookingProject.urls import my_serve


# Test URLs for Frontend part
class TestUrls(SimpleTestCase):

    def test_url_frontend_index(self):
        url = reverse('frontend_index')
        self.assertEquals(resolve(url).func.__name__, TemplateView.as_view().__name__)

    def test_url_frontend_static_files(self):
        url = '/manifest.json'
        self.assertEquals(resolve(url).func, my_serve)

# Other tests are included in respective app folders
