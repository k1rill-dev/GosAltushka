from django.db.models import QuerySet
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.views import APIView

from authentication.models import User, UserPhoto
from authentication.serializers import UserSerializer, PhotoSerializer


class PersonalCabinetView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request) -> JsonResponse:
        return JsonResponse(UserSerializer(request.user).data, safe=False)


class UploadPhotos(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request) -> JsonResponse:
        all_photos_of_user: QuerySet = UserPhoto.objects.filter(user=self.request.user)
        return JsonResponse(
            PhotoSerializer(all_photos_of_user, many=True).data, safe=False
        )

    def post(self, request: Request) -> JsonResponse:
        print(request.FILES.values())
        for photo in request.FILES.values():
            UserPhoto.objects.create(user=request.user, photo=photo)
        return JsonResponse({"success": True})


class GetPhotosOfAltushka(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request):
        return JsonResponse(
            PhotoSerializer(UserPhoto.objects.filter(user=request.data.get("id")), many=True).data, safe=False
        )
