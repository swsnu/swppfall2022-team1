from django.test import TestCase
from typing import Dict, List
import json


JsonType = str | List["JsonType"] | Dict[str, "JsonType"]


class MyTestCase(TestCase):
    def jsonEqual(self, j1: bytes, j2: JsonType) -> None:
        json_j1 = json.loads(j1)
        json_j2 = json.loads(json.dumps(j2))
        self.assertEqual(sorted(json_j1), sorted(json_j2))
