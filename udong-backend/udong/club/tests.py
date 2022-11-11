from django.test import Client
from common.utils import MyTestCase
from club.models import Club

# Create your tests here.


class ClubTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()
        Club.objects.create(name="Udong", code="swppfall")
        Club.objects.create(name="Ramen", code="random")

    # api/club/:id
    def test_club_id(self) -> None:
        client = Client()

        response = client.get("/api/club/1/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(response.content, {"id": 1, "name": "Udong", "code": "swppfall"})
