from django.contrib import admin
from .models import CampusAmbassador
from .models import Event, EventLink

# Register your models here.
admin.site.register(CampusAmbassador)
admin.site.register(Event)
admin.site.register(EventLink)