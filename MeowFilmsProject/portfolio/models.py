from django.db import models

# Create your models here.
class WeddingInaquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True) # <-- ADD THIS LINE
    wedding_date = models.DateField(null=True, blank=True)
    massage = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __init__(self, *args, **kwarge):
        super().__init__(*args, **kwarge)

    def __str__(self):
        return f"Inquiry from {self.name} - {self.wedding_date}"