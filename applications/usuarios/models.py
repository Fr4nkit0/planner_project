from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    class Meta:
        db_table = "usuario"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
