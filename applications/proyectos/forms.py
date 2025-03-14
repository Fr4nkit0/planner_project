from django import forms
from .models import Proyecto, Pizarra, Nota


class ProyectoForm(forms.ModelForm):
    class Meta:
        model = Proyecto
        fields = ['nombre', 'descripcion', 'fecha_entrega']

    def save(self, usuario=None, *args, **kwargs):
        proyecto = super().save(commit=False)
        if usuario:
            proyecto.usuario = usuario
        proyecto.save()
        return proyecto


class ActualizarProyectoForm (forms.ModelForm):
    class Meta:
        model = Proyecto
        fields = ['nombre', 'descripcion']


class PizarraForm(forms.ModelForm):
    class Meta:
        model = Pizarra
        fields = ['nombre']

    def save(self, usuario=None, proyecto=None, *args, **kwargs):
        pizarra = super().save(commit=False)
        if usuario:
            pizarra.usuario = usuario
        if proyecto:
            pizarra.proyecto = proyecto
        pizarra.save()
        return pizarra


class NotaForm(forms.ModelForm):
    class Meta:
        model = Nota
        fields = ['titulo', 'descripcion', 'pendiente', 'color']

    def save(self, usuario=None, pizarra=None, *args, **kwargs):
        nota = super().save(commit=False)
        if usuario:
            nota.usuario = usuario
        if pizarra:
            nota.pizarra = pizarra
        nota.save()
        return nota
