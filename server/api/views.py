from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.response import Response
from rest_framework import status

from .models import CampusAmbassador, Event
from .serializers import CampusAmbassadorSerializer, EventSerializer

from django.shortcuts import get_object_or_404
from django.db.models import F


# Create your views here.
class AmbassadorLeaderboardAPIView(APIView):
    def get(self, request):
        ambassadors = CampusAmbassador.objects.order_by("-points")
        data = []

        for rank, ambassador in enumerate(ambassadors, start=1):
            data.append({
                "rank": rank,
                "name": ambassador.name,
                "college": ambassador.college,
                "points": ambassador.points,
            })

        return Response(data)
    

class AddPointsLeaderboardAPIView(APIView):
    permission_classes=[HasAPIKey]
    
    def post(self, request):
        referral_code = request.data.get('referral_code')
        if not referral_code:
            return Response(
                {"error": "referral_code is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        ambassador = get_object_or_404(CampusAmbassador, referral_code=referral_code)
        CampusAmbassador.objects.filter(
            id=ambassador.id
        ).update(
            points=F("points") + 1
        )
        
        ambassador.refresh_from_db()
        
        return Response(
            {
                "message": "Point added successfully",
                "referral_code": ambassador.referral_code,
                "points": ambassador.points,
            },
            status=status.HTTP_200_OK
        )

        
class AddCampusAmbassadorAPIView(CreateAPIView):
    serializer_class=CampusAmbassadorSerializer
    permission_classes=[HasAPIKey]


class EventListAPIView(APIView):
    def get(self, request):
        events = Event.objects.filter(is_published=True).prefetch_related('links')

        event_type = request.query_params.get('type')
        if event_type:
            events = events.filter(event_type=event_type)

        featured = request.query_params.get('featured')
        if featured in ('true', '1'):
            events = events.filter(is_featured=True)

        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventDetailAPIView(APIView):
    def get(self, request, slug):
        event = get_object_or_404(
            Event.objects.filter(is_published=True).prefetch_related('links'),
            slug=slug,
        )
        serializer = EventSerializer(event)
        return Response(serializer.data)


class FeaturedEventListAPIView(APIView):
    def get(self, request):
        events = Event.objects.filter(is_published=True, is_featured=True).prefetch_related('links')
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    
