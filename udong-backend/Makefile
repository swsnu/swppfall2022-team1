run: check migrate
	python manage.py runserver

migrate:
	python manage.py makemigrations
	python manage.py migrate

check: check_format check_type

check_format:
	black --diff --check $(shell git ls-files '*.py')

check_type:
	mypy udong 

test:
	coverage run --branch --source='./udong' ./udong/manage.py test
	coverage report -m

test_html:
	coverage html
	google-chrome htmlcov/index.html

clean:
	rm -rf .mypy_cache htmlcov
