from django.urls import path
from .views import (AmbassadorLeaderboardAPIView, 
                    AddPointsLeaderboardAPIView, 
                    AddCampusAmbassadorAPIView)

urlpatterns = [
    path('api/ambassador/leaderboard/', AmbassadorLeaderboardAPIView.as_view()),
    path('api/ambassador/add_points/', AddPointsLeaderboardAPIView.as_view()),
    path('api/ambassador/add/', AddCampusAmbassadorAPIView.as_view()),
]