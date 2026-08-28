from django.urls import path
from .views import (AmbassadorLeaderboardAPIView, 
                    AddPointsLeaderboardAPIView, 
                    AddCampusAmbassadorAPIView)

urlpatterns = [
    path('ambassador/leaderboard/', AmbassadorLeaderboardAPIView.as_view()),
    path('ambassador/add_points/', AddPointsLeaderboardAPIView.as_view()),
    path('ambassador/add/', AddCampusAmbassadorAPIView.as_view()),
]