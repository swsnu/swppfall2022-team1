from pathlib import Path
import os
import environ  # type: ignore[import]
import secrets
import string


env = environ.Env(
    DEFAULT_IMAGES=(list, [""]),
)
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


class Random:
    @staticmethod
    def choice_image() -> str:
        return secrets.choice(env("DEFAULT_IMAGES"))  # type: ignore

    @staticmethod
    def generate_code(size: int = 10) -> str:
        return "".join(
            secrets.choice(string.ascii_letters + string.digits) for _ in range(size)
        )
