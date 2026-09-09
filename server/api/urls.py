from django.urls import path
from .views import (AmbassadorLeaderboardAPIView, 
                    AddPointsLeaderboardAPIView, 
                    AddCampusAmbassadorAPIView,
                    EventListAPIView,
                    EventDetailAPIView,
                    FeaturedEventListAPIView)

urlpatterns = [
    path('ambassador/leaderboard/', AmbassadorLeaderboardAPIView.as_view()),
    path('ambassador/add_points/', AddPointsLeaderboardAPIView.as_view()),
    path('ambassador/add/', AddCampusAmbassadorAPIView.as_view()),
    path('events/', EventListAPIView.as_view()),
    path('events/featured/', FeaturedEventListAPIView.as_view()),
    path('events/<slug:slug>/', EventDetailAPIView.as_view()),
]
