from django.test import TestCase
from user.models import User
from typing import Dict, List
import json


JsonType = List["JsonType"] | Dict[str, "JsonType"] | int | str | None


class MyTestCase(TestCase):

    # Compare json is equal
    #
    # example:
    # response = client.get(...)
    # jsonEqual(response.content, {"id": 1})
    def jsonEqual(self, j1: bytes, j2: JsonType) -> None:
        json_j1 = json.loads(j1)
        json_j2 = json.loads(json.dumps(j2))

        # We don't have to check created_at & updated_at
        def remove_auto_generated_field(json: JsonType) -> None:
            if isinstance(json, dict):
                for key in ("created_at", "updated_at"):
                    if key in json:
                        del json[key]
                for value in json.values():
                    remove_auto_generated_field(value)

            elif isinstance(json, list):
                for dictionary in json:
                    remove_auto_generated_field(dictionary)

        remove_auto_generated_field(json_j1)

        self.assertEqual(sorted(json_j1), sorted(json_j2))

    # Add Dummy User
    def setUp(self) -> None:
        self.dummy_user = User.objects.create(
            name="Alan Turing",
            google="google",
            image="image",
            time_table="001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
        )
