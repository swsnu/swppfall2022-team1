# Generated by Django 4.1.2 on 2022-11-11 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("post", "0002_post_club"),
    ]

    operations = [
        migrations.AddField(
            model_name="scheduling",
            name="confirmed_time",
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name="scheduling",
            name="end_time",
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name="scheduling",
            name="start_time",
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name="scheduling",
            name="weekdays",
            field=models.CharField(max_length=7, null=True),
        ),
    ]
