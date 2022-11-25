from django.test import Client
from common.utils import MyTestCase
from post.models import Post, Enrollment, Scheduling, PostTag
from club.models import Club
from user.models import UserClub
from event.models import Event
from tag.models import Tag, UserTag

# Create your tests here.


class PostTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()

        club1 = Club.objects.create(name="Udong", code="swppfall")
        club2 = Club.objects.create(name="Ramen", code="random")
        UserClub.objects.create(user=self.dummy_user, club=club1, auth="A")
        UserClub.objects.create(user=self.dummy_user, club=club2, auth="M")

        event1 = Event.objects.create(club=club1, name="Turing award")
        event2 = Event.objects.create(club=club1, name="Nobel Prize")
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

        Enrollment.objects.create(post=post2, closed=False)
        Scheduling.objects.create(
            post=post3,
            type="D",
            dates=["2022-11-07"],
            start_time=25,
            end_time=40,
            closed=True,
        )

        tag1 = Tag.objects.create(club=club1, name="genius")
        tag2 = Tag.objects.create(club=club1, name="winner")
        tag3 = Tag.objects.create(club=club1, name="loser")

        UserTag.objects.create(user=self.dummy_user, tag=tag1)

        PostTag.objects.create(post=post1, tag=tag1)
        PostTag.objects.create(post=post1, tag=tag2)
        PostTag.objects.create(post=post1, tag=tag3)

        PostTag.objects.create(post=post2, tag=tag1)
        PostTag.objects.create(post=post2, tag=tag2)
        PostTag.objects.create(post=post2, tag=tag3)

        PostTag.objects.create(post=post3, tag=tag1)
        PostTag.objects.create(post=post3, tag=tag2)
        PostTag.objects.create(post=post3, tag=tag3)

    # api/post/club/:id/
    def test_post_club_id(self) -> None:
        # Check admin
        response = self.client.get("/api/post/club/1/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 1,
                    "event": "Turing award",
                    "title": "Turing award is coming!",
                    "content": "Turing award Turing award Turing award",
                    "type": "Announcement",
                    "closed": None,
                    "include_tag": [{"id": 1, "name": "genius"}],
                    "exclude_tag": [
                        {"id": 2, "name": "winner"},
                        {"id": 3, "name": "loser"},
                    ],
                },
                {
                    "id": 2,
                    "event": "Nobel Prize",
                    "title": "Nobel prize is coming!",
                    "content": "Nobel Prize Nobel Prize Nobel Prize",
                    "type": "Enrollment",
                    "closed": False,
                    "include_tag": [{"id": 1, "name": "genius"}],
                    "exclude_tag": [
                        {"id": 2, "name": "winner"},
                        {"id": 3, "name": "loser"},
                    ],
                },
            ],
        )

        # Check member
        response = self.client.get("/api/post/club/2/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 3,
                    "event": "",
                    "title": "When to Meet?",
                    "content": "Really Boring",
                    "type": "Scheduling",
                    "closed": True,
                    "include_tag": [{"id": 1, "name": "genius"}],
                    "exclude_tag": [
                        {"id": 2, "name": "winner"},
                        {"id": 3, "name": "loser"},
                    ],
                }
            ],
        )
