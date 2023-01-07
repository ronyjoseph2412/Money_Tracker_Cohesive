from django.db import models
import jsonfield
# Create your models here.
class User_data(models.Model):
    username = models.CharField(max_length=100)
    friends = jsonfield.JSONField(default={"friends":[]})
    groups = jsonfield.JSONField(default={"groups":[]})
    profession = models.CharField(default="",max_length=100)
    income = models.CharField(default="0",max_length=100)
    expense = models.CharField(default="0",max_length=100) 
    savings = models.CharField(default="0",max_length=100) 
    # ["Group Name / Self", "Category","Amount","Description","Date","Month","Year"]
    transcations = jsonfield.JSONField(default={"transcations":[]})
    def __str__(self):
        return self.username

class Group(models.Model):
    group_name = models.CharField(max_length=100)
    group_members = jsonfield.JSONField(default={"members":[]})
    group_expense = models.CharField(default="0",max_length=100)
    # ["Split_By",[[Split_Among,True/False]],"Category","Amount","Description","Date","Month","Year"]
    group_transcations = jsonfield.JSONField(default={"transcations":[]})
    def __str__(self):
        return self.group_name
# Create your models here.
