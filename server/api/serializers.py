from rest_framework.serializers import ModelSerializer
from .models import CampusAmbassador

class CampusAmbassadorSerializer(ModelSerializer):
    class Meta:
        model = CampusAmbassador
        fields = ['name', 'college', 'referral_code']