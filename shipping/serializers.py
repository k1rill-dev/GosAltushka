from rest_framework import serializers

from authentication.serializers import UserSerializer
from shipping.models import Shipping


class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = ('scuf', 'altushka', 'address', 'is_active')
