from django.urls import path, include
from rest_framework import routers

from personal_cabinet import views

router = routers.SimpleRouter()


urlpatterns = [
    path('personal-cabinet', views.PersonalCabinetView.as_view(), name='personal-cabinet'),
    path('update-photo', views.UploadPhotos.as_view(), name='upload-photo'),
    path('get-alt-photo', views.GetPhotosOfAltushka.as_view(), name='get-alt-photo')
]
