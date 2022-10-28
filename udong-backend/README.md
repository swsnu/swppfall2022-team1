This is a [Django](https://www.djangoproject.com/) project made by swppfall2022-team1.

## Getting Started

Please make the virtual environment and install some library.

```bash
virtualenv --python=python3.10.4 ~/.virtualenv/django-env
source django-env/bin/activate
pip install requirements.txt
```

## Run server

It is easy to run server.

```bash
cd udong
make
```

## Test

It is also easy to test the project.

```bash
cd udong
make test
make test_html // Show coverage report in html (Chrome)
```

## Learn more

To learn more about django, take a look at the following resources:

- [django documentation](https://docs.djangoproject.com/en/4.1/)
- [django rest framework](https://www.django-rest-framework.org/)
- [django-stubs](https://github.com/typeddjango/django-stubs)