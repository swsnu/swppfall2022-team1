from django.test import Client
from common.utils import MyTestCase
from user.models import User

# Create your tests here.


class UserTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()
        User.objects.create(
            email="john@snu.ac.kr",
            name="John Backus",
            image="image2",
            time_table="001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
        )

    # api/user/me/
    def test_user_me(self) -> None:
        client = Client()
        self.assertEqual(User.objects.all().count(), 2)

        response = client.get("/api/user/me/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 1,
                "image": "image",
                "email": "alan@snu.ac.kr",
                "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                "name": "Alan Turing",
            },
        )

    # api/user/:id/
    def test_user_id(self) -> None:
        client = Client()

        response = client.get("/api/user/2/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 2,
                "image": "image2",
                "email": "john@snu.ac.kr",
                "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                "name": "John Backus",
            },
        )
