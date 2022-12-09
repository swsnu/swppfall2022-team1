from pathlib import Path
import os
import environ  # type: ignore[import]
import secrets


env = environ.Env(
    DEFAULT_IMAGES=(list, [""]),
)
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


class Random:
    @staticmethod
    def choice_image() -> str:
        return secrets.choice(env("DEFAULT_IMAGES"))  # type: ignore
