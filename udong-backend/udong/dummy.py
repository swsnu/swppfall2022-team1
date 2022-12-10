import os
from user.models import User, UserClub
from club.models import Club
from event.models import Event
from timedata.models import Time
from tag.models import Tag, UserTag
from post.models import Post, PostTag, Enrollment, Scheduling
from comment.models import Comment
from datetime import date

# Refresh DB
os.system("rm -f db.sqlite3")
os.system("make migrate")

# Create dummy user
user1 = User.objects.create_user(
    email="alan@snu.ac.kr",
    name="Alan Turing",
    time_table="001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011001101100110110011011",
    is_staff=True,
)
user2 = User.objects.create_user(
    email="john@snu.ac.kr", name="John Backus", is_staff=True
)

# Create dummy club
club1 = Club.objects.create(name="Udong", code="swppfall")
club2 = Club.objects.create(name="Ramen", code="random")

# Create dummy tag
tag1 = Tag.objects.create(club=club1, name="전체", is_default=True)
tag2 = Tag.objects.create(club=club1, name="winner")
tag3 = Tag.objects.create(club=club1, name="loser")

# Add user in tag
UserTag.objects.create(user=user1, tag=tag1)


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
    start_date=date(2022, 11, 6),
    end_date=date(2022, 11, 7),
    start_time=10,
    end_time=30,
)

time2 = Time.objects.create(
    event=event1,
    type="D",
    start_date=date(2022, 11, 1),
    end_date=date(2022, 11, 2),
    start_time=15,
    end_time=35,
)

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
    type="E",
)

enrollment2 = Enrollment.objects.create(post=post2, closed=False)

post3 = Post.objects.create(
    author=user1,
    club=club2,
    title="When to Meet?",
    content="Really Boring",
    type="S",
)

scheduling3 = Scheduling.objects.create(
    post=post3,
    type="D",
    dates=["2022-11-07"],
    start_time=25,
    end_time=40,
    closed=True,
)

# Create dummy comment
comment1 = Comment.objects.create(
    user=user1,
    post=post1,
    content="Comment!",
)

comment2 = Comment.objects.create(
    user=user2,
    post=post1,
    content="Comment!",
)
# Add tag to post
PostTag.objects.create(post=post1, tag=tag1)
PostTag.objects.create(post=post1, tag=tag2)
PostTag.objects.create(post=post1, tag=tag3)

PostTag.objects.create(post=post2, tag=tag1)
PostTag.objects.create(post=post2, tag=tag2)
PostTag.objects.create(post=post2, tag=tag3)

PostTag.objects.create(post=post3, tag=tag1)
PostTag.objects.create(post=post3, tag=tag2)
PostTag.objects.create(post=post3, tag=tag3)
