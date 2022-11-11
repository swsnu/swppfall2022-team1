from django.test import TestCase
from user.models import User
from typing import Dict, List
import json


JsonType = List["JsonType"] | Dict[str, "JsonType"] | int | str | bool | None


class MyJson:
    def __init__(self, json: JsonType) -> None:
        self.json = json

    # We don't have to check created_at & updated_at
    @staticmethod
    def remove_auto_generated_field(json: JsonType) -> None:
        if isinstance(json, dict):
            for key in ("created_at", "updated_at"):
                if key in json:
                    del json[key]
            for value in json.values():
                MyJson.remove_auto_generated_field(value)

        elif isinstance(json, list):
            for dictionary in json:
                MyJson.remove_auto_generated_field(dictionary)

    @staticmethod
    def compare(json1: JsonType, json2: JsonType) -> bool:
        if isinstance(json1, list) and isinstance(json2, list):
            if len(json1) != len(json2):
                return False
            for i in range(len(json1)):
                if MyJson.compare(json1[i], json2[i]) == False:
                    return False
            return True
        elif isinstance(json1, dict) and isinstance(json2, dict):
            if sorted(json1) != sorted(json2):
                return False
            for key in json1.keys():
                if MyJson.compare(json1[key], json2[key]) == False:
                    return False
            return True
        elif isinstance(json1, int) and isinstance(json2, int):
            return json1 == json2
        elif isinstance(json1, str) and isinstance(json2, str):
            return json1 == json2
        elif isinstance(json1, bool) and isinstance(json2, bool):
            return json1 == json2
        elif json1 is None and json2 is None:
            return True
        return False

    def __eq__(self, other: object) -> bool:
        if isinstance(other, MyJson):
            return MyJson.compare(self.json, other.json)
        else:
            return False


class MyTestCase(TestCase):

    # Compare json is equal
    #
    # example:
    # response = client.get(...)
    # jsonEqual(response.content, {"id": 1})
    def jsonEqual(self, j1: bytes, j2: JsonType) -> None:
        json_j1 = MyJson(json.loads(j1))
        json_j2 = MyJson(json.loads(json.dumps(j2)))

        MyJson.remove_auto_generated_field(json_j1.json)
        self.assertEqual(json_j1, json_j2)

    # Add Dummy User
    def setUp(self) -> None:
        self.dummy_user = User.objects.create(
            name="Alan Turing",
            google="google",
            image="image",
            time_table="001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
        )
