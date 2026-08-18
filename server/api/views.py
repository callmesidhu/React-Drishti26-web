from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CampusAmbassador


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