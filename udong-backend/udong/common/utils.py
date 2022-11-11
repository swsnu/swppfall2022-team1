from django.test import TestCase
from typing import Dict, List
import json


JsonType = int | str | List["JsonType"] | Dict[str, "JsonType"]


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
        for key in ("created_at", "updated_at"):
            if key in json_j1:
                del json_j1[key]

        self.assertEqual(sorted(json_j1), sorted(json_j2))
