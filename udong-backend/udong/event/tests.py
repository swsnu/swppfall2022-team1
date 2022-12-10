from django.test import TestCase
import json
from common.utils import MyTestCase
from post.models import Post, Enrollment, PostTag
from club.models import Club
from user.models import UserClub
from tag.models import Tag, UserTag
from datetime import date
from event.models import Event
from timedata.models import Time

# Create your tests here.


class PostTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()

        club1 = Club.objects.create(name="Udong", code="swppfall")
        club2 = Club.objects.create(name="Ramen", code="random")
        club3 = Club.objects.create(name="Burger", code="bulgogi")
        UserClub.objects.create(user=self.dummy_user, club=club1, auth="A")
        UserClub.objects.create(user=self.dummy_user, club=club2, auth="M")

        event1 = Event.objects.create(club=club1, name="Turing award")
        event2 = Event.objects.create(club=club2, name="Nobel Prize")
        event3 = Event.objects.create(club=club3, name="Fields Medal")

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

        post1 = Post.objects.create(
            author=self.dummy_user,
            event=event1,
            club=club1,
            title="Turing award is coming!",
            content="Turing award Turing award Turing award",
            type="A",
        )
        post2 = Post.objects.create(
            author=self.dummy_user,
            event=event1,
            club=club1,
            title="Nobel prize is coming!",
            content="Nobel Prize Nobel Prize Nobel Prize",
            type="E",
        )
        post3 = Post.objects.create(
            author=self.dummy_user,
            event=event2,
            club=club2,
            title="Turing award is coming!",
            content="Turing award Turing award Turing award",
            type="A",
        )
        post4 = Post.objects.create(
            author=self.dummy_user,
            event=event2,
            club=club2,
            title="Nobel prize is coming!",
            content="Nobel Prize Nobel Prize Nobel Prize",
            type="E",
        )

        self.enrollment1 = Enrollment.objects.create(post=post2, closed=False)
        self.enrollment2 = Enrollment.objects.create(post=post4, closed=False)

        tag1 = Tag.objects.create(club=club2, name="genius", is_default=True)
        tag2 = Tag.objects.create(club=club2, name="winner")
        UserTag.objects.create(user=self.dummy_user, tag=tag1)
        PostTag.objects.create(post=post3, tag=tag1)
        PostTag.objects.create(post=post3, tag=tag2)

    # GET /api/event/:id/
    def test_get_event_id(self) -> None:
        response = self.client.get("/api/event/1/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 1,
                "name": "Turing award",
                "time": [
                    {
                        "type": "D",
                        "start_date": "2022-11-06",
                        "end_date": "2022-11-07",
                        "repeat_start": None,
                        "repeat_end": None,
                        "weekday": None,
                        "start_time": 10,
                        "end_time": 30,
                    },
                    {
                        "type": "W",
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
        )

    # PUT /api/event/:id/
    def test_put_event_id(self) -> None:
        response = self.client.put(
            "/api/event/1/",
            json.dumps(
                {
                    "name": "Last christmas",
                    "new_time": [
                        {
                            "type": "D",
                            "start_date": "2021-12-24",
                            "end_date": "2021-12-25",
                            "start_time": 0,
                            "end_time": 48,
                        }
                    ],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 1,
                "name": "Last christmas",
                "time": [
                    {
                        "type": "D",
                        "start_date": "2021-12-24",
                        "end_date": "2021-12-25",
                        "repeat_start": None,
                        "repeat_end": None,
                        "weekday": None,
                        "start_time": 0,
                        "end_time": 48,
                    }
                ],
            },
        )

    # DELETE /api/event/:id/
    def test_delete_event_id(self) -> None:
        response = self.client.delete("/api/event/1/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Event.objects.all()), 2)

    # GET /api/event/:id/post/
    def test_get_event_id_post(self) -> None:
        response = self.client.get("/api/event/1/post/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 1,
                    "author": "Alan Turing",
                    "club": None,
                    "event": {"id": 1, "name": "Turing award"},
                    "title": "Turing award is coming!",
                    "content": "Turing award Turing award Turing award",
                    "type": "A",
                    "closed": None,
                    "include_tag": [],
                    "exclude_tag": [],
                },
                {
                    "id": 2,
                    "author": "Alan Turing",
                    "club": None,
                    "event": {"id": 1, "name": "Turing award"},
                    "title": "Nobel prize is coming!",
                    "content": "Nobel Prize Nobel Prize Nobel Prize",
                    "type": "E",
                    "closed": False,
                    "include_tag": [],
                    "exclude_tag": [],
                },
            ],
        )

        response = self.client.get("/api/event/2/post/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 3,
                    "author": "Alan Turing",
                    "club": None,
                    "event": {"id": 2, "name": "Nobel Prize"},
                    "title": "Turing award is coming!",
                    "content": "Turing award Turing award Turing award",
                    "type": "A",
                    "closed": None,
                    "include_tag": [{"id": 1, "name": "genius", "is_default": True}],
                    "exclude_tag": [{"id": 2, "name": "winner", "is_default": False}],
                }
            ],
        )

        response = self.client.get("/api/event/3/post/")
        self.assertEqual(response.status_code, 404)
