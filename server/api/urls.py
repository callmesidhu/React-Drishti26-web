from django.urls import path
from .views import AmbassadorLeaderboardAPIView, AddPointsLeaderboardAPIView

urlpatterns = [
    path('api/ambassador/leaderboard/', AmbassadorLeaderboardAPIView.as_view()),
    path('api/ambassador/add_points/', AddPointsLeaderboardAPIView.as_view()),
    # path('api/ambassador/add', admin.site.urls),
]