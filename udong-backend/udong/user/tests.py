from django.test import Client
from common.utils import MyTestCase
from user.models import User
import json

# Create your tests here.


class UserTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()
        User.objects.create_user(
            email="john@snu.ac.kr",
            name="John Backus",
            time_table="001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
        )

    # GET /api/user/me/
    def test_user_me(self) -> None:
        self.assertEqual(User.objects.all().count(), 2)

        response = self.client.get("/api/user/me/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 1,
                "email": "alan@snu.ac.kr",
                "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                "name": "Alan Turing",
            },
            ["image"],
        )

    # GET /api/user/:id/
    def test_user_id(self) -> None:
        response = self.client.get("/api/user/2/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 2,
                "email": "john@snu.ac.kr",
                "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                "name": "John Backus",
            },
            ["image"],
        )

    # POST /api/auth/signin/
    def test_signin(self) -> None:
        response = self.client.post(
            "/api/auth/signin/",
            json.dumps({"email": "test@gmail.com", "token": "token", "name": "name"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

    # POST /api/auth/signout/
    def test_signout(self) -> None:
        response = self.client.post("/api/auth/signout/")
        self.assertEqual(response.status_code, 204)
