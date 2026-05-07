from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserRegistrationView, UserProfileView, QuickEarnLinkViewSet, CategoryViewSet,
    TestimonialViewSet, SuggestionResultViewSet, GenerateSuggestionsView 
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'quick-earn', QuickEarnLinkViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'suggestions', SuggestionResultViewSet, basename='suggestions')

urlpatterns = [
    path('auth/register/', UserRegistrationView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),
    path('generate-suggestions/', GenerateSuggestionsView.as_view(), name='generate-suggestions'),
    path('', include(router.urls)),
    # path('verify-payment/', verify_payment, name='verify-payment'),

]
