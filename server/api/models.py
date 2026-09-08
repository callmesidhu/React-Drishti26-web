from django.db import models


class CampusAmbassador(models.Model):
    name = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    points = models.IntegerField(default=0)
    referral_code = models.CharField(max_length=10, unique=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.referral_code})"


class Event(models.Model):
    class EventType(models.TextChoices):
        WORKSHOP = "workshop", "Workshop"
        COMPETITION = "competition", "Competition"
        DAKSHA = "daksha", "Daksha"

    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True)
    event_type = models.CharField(max_length=20, choices=EventType.choices)
    area = models.CharField(max_length=80, blank=True)
    description = models.TextField(blank=True)
    poster = models.FileField(upload_to="events/posters/", blank=True)
    details = models.TextField(blank=True)
    eligibility = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at", "title"]

    def __str__(self):
        return self.title


class EventLink(models.Model):
    event = models.ForeignKey(Event, related_name="links", on_delete=models.CASCADE)
    label = models.CharField(max_length=80)
    url = models.URLField(max_length=500)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.event.title}: {self.label}"
