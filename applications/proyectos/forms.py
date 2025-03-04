from django import forms
from .models import Proyecto, Pizarra


class ProyectoForm(forms.ModelForm):
    class Meta:
        model = Proyecto
        fields = ['nombre', 'descripcion', 'fecha_inicio', 'fecha_entrega']

    def save(self, usuario=None, *args, **kwargs):
        proyecto = super().save(commit=False)
        if usuario:
            proyecto.usuario = usuario
        proyecto.save()
        return proyecto


class PizarraForm(forms.ModelForm):
    class Meta:
        model = Pizarra
        fields = ['nombre', 'proyecto']

    def save(self, usuario=None, *args, **kwargs):
        pizarra = super().save(commit=False)
        if usuario:
            pizarra.usuario = usuario
        pizarra.save()
        return pizarra
