from django.test import SimpleTestCase
from django.urls import resolve, reverse
from rest_framework.authtoken.views import obtain_auth_token


from userAuth import views as userViews


class TestUrls(SimpleTestCase):

    def test_url_login(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func, obtain_auth_token)

    def test_url_signup(self):
        url = reverse('signup')
        self.assertEquals(resolve(url).func.__name__, userViews.Signup.as_view().__name__)

    def test_url_profile(self):
        url = reverse('profile')
        self.assertEquals(resolve(url).func.__name__, userViews.Profile.as_view().__name__)
