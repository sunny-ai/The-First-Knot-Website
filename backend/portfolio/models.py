# backend/portfolio/models.py
from django.db import models

class PortfolioItem(models.Model):
    CATEGORY_CHOICES = [
        ('Wedding Favours', 'Wedding Favours'),
        ('Wedding Invites', 'Wedding Invites'),
        ('Mehndi Favours & Invites', 'Mehndi Favours & Invites'),
        ('House Decoration', 'House Decoration'),
        ('Event Management', 'Event Management'),
        ('Others', 'Others'),
    ]
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio_images/')

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    event = models.CharField(max_length=100)
    text = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return self.name

class ContactSubmission(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('confirmed', 'Confirmed'),
        ('no_response', 'No Response'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    event_date = models.DateField(blank=True, null=True)
    event_type = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    submitted_at = models.DateTimeField(auto_now_add=True) # Add this line

    def __str__(self):
        return self.name

class StyleQuizSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    style = models.CharField(max_length=100)
    email_sent = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True) # Add this line

    def __str__(self):
        return f"{self.name} - {self.style}"