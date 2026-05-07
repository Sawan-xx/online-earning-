from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import QuickEarnLink, Category, SuggestionResult, Testimonial

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'email', 'full_name', 'mobile_number', 'password', 'age', 'gender',
            'city', 'state', 'education_qualification', 'current_status', 'skills',
            'daily_free_time', 'monthly_income_goal', 'investment_budget',
            'preferred_work_type', 'interested_in', 'video_content_comfortable'
        )

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            mobile_number=validated_data.get('mobile_number', ''),
            age=validated_data.get('age'),
            gender=validated_data.get('gender', ''),
            city=validated_data.get('city', ''),
            state=validated_data.get('state', ''),
            education_qualification=validated_data.get('education_qualification', ''),
            current_status=validated_data.get('current_status', ''),
            skills=validated_data.get('skills', ''),
            daily_free_time=validated_data.get('daily_free_time', ''),
            monthly_income_goal=validated_data.get('monthly_income_goal', ''),
            investment_budget=validated_data.get('investment_budget', ''),
            preferred_work_type=validated_data.get('preferred_work_type', ''),
            interested_in=validated_data.get('interested_in', ''),
            video_content_comfortable=validated_data.get('video_content_comfortable', False)
        )
        return user

class QuickEarnLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickEarnLink
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class SuggestionResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionResult
        fields = '__all__'
