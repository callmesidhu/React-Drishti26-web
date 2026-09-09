from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import CampusAmbassador, Event, EventLink

class CampusAmbassadorSerializer(ModelSerializer):
    class Meta:
        model = CampusAmbassador
        fields = ['name', 'college', 'referral_code']


class EventLinkSerializer(ModelSerializer):
    class Meta:
        model = EventLink
        fields = ['label', 'url']


class EventSerializer(ModelSerializer):
    type = serializers.CharField(source='event_type')
    image = serializers.SerializerMethodField()
    alt = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    details = serializers.SerializerMethodField()
    eligibility = serializers.SerializerMethodField()
    registerOptions = EventLinkSerializer(source='links', many=True)

    class Meta:
        model = Event
        fields = [
            'id',
            'type',
            'slug',
            'title',
            'category',
            'area',
            'image',
            'alt',
            'description',
            'details',
            'eligibility',
            'registerOptions',
            'is_featured',
        ]

    def get_image(self, obj):
        if not obj.poster:
            return ''
        return obj.poster.url

    def get_alt(self, obj):
        return obj.title

    def get_category(self, obj):
        category_labels = {
            Event.EventType.WORKSHOP: 'WORKSHOPS',
            Event.EventType.COMPETITION: 'COMPETITIONS',
            Event.EventType.DAKSHA: 'DAKSHA',
        }
        return category_labels.get(obj.event_type, 'EVENTS')

    def get_details(self, obj):
        return self.text_to_lines(obj.details)

    def get_eligibility(self, obj):
        return self.text_to_lines(obj.eligibility)

    def text_to_lines(self, value):
        return [line.strip() for line in value.splitlines() if line.strip()]
