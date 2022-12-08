from django.test import Client
from common.utils import MyTestCase
from user.models import UserClub
from club.models import Club
from post.models import Post, Enrollment, Participation, Scheduling, PostTag
from event.models import Event
from timedata.models import Time
from tag.models import Tag, UserTag
from datetime import date

# Create your tests here.


class ClubTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()
        club1 = Club.objects.create(name="Udong", image="image", code="swppfall")
        club2 = Club.objects.create(name="Ramen", image="image", code="random")
        UserClub.objects.create(user=self.dummy_user, club=club1, auth="A")
        UserClub.objects.create(user=self.dummy_user, club=club2, auth="M")
        event1 = Event.objects.create(club=club1, name="Turing award")
        event2 = Event.objects.create(club=club1, name="Nobel Prize")
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
            event=event2,
            club=club1,
            title="Nobel prize is coming!",
            content="Nobel Prize Nobel Prize Nobel Prize",
            type="E",
        )

        post3 = Post.objects.create(
            author=self.dummy_user,
            club=club2,
            title="When to Meet?",
            content="Really Boring",
            type="S",
        )

        post4 = Post.objects.create(
            author=self.dummy_user,
            club=club2,
            title="We are admins",
            content="Let's kick out all other members",
            type="A",
        )

        enrollment1 = Enrollment.objects.create(post=post2, closed=False)

        Participation.objects.create(user=self.dummy_user, enrollment=enrollment1)

        Scheduling.objects.create(
            post=post3,
            type="D",
            dates=["2022-11-07"],
            start_time=25,
            end_time=40,
            closed=True,
        )

        tag1 = Tag.objects.create(club=club1, name="genius", is_default=True)
        tag2 = Tag.objects.create(club=club1, name="winner")
        tag3 = Tag.objects.create(club=club1, name="loser")

        UserTag.objects.create(user=self.dummy_user, tag=tag1)

        PostTag.objects.create(post=post1, tag=tag1)
        PostTag.objects.create(post=post1, tag=tag2)
        PostTag.objects.create(post=post1, tag=tag3)

        PostTag.objects.create(post=post2, tag=tag1)
        PostTag.objects.create(post=post2, tag=tag2)
        PostTag.objects.create(post=post2, tag=tag3)

        tag4 = Tag.objects.create(club=club2, name="genius", is_default=True)
        tag5 = Tag.objects.create(club=club2, name="winner")
        tag6 = Tag.objects.create(club=club2, name="loser")

        UserTag.objects.create(user=self.dummy_user, tag=tag6)

        PostTag.objects.create(post=post3, tag=tag4)
        PostTag.objects.create(post=post3, tag=tag5)
        PostTag.objects.create(post=post3, tag=tag6)

    # GET /api/club/:id
    def test_club_id(self) -> None:
        response = self.client.get("/api/club/1/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {"id": 1, "name": "Udong", "image": "image", "code": "swppfall"},
        )

    # GET /api/club/
    def test_club_list(self) -> None:
        response = self.client.get("/api/club/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {"id": 1, "name": "Udong", "image": "image", "code": "swppfall"},
                {"id": 2, "name": "Ramen", "image": "image", "code": "random"},
            ],
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
                {"id": 2, "name": "Nobel Prize", "time": []},
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
                    "is_default": True,
                },
                {
                    "id": 2,
                    "name": "winner",
                    "is_default": False,
                },
                {
                    "id": 3,
                    "name": "loser",
                    "is_default": False,
                },
            ],
        )

    # GET /api/club/:id/post/
    def test_club_post(self) -> None:
        # Check admin
        response = self.client.get("/api/club/1/post/")
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
                    "include_tag": [{"id": 1, "name": "genius", "is_default": True}],
                    "exclude_tag": [
                        {"id": 2, "name": "winner", "is_default": False},
                        {"id": 3, "name": "loser", "is_default": False},
                    ],
                },
                {
                    "id": 2,
                    "author": "Alan Turing",
                    "club": None,
                    "event": {"id": 2, "name": "Nobel Prize"},
                    "title": "Nobel prize is coming!",
                    "content": "Nobel Prize Nobel Prize Nobel Prize",
                    "type": "E",
                    "closed": False,
                    "include_tag": [{"id": 1, "name": "genius", "is_default": True}],
                    "exclude_tag": [
                        {"id": 2, "name": "winner", "is_default": False},
                        {"id": 3, "name": "loser", "is_default": False},
                    ],
                },
            ],
        )

        # Check member
        response = self.client.get("/api/club/2/post/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 3,
                    "author": "Alan Turing",
                    "club": None,
                    "event": None,
                    "title": "When to Meet?",
                    "content": "Really Boring",
                    "type": "S",
                    "closed": True,
                    "include_tag": [{"id": 6, "name": "loser", "is_default": False}],
                    "exclude_tag": [
                        {"id": 4, "name": "genius", "is_default": True},
                        {"id": 5, "name": "winner", "is_default": False},
                    ],
                }
            ],
        )
