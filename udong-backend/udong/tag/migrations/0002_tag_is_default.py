# Generated by Django 4.1.2 on 2022-12-08 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tag", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="tag",
            name="is_default",
            field=models.BooleanField(default=False),
        ),
    ]
