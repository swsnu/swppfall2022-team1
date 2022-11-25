from django.test import Client
from common.utils import MyTestCase
from user.models import UserClub
from club.models import Club
from event.models import Event
from timedata.models import Time
from tag.models import Tag
from datetime import date

# Create your tests here.


class ClubTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()
        club1 = Club.objects.create(name="Udong", code="swppfall")
        club2 = Club.objects.create(name="Ramen", code="random")
        UserClub.objects.create(user=self.dummy_user, club=club1, auth="A")
        event1 = Event.objects.create(club=club1, name="Turing award")
        Time.objects.create(
            event=event1,
            type="D",
            start_date=date(2022, 11, 6),
            end_date=date(2022, 11, 7),
            start_time=10,
            end_time=30,
        )
        Time.objects.create(
            event=event1,
            type="W",
            repeat_start=date(2022, 11, 6),
            repeat_end=date(2022, 11, 7),
            weekday=5,
            start_time=15,
            end_time=35,
        )
        Tag.objects.create(club=club1, name="genius")
        Tag.objects.create(club=club1, name="winner")

    # GET /api/club/:id
    def test_club_id(self) -> None:
        response = self.client.get("/api/club/1/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(response.content, {"id": 1, "name": "Udong", "code": "swppfall"})

    # GET /api/club/
    def test_club_list(self) -> None:
        response = self.client.get("/api/club/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content, [{"id": 1, "name": "Udong", "code": "swppfall"}]
        )

    # GET /api/club/:id/user/
    def test_club_user(self) -> None:
        response = self.client.get("/api/club/1/user/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "user": {
                        "id": 1,
                        "email": "alan@snu.ac.kr",
                        "image": "image",
                        "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                        "name": "Alan Turing",
                    },
                    "auth": "Admin",
                }
            ],
        )

    # GET /api/club/:id/event/
    def test_club_event(self) -> None:
        response = self.client.get("/api/club/1/event/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 1,
                    "name": "Turing award",
                    "time": [
                        {
                            "type": "Date",
                            "start_date": "2022-11-06",
                            "end_date": "2022-11-07",
                            "repeat_start": None,
                            "repeat_end": None,
                            "weekday": None,
                            "start_time": 10,
                            "end_time": 30,
                        },
                        {
                            "type": "Weekday",
                            "start_date": None,
                            "end_date": None,
                            "repeat_start": "2022-11-06",
                            "repeat_end": "2022-11-07",
                            "weekday": 5,
                            "start_time": 15,
                            "end_time": 35,
                        },
                    ],
                },
            ],
        )

    # GET /api/club/:id/tag/
    def test_club_tag(self) -> None:
        response = self.client.get("/api/club/1/tag/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 1,
                    "name": "genius",
                },
                {
                    "id": 2,
                    "name": "winner",
                },
            ],
        )
