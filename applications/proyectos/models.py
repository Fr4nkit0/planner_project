from django.db import models
from applications.core.models import ModeloBase

# Create your models here.


class Proyecto(ModeloBase):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_inicio = models.DateField(auto_now_add=True)
    fecha_entrega = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['fecha_creacion']
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        db_table = 'proyectos'

    def __str__(self):
        return self.nombre


class Pizarra(ModeloBase):
    nombre = models.CharField(max_length=100)
    proyecto = models.ForeignKey(
        Proyecto, on_delete=models.CASCADE, related_name='pizarras', null=True, blank=True)

    class Meta:
        ordering = ['fecha_creacion']
        verbose_name = 'Pizarra'
        verbose_name_plural = 'Pizarras'
        db_table = 'pizarras'

    def __str__(self):
        return self.nombre


# class Etiqueta(models.Model):
#     COLORES = [
#         ('#FF5733', 'Rojo'),
#         ('#33FF57', 'Verde'),
#         ('#3357FF', 'Azul'),
#         ('#F4D03F', 'Amarillo'),
#         ('#8E44AD', 'Morado'),
#         ('#2C3E50', 'Negro'),
#     ]
#     descripcion = models.CharField(max_length=100)
#     color = models.CharField(max_length=7, choices=COLORES, default='#FF5733')

#     class Meta:
#         verbose_name = 'Etiqueta'
#         verbose_name_plural = 'Etiquetas'
#         db_table = 'etiquetas'

#     def __str__(self):
#         return self.descripcion

class Nota(ModeloBase):
    COLORES = [
        ('#F7C8D3', 'Rosado'),
        ('#FFD8B1', 'Naranja'),
        ('#B8E6C9', 'Verde'),
        ('#FCEFB4', 'Amarillo'),
        ('#D7C3FF', 'Morado'),
        ('#BEE3F8', 'Celeste'),
    ]
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    pizarra = models.ForeignKey(
        Pizarra, on_delete=models.CASCADE, related_name='notas', null=True, blank=True)
    estado = models.BooleanField(default=False)
    pendiente = models.DateField(
        null=False, blank=False, help_text="Fecha límite para la nota")
    color = models.CharField(max_length=7,  choices=COLORES, default='#FF5733')

    class Meta:
        ordering = ['fecha_creacion']
        verbose_name = 'Nota'
        verbose_name_plural = 'Notas'
        db_table = 'notas'

    def __str__(self):
        return self.titulo


class Archivo(ModeloBase):
    nota = models.ForeignKey(
        Nota, on_delete=models.CASCADE, related_name='archivos', null=True, blank=True)
    archivo = models.FileField(upload_to='archivos/', null=True, blank=True)

    class Meta:
        verbose_name = 'Archivo'
        verbose_name_plural = 'Archivos'
        db_table = 'archivos'

    def __str__(self):
        return self.archivo.name if self.archivo else 'Sin archivo'


class Comentario(ModeloBase):
    nota = models.ForeignKey(Nota, on_delete=models.CASCADE,
                             related_name='comentarios', null=True, blank=True)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)

    class Meta:
        ordering = ['fecha_creacion']
        verbose_name = 'Comentario'
        verbose_name_plural = 'Comentarios'
        db_table = 'comentarios'

    def __str__(self):
        return self.descripcion
