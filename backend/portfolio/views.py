from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PortfolioItem, Testimonial, ContactSubmission, StyleQuizSubmission
from .serializers import (
    PortfolioItemSerializer,
    TestimonialSerializer,
    ContactSubmissionSerializer,
    StyleQuizSubmissionSerializer,
)
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

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

    style_results = {
        "Classic Elegance": {
            "title": "Your style is: Classic Elegance!",
            "description": "You dream of a timeless, fairytale wedding. It's all about sophistication, romance, and grand gestures.",
            "elements": ["Crystal chandeliers", "Lush white florals", "String quartets", "Calligraphy"],
            "palette": [
                {"name": "Ivory", "hex": "#F5F5DC"},
                {"name": "Gold", "hex": "#FFD700"},
                {"name": "White", "hex": "#FFFFFF"},
                {"name": "Dusty Blue", "hex": "#B0C4DE"}
            ],
            "perfect_for": "Couples who love timeless romance and a touch of glamour.",
            "quote": "Every love story is beautiful, but ours is my favorite."
        },
        "Rustic Romance": {
            "title": "Your style is: Rustic Romance!",
            "description": "You love a warm, charming, and down-to-earth celebration. It's cozy, intimate, and connected to nature.",
            "elements": ["Barn venues", "String lights", "Wildflower bouquets", "Wooden details"],
            "palette": [
                {"name": "Earthy Brown", "hex": "#8B4513"},
                {"name": "Sage Green", "hex": "#9DC183"},
                {"name": "Cream", "hex": "#FFFDD0"},
                {"name": "Blush", "hex": "#FEEAE6"}
            ],
            "perfect_for": "Couples who want a relaxed, personal, and heartfelt wedding.",
            "quote": "In a field of wildflowers, I chose you."
        },
        "Modern Minimalist": {
            "title": "Your style is: Modern Minimalist!",
            "description": "You appreciate clean lines, chic design, and a sophisticated urban feel. It's all about intentionality and style.",
            "elements": ["Art galleries or lofts", "Monochromatic colors", "Geometric shapes", "Minimalist decor"],
            "palette": [
                {"name": "Black", "hex": "#000000"},
                {"name": "White", "hex": "#FFFFFF"},
                {"name": "Grey", "hex": "#808080"},
                {"name": "Slate", "hex": "#405D72"}
            ],
            "perfect_for": "Couples who are fashion-forward and love contemporary design.",
            "quote": "Love is not about possession. It's about appreciation."
        },
        "Bohemian Dream": {
            "title": "Your style is: Bohemian Dream!",
            "description": "You're a free spirit who wants a relaxed, intimate, and nature-inspired wedding. It's unconventional and deeply personal.",
            "elements": ["Outdoor settings", "Pampas grass", "Macrame details", "Flowing dresses"],
            "palette": [
                {"name": "Terracotta", "hex": "#E2725B"},
                {"name": "Sage", "hex": "#B2AC88"},
                {"name": "Dusty Rose", "hex": "#DCAE96"},
                {"name": "Cream", "hex": "#FFFDD0"}
            ],
            "perfect_for": "Creative, free-spirited couples who want a non-traditional day.",
            "quote": "And into the forest I go, to lose my mind and find my soul."
        },
    }

    @action(detail=True, methods=['post'])
    def send_style_guide_email(self, request, pk=None):
        submission = self.get_object()
        if submission.email_sent:
            return Response({'status': 'Email already sent.'}, status=status.HTTP_400_BAD_REQUEST)
        
        html_message = render_to_string('portfolio/style_quiz_email.html', {
            'submission': submission,
            'style_result': self.style_results.get(submission.style, {}),
        })
        
        send_mail(
            subject=f"Your Personalized Wedding Style Guide from The First Knot - {submission.style}",
            message=f"Hello {submission.name}, thank you for taking our style quiz! Your results are: {submission.style}.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[submission.email],
            html_message=html_message,
        )

        submission.email_sent = True
        submission.save()

        serializer = StyleQuizSubmissionSerializer(submission)
        return Response(serializer.data)

class StatsView(viewsets.ViewSet):
    def list(self, request):
        stats = {
            'portfolioItems': PortfolioItem.objects.count(),
            'testimonials': Testimonial.objects.count(),
            'contactSubmissions': ContactSubmission.objects.count(),
            'quizSubmissions': StyleQuizSubmission.objects.count(),
        }
        return Response(stats)