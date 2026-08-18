from django.db import models

# Create your models here.
class CampusAmbassador(models.Model):
    name = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    points = models.IntegerField()
    referral_code = models.CharField(max_length=10)
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)