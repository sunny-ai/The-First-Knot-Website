from rest_framework import serializers
from .models import PortfolioItem, Testimonial, ContactSubmission, StyleQuizSubmission

class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'

class StyleQuizSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyleQuizSubmission
        fields = '__all__'