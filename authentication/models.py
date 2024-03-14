from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    ALTUSHKA = 1
    SCUF = 2

    ROLE_CHOICES = (
        (ALTUSHKA, 'Альтушка'),
        (SCUF, 'Скуф')
    )

    email = models.EmailField(_("email address"), unique=True)
    last_login = models.DateTimeField(_("last login"), default=timezone.now)
    who_are_you = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=False, null=False,
                                                   verbose_name="Кто ты?", default=SCUF)
    dota_mmr = models.PositiveIntegerField(blank=False, null=False, default=1, verbose_name="Рейтинг в доте(ммр)")
    dota_pos = models.PositiveIntegerField(blank=False, null=False, default=1, verbose_name="Позиция в доте")
    tanks_rating = models.PositiveIntegerField(blank=False, null=False, default=1, verbose_name="Рейтинг в танках")
    description = models.TextField(default='aboba', blank=False, null=False, verbose_name="О себе")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class UserPhoto(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE
                                , verbose_name='Пользователь')
    photo = models.ImageField(upload_to=f'avatar/%Y/%m/%d', null=True, verbose_name='Фото')
