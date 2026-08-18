from django.urls import path
from .views import AmbassadorLeaderboardAPIView

urlpatterns = [
    path('api/ambassador/leaderboard/', AmbassadorLeaderboardAPIView.as_view()),
    # path('api/ambassador/add_points/', admin.site.urls),
    # path('api/ambassador/add', admin.site.urls),
]