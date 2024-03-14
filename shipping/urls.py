from django.urls import path

from .views import RecommendationView, ShippingView, GetAltushka

urlpatterns = [
    path('get-recommendation', RecommendationView.as_view(), name='recommendation'),
    path('create-ship', ShippingView.as_view(), name='shipping'),
    path('get-alt', GetAltushka.as_view(), name='get-alt')
]