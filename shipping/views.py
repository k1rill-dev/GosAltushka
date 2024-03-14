from django.db.models import QuerySet, Q
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.views import APIView

from authentication.models import User
from authentication.serializers import UserSerializer
from shipping.models import Shipping
from shipping.serializers import ShippingSerializer


def _get_free_altushkis() -> QuerySet[User]:
    """
    Get free alt girls, which doesn't exist in Shipping table
    :return: QuerySet[User]
    """
    free_alt_girls = User.objects.exclude(
        Q(pk__in=Shipping.objects.values_list('scuf_id', flat=True)) |
        Q(pk__in=Shipping.objects.values_list('altushka_id', flat=True)) |
        Q(who_are_you=User.SCUF)
    )
    return free_alt_girls


def _check_pair(current_user: User) -> bool:
    """
    Checks the existence of a pair for the current user
    :param current_user:
    :return: True if exists, False if not
    """
    try:
        Shipping.objects.get(scuf_id=current_user.pk)
        return True
    except Shipping.DoesNotExist:
        return False


def _recommendation_altushkis(all_alt: QuerySet[User], current_scuf: User) -> list[User]:
    """
    Recommendation alt girls for current scuf user
    :param all_alt: QuerySet[User]
    :param current_scuf: User
    :return: list[User] of recommendation alt girls
    """
    recommended_altushkis: list[User] = []
    required_dota_mmr: float = current_scuf.dota_mmr - (current_scuf.dota_mmr * 30 / 100)
    required_tanks_rating: float = current_scuf.tanks_rating - (current_scuf.tanks_rating * 30 / 100)

    for altushka in all_alt:
        altushka_dota_pos = altushka.dota_pos == 4 or altushka.dota_pos == 5
        if (altushka.dota_mmr >= required_dota_mmr and altushka_dota_pos
                and altushka.tanks_rating >= required_tanks_rating):
            recommended_altushkis.append(altushka)
    return recommended_altushkis


class RecommendationView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        all_altushkis: QuerySet[User] = _get_free_altushkis()
        current_scuf: User = request.user
        recommended_altushkis: list[User] = _recommendation_altushkis(all_altushkis, current_scuf)

        return JsonResponse(
            UserSerializer(recommended_altushkis, many=True).data, safe=False)


class ShippingView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        if request.user.who_are_you == User.SCUF:
            if _check_pair(request.user):
                pair = Shipping.objects.get(scuf=request.user)
                return JsonResponse({**ShippingSerializer(pair).data, "pair": True}, safe=False)
            else:
                return JsonResponse({
                    "pair": False
                })
        elif request.user.who_are_you == User.ALTUSHKA:
            all_requests_from_scufs: QuerySet[Shipping] = Shipping.objects.filter(is_active=False)
            serializer = ShippingSerializer(all_requests_from_scufs, many=True)
            return JsonResponse({**serializer.data, "pair": True}, safe=False)

    def post(self, request: Request):
        if not _check_pair(request.user):
            data: dict = request.data
            serializer: ShippingSerializer = ShippingSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            else:
                return JsonResponse("Invalid data", status=400, safe=False)
        else:
            return JsonResponse({
                "message": "У тебя уже есть альтушка/запрос на альтушку обрабатывается"
            })


class GetAltushka(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request, *args, **kwargs):
        return JsonResponse(UserSerializer(User.objects.get(pk=request.data.get("altushka"))).data, safe=False)
