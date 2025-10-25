from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from .models import PortfolioItem, Testimonial, ContactSubmission, StyleQuizSubmission
from .serializers import PortfolioItemSerializer, TestimonialSerializer, ContactSubmissionSerializer, StyleQuizSubmissionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# The style_results dictionary defines the content for the different wedding styles.
# This is used to generate the personalized style guide email.
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
        "perfectFor": "Couples who love timeless romance and a touch of glamour.",
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
        "perfectFor": "Couples who want a relaxed, personal, and heartfelt wedding.",
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
        "perfectFor": "Couples who are fashion-forward and love contemporary design.",
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
        "perfectFor": "Creative, free-spirited couples who want a non-traditional day.",
        "quote": "And into the forest I go, to lose my mind and find my soul."
    },
}


class PortfolioItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows portfolio items to be viewed or edited.
    Requires authentication for all actions except listing and retrieving.
    """
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class TestimonialViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows testimonials to be viewed or edited.
    Requires authentication for all actions except listing and retrieving.
    """
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for contact form submissions.
    Creating a submission is public, but listing, retrieving, updating,
    or deleting requires authentication.
    """
    queryset = ContactSubmission.objects.all().order_by('-submitted_at')
    serializer_class = ContactSubmissionSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class StyleQuizSubmissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for style quiz submissions.
    Creating a submission is public. All other actions require authentication.
    """
    queryset = StyleQuizSubmission.objects.all().order_by('-submitted_at')
    serializer_class = StyleQuizSubmissionSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def send_style_guide_email(self, request, pk=None):
        """
        A custom action to send a personalized style guide email to a client
        based on their quiz submission. This action is only available to authenticated users.
        """
        submission = self.get_object()
        style_key = submission.style

        if style_key in style_results:
            context = style_results[style_key]
            
            # Render the HTML content from a template
            html_message = render_to_string('portfolio/style_quiz_email.html', {'result': context})
            
            try:
                # Send the email
                send_mail(
                    subject=f"Your Personalized Wedding Style Guide: {context['title']}",
                    message='',  # Plain text message is not used as we are sending HTML
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[submission.email],
                    html_message=html_message,
                    fail_silently=False,
                )
                
                # Mark the submission as email_sent and save it
                submission.email_sent = True
                submission.save()
                
                return Response({'status': 'success', 'message': 'Email sent successfully.'}, status=status.HTTP_200_OK)
            except Exception as e:
                # Handle potential email sending errors
                return Response({'status': 'error', 'message': f'Failed to send email: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            # Handle cases where the style from the submission is not found
            return Response({'status': 'error', 'message': 'Style not found.'}, status=status.HTTP_400_BAD_REQUEST)


class StatsView(views.APIView):
    """
    A view to get dashboard statistics. This is a read-only endpoint
    and requires authentication to access.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Returns a count of various items in the database for the admin dashboard.
        """
        portfolio_count = PortfolioItem.objects.count()
        testimonial_count = Testimonial.objects.count()
        contact_submission_count = ContactSubmission.objects.count()
        quiz_submission_count = StyleQuizSubmission.objects.count()

        return Response({
            'portfolioItems': portfolio_count,
            'testimonials': testimonial_count,
            'contactSubmissions': contact_submission_count,
            'quizSubmissions': quiz_submission_count
        })