from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import QuickEarnLink, Category, SuggestionResult, Testimonial
# import razorpay
from django.shortcuts import render
from django.http import JsonResponse
from .serializers import (
    UserSerializer, QuickEarnLinkSerializer, CategorySerializer,
    SuggestionResultSerializer, TestimonialSerializer
)

User = get_user_model()




class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class QuickEarnLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = QuickEarnLink.objects.all()
    serializer_class = QuickEarnLinkSerializer
    permission_classes = [permissions.AllowAny]

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]

class SuggestionResultViewSet(viewsets.ModelViewSet):
    serializer_class = SuggestionResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SuggestionResult.objects.filter(user=self.request.user)

class GenerateSuggestionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        # Mock AI suggestion generation based on profile
        if user.current_status == "Student":
            suggestions = [
                {"title": "Freelancing on Fiverr", "difficulty_level": "Medium", "earning_potential": "$500/mo", "time_required": "2 hours/day", "investment_needed": "Zero", "step_by_step_guide": "1. Create account\n2. Setup gig\n3. Deliver work"},
                {"title": "Content Writing", "difficulty_level": "Low", "earning_potential": "$300/mo", "time_required": "1 hour/day", "investment_needed": "Zero", "step_by_step_guide": "Start a medium blog or offer on Upwork."}
            ]
        else:
            suggestions = [
                {"title": "YouTube Automation", "difficulty_level": "High", "earning_potential": "$2000/mo", "time_required": "4 hours/day", "investment_needed": "Low", "step_by_step_guide": "1. Pick niche\n2. Script\n3. Edit videos"},
                {"title": "Affiliate Marketing", "difficulty_level": "High", "earning_potential": "$5000/mo", "time_required": "2 hours/day", "investment_needed": "Medium", "step_by_step_guide": "1. Find product\n2. Create funnel\n3. Run ads"}
            ]
        
        # Clear old suggestions
        SuggestionResult.objects.filter(user=user).delete()
        
        results = []
        for s in suggestions:
            obj = SuggestionResult.objects.create(
                user=user,
                title=s["title"],
                description=f"Tailored suggestion based on your profile as a {user.current_status}. Highly suited for your time ({user.daily_free_time}).",
                difficulty_level=s["difficulty_level"],
                earning_potential=s["earning_potential"],
                time_required=s["time_required"],
                investment_needed=s["investment_needed"],
                step_by_step_guide=s["step_by_step_guide"]
            )
            results.append(SuggestionResultSerializer(obj).data)
            
        return Response(results, status=status.HTTP_201_CREATED)


# # Initialize Razorpay client with your test/live keys
# client = razorpay.Client(auth=('YOUR_RAZORPAY_KEY', 'YOUR_RAZORPAY_SECRET'))

# def verify_payment(request):
#     if request.method == 'POST':
#         import json
#         data = json.loads(request.body)

#         payment_id = data.get('paymentId')
#         try:
#             payment = client.payment.fetch(payment_id)

#             if payment['status'] == 'captured':
#                 # Add additional business logic if needed
#                 return JsonResponse({'success': True})
#             else:
#                 return JsonResponse({'success': False}, status=400)
#         except Exception as e:
#             return JsonResponse({'success': False, 'error': str(e)}, status=500)

#     return JsonResponse({'success': False, 'error': 'Invalid request'}, status=400)