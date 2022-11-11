from django.test import Client
from common.utils import MyTestCase
from user.models import UserClub
from club.models import Club

# Create your tests here.


class ClubTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()
        club1 = Club.objects.create(name="Udong", code="swppfall")
        club2 = Club.objects.create(name="Ramen", code="random")
        UserClub.objects.create(user=self.dummy_user, club=club1, auth="A")

    # api/club/:id
    def test_club_id(self) -> None:
        client = Client()

        response = client.get("/api/club/1/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(response.content, {"id": 1, "name": "Udong", "code": "swppfall"})

    # api/club/
    def test_club_list(self) -> None:
        client = Client()

        response = client.get("/api/club/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content, [{"id": 1, "name": "Udong", "code": "swppfall"}]
        )
