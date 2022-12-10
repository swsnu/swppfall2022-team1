from common.utils import MyTestCase
from club.models import Club
from user.models import UserClub
from tag.models import Tag, UserTag

# Create your tests here.


class TagTestCase(MyTestCase):
    def setUp(self) -> None:
        super().setUp()

        club1 = Club.objects.create(name="Udong", code="swppfall")
        UserClub.objects.create(user=self.dummy_user, club=club1, auth="A")

        tag1 = Tag.objects.create(club=club1, name="genius", is_default=True)
        tag2 = Tag.objects.create(club=club1, name="winner")
        tag3 = Tag.objects.create(club=club1, name="loser")

        UserTag.objects.create(user=self.dummy_user, tag=tag1)

    # GET /api/tag/:id/
    def test_get_tag(self) -> None:
        response = self.client.get("/api/tag/99/")
        self.assertEqual(response.status_code, 404)

        response = self.client.get("/api/tag/1/")
        self.assertEqual(response.status_code, 200)
        self.jsonEqual(
            response.content,
            {
                "id": 1,
                "name": "genius",
                "is_default": True,
                "users": [
                    {
                        "id": 1,
                        "email": "alan@snu.ac.kr",
                        "time_table": "001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
                        "name": "Alan Turing",
                    }
                ],
            },
            ["image"],
        )
