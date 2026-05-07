from django.contrib import admin
from .models import User, QuickEarnLink, Category, SuggestionResult, Testimonial

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'current_status', 'city')
    search_fields = ('email', 'full_name')

@admin.register(QuickEarnLink)
class QuickEarnLinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'earning_type', 'platform_name', 'is_verified', 'is_featured')
    list_filter = ('is_verified', 'is_featured', 'beginner_friendly_level')
    search_fields = ('title', 'platform_name')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(SuggestionResult)
class SuggestionResultAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'difficulty_level', 'earning_potential', 'created_at')
    search_fields = ('title', 'user__email')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role')
