import os
from user.models import User

# Refresh DB
os.system("rm db.sqlite3")
os.system("make migrate")

# Create dummy user
User.objects.create()
