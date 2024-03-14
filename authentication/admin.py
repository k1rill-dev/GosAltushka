from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, UserPhoto


class PhotoInline(admin.StackedInline):
    model = UserPhoto


class CustomUserAdmin(UserAdmin):
    inlines = (PhotoInline,)


admin.site.register(User, CustomUserAdmin)
admin.site.register(UserPhoto)
