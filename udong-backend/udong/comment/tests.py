import json
from django.test import Client
from common.utils import MyTestCase
from club.models import Club
from user.models import UserClub, User
from post.models import Post
from comment.models import Comment

# Create your tests here.


class CommentTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()
        user1 = User.objects.create_user(
            email="john@snu.ac.kr",
            name="John Backus",
            image="image2",
            time_table="001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
        )
        club1 = Club.objects.create(name="Udong", code="swppfall")
        UserClub.objects.create(user=self.dummy_user, club=club1, auth="A")
        post1 = Post.objects.create(
            author=self.dummy_user,
            club=club1,
            title="POST TITLE",
            content="POST CONTENT",
            type="A",
        )
        Comment.objects.create(user=self.dummy_user, post=post1, content="FIRST")
        Comment.objects.create(user=user1, post=post1, content="SECOND")

    def test_update_comment(self) -> None:
        client = Client()
        response = client.put(
            "/api/comment/1/",
            json.dumps({"content": "NEW CONTENT"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 1,
                "user": {
                    "id": 1,
                    "image": "image",
                    "email": "alan@snu.ac.kr",
                    "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                    "name": "Alan Turing",
                },
                "post_id": 1,
                "content": "NEW CONTENT",
            },
        )

    def test_update_comment_fail(self) -> None:
        client = Client()
        response = client.put(
            "/api/comment/2/",
            json.dumps({"content": "NEW CONTENT"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 403)

    def test_delete_comment(self) -> None:
        client = Client()
        response = client.delete("/api/comment/1/")
        self.assertEqual(response.status_code, 200)

    def test_delete_comment_fail(self) -> None:
        client = Client()
        response = client.delete("/api/comment/2/")
        self.assertEqual(response.status_code, 403)
