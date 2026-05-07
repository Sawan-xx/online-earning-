from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    education_qualification = models.CharField(max_length=255, blank=True)
    
    current_status = models.CharField(max_length=100, blank=True) # e.g. Student, Working Professional
    skills = models.TextField(blank=True, help_text="Comma separated skills")
    daily_free_time = models.CharField(max_length=50, blank=True) # e.g. '2 hours'
    monthly_income_goal = models.CharField(max_length=100, blank=True)
    investment_budget = models.CharField(max_length=50, blank=True) # Zero/Low/Medium/High
    preferred_work_type = models.CharField(max_length=100, blank=True)
    interested_in = models.TextField(blank=True) # Comma separated interests
    video_content_comfortable = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

class QuickEarnLink(models.Model):
    title = models.CharField(max_length=255)
    short_description = models.TextField()
    earning_type = models.CharField(max_length=100)
    platform_name = models.CharField(max_length=100)
    direct_link = models.URLField()
    earning_potential = models.CharField(max_length=100)
    beginner_friendly_level = models.CharField(max_length=50) # e.g. High / Medium / Low
    is_verified = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

class SuggestionResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='suggestions')
    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty_level = models.CharField(max_length=50)
    earning_potential = models.CharField(max_length=100)
    time_required = models.CharField(max_length=100)
    investment_needed = models.CharField(max_length=100)
    step_by_step_guide = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.title}"

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    content = models.TextField()
    avatar_url = models.URLField(blank=True)

    def __str__(self):
        return self.name
