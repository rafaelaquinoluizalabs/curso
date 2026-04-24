from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from django.conf import settings

from django.apps import apps

from django.db import connection

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    name = models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clean up collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='1234'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='1234'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='1234'),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='1234'),
        ]

        # Activities
        Activity.objects.create(name='Run', user='ironman', team='Marvel')
        Activity.objects.create(name='Swim', user='spiderman', team='Marvel')
        Activity.objects.create(name='Bike', user='batman', team='DC')
        Activity.objects.create(name='Yoga', user='wonderwoman', team='DC')

        # Leaderboard
        Leaderboard.objects.create(user='ironman', team='Marvel', points=100)
        Leaderboard.objects.create(user='spiderman', team='Marvel', points=80)
        Leaderboard.objects.create(user='batman', team='DC', points=90)
        Leaderboard.objects.create(user='wonderwoman', team='DC', points=95)

        # Workouts
        Workout.objects.create(name='Chest Day', description='Bench press and pushups', user='ironman')
        Workout.objects.create(name='Web Training', description='Climbing and swinging', user='spiderman')
        Workout.objects.create(name='Gadgets', description='Batmobile and tech', user='batman')
        Workout.objects.create(name='Amazon Training', description='Strength and agility', user='wonderwoman')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))
