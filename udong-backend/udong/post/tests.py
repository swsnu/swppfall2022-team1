import json
from common.utils import MyTestCase
from post.models import Post, Enrollment, Scheduling, PostTag
from club.models import Club
from post.models import Participation
from user.models import UserClub
from event.models import Event
from tag.models import Tag, UserTag
from comment.models import Comment

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

        PostTag.objects.create(post=post3, tag=tag1)
        PostTag.objects.create(post=post3, tag=tag2)
        PostTag.objects.create(post=post3, tag=tag3)

        Comment.objects.create(user=self.dummy_user, post=post1, content="FIRST")
        Comment.objects.create(user=self.dummy_user, post=post1, content="SECOND")

    # GET /api/post/:id/comment/
    def test_get_post_id_comment(self) -> None:
        response = self.client.get("/api/post/1/comment/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 1,
                    "user": {
                        "id": 1,
                        "email": "alan@snu.ac.kr",
                        "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                        "name": "Alan Turing",
                    },
                    "post_id": 1,
                    "content": "FIRST",
                },
                {
                    "id": 2,
                    "user": {
                        "id": 1,
                        "email": "alan@snu.ac.kr",
                        "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                        "name": "Alan Turing",
                    },
                    "post_id": 1,
                    "content": "SECOND",
                },
            ],
            ["image"],
        )

    # POST /api/post/:id/comment/
    def test_post_post_id_comment(self) -> None:
        response = self.client.post(
            "/api/post/1/comment/",
            json.dumps({"content": "NEW COMMENT"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.jsonEqual(
            response.content,
            {
                "id": 3,
                "user": {
                    "id": 1,
                    "email": "alan@snu.ac.kr",
                    "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                    "name": "Alan Turing",
                },
                "post_id": 1,
                "content": "NEW COMMENT",
            },
            ["image"],
        )

    # GET /api/enroll/:id/status
    def test_enrollment_enrollment_id_status(self) -> None:
        response = self.client.get("/api/enroll/2/status/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 1,
                    "email": "alan@snu.ac.kr",
                    "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                    "name": "Alan Turing",
                },
            ],
            ["image"],
        )

    # PUT /api/enroll/:id/close
    def test_enrollment_enrollment_id_close(self) -> None:
        response = self.client.put("/api/enroll/2/close/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(response.content, {"post_id": 2, "closed": True})

    # GET /api/post
    def test_get_post(self) -> None:
        response = self.client.get("/api/post/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            [
                {
                    "id": 1,
                    "author": "Alan Turing",
                    "club": {
                        "id": 1,
                        "name": "Udong",
                        "code": "swppfall",
                    },
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
                    "club": {
                        "id": 1,
                        "name": "Udong",
                        "code": "swppfall",
                    },
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
                {
                    "id": 3,
                    "author": "Alan Turing",
                    "club": {
                        "id": 2,
                        "name": "Ramen",
                        "code": "random",
                    },
                    "event": None,
                    "title": "When to Meet?",
                    "content": "Really Boring",
                    "type": "S",
                    "closed": True,
                    "include_tag": [{"id": 1, "name": "genius", "is_default": True}],
                    "exclude_tag": [
                        {"id": 2, "name": "winner", "is_default": False},
                        {"id": 3, "name": "loser", "is_default": False},
                    ],
                },
            ],
            ["image"],
        )
