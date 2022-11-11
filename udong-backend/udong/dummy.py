import os
from user.models import User, UserClub
from club.models import Club
from event.models import Event
from timedata.models import Time
from tag.models import Tag
from post.models import Post
from post.models import PostTag
from post.models import Enrollment
from tag.models import UserTag
from datetime import datetime

# Refresh DB
os.system("rm -f db.sqlite3")
os.system("make migrate")

# Create dummy user
user1 = User.objects.create(
    name="Alan Turing",
    time_table="001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
)
user2 = User.objects.create(name="John Backus")

# Create dummy club
club1 = Club.objects.create(name="Udong", code="swppfall")
club2 = Club.objects.create(name="Ramen", code="random")

# Register club
UserClub.objects.create(user=user1, club=club1, auth="A")
UserClub.objects.create(user=user2, club=club1, auth="M")
UserClub.objects.create(user=user1, club=club2, auth="M")

# Create dummy event
event1 = Event.objects.create(club=club1, name="Turing award")
event2 = Event.objects.create(club=club1, name="Nobel Prize")

# Create dummy time
time1 = Time.objects.create(
    event=event1,
    type="D",
    start_date=datetime(2022, 11, 6),
    end_date=datetime(2022, 11, 7),
)

time2 = Time.objects.create(
    event=event1,
    type="D",
    start_date=datetime(2022, 11, 1),
    end_date=datetime(2022, 11, 2),
)

# Create dummy tag
tag1 = Tag.objects.create(club=club1, name="genius")
tag2 = Tag.objects.create(club=club1, name="winner")
tag3 = Tag.objects.create(club=club1, name="loser")

# Add user in tag
UserTag.objects.create(user=user1, tag=tag1)


# Create dummy post
post1 = Post.objects.create(
    author=user1,
    event=event1,
    club=club1,
    title="Turing award is coming!",
    content="Turing award Turing award Turing award",
    type="A",
)

post2 = Post.objects.create(
    author=user1,
    event=event2,
    club=club1,
    title="Nobel prize is coming!",
    content="Nobel Prize Nobel Prize Nobel Prize",
    type="P",
)

enrollment2 = Enrollment.objects.create(post=post2, closed=False)

# Add tag to post
PostTag.objects.create(post=post1, tag=tag1)
PostTag.objects.create(post=post1, tag=tag2)
PostTag.objects.create(post=post1, tag=tag3)

PostTag.objects.create(post=post2, tag=tag1)
PostTag.objects.create(post=post2, tag=tag2)
PostTag.objects.create(post=post2, tag=tag3)
