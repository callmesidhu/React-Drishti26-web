from django.contrib import admin
from .models import CampusAmbassador, Event, EventLink


class EventLinkInline(admin.TabularInline):
    model = EventLink
    extra = 1


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_type', 'area', 'is_featured', 'is_published', 'updated_at')
    list_filter = ('event_type', 'is_featured', 'is_published')
    search_fields = ('title', 'slug', 'area')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [EventLinkInline]


admin.site.register(CampusAmbassador)
