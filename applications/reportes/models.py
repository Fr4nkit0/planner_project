from django.db import models
from applications.core.models import ModeloBase

# Create your models here.

class Reporte(ModeloBase):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()

    class Meta:
        ordering = ['fecha_creacion']
        verbose_name = 'Reporte'
        verbose_name_plural = 'Reportes'
        db_table = 'reportes'

    def __str__(self):
        return self.titulo