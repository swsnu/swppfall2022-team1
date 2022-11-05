import os
from user.models import User, UserClub
from club.models import Club

# Refresh DB
os.system("rm -f db.sqlite3")
os.system("make migrate")

# Create dummy user
user1 = User.objects.create(name="Alan Turing")

# Create dummy club
club1 = Club.objects.create(name="Udong", code="swppfall")
club2 = Club.objects.create(name="Ramen", code="random")

# Register club
UserClub.objects.create(user=user1, club=club1, auth="A")
UserClub.objects.create(user=user1, club=club2, auth="M")
