from rest_framework import viewsets
from .models import PortfolioItem, Testimonial, ContactSubmission, StyleQuizSubmission
from .serializers import (
    PortfolioItemSerializer,
    TestimonialSerializer,
    ContactSubmissionSerializer,
    StyleQuizSubmissionSerializer,
)

class PortfolioItemViewSet(viewsets.ModelViewSet):
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

class StyleQuizSubmissionViewSet(viewsets.ModelViewSet):
    queryset = StyleQuizSubmission.objects.all()
    serializer_class = StyleQuizSubmissionSerializer