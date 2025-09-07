# backend/portfolio/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PortfolioItemViewSet,
    TestimonialViewSet,
    ContactSubmissionViewSet,
    StyleQuizSubmissionViewSet,
    StatsView
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'portfolio', PortfolioItemViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'contact', ContactSubmissionViewSet)
router.register(r'style-quiz', StyleQuizSubmissionViewSet)

# The API URLs are now determined automatically by the router.
# We also add the stats view manually.
urlpatterns = [
    path('', include(router.urls)),
    path('stats/', StatsView.as_view(), name='stats'), # Corrected this line
]