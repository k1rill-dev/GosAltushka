from django.db import models

from authentication.models import User


class Shipping(models.Model):
    scuf = models.ForeignKey(to=User, on_delete=models.CASCADE, unique=True, verbose_name="Скуф", related_name='scuf')
    altushka = models.ForeignKey(to=User, on_delete=models.CASCADE, unique=True, verbose_name="Альтушка",
                                 related_name='altushka')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    is_active = models.BooleanField(default=False, verbose_name="Общаются ли?")
    address = models.CharField(max_length=200, verbose_name="Адрес доставки альтушки")

    def __str__(self):
        return f"{self.scuf} x {self.altushka}"
