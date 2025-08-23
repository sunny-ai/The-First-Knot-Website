from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PortfolioItemViewSet,
    TestimonialViewSet,
    ContactSubmissionViewSet,
    StyleQuizSubmissionViewSet,
)

router = DefaultRouter()
router.register(r'portfolio', PortfolioItemViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'contact', ContactSubmissionViewSet)
router.register(r'style-quiz', StyleQuizSubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]