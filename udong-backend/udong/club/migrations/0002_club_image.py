# Generated by Django 4.1.2 on 2022-12-04 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("club", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="club",
            name="image",
            field=models.CharField(default="", max_length=40),
            preserve_default=False,
        ),
    ]
