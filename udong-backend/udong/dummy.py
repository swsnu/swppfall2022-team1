import os
from user.models import User

# Refresh DB
os.system("rm -f db.sqlite3")
os.system("make migrate")

# Create dummy user
User.objects.create(name="Alan Turing")
