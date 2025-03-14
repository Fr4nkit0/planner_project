from django.forms import ModelForm
from .models import Reporte
from django import forms

class CreacionReporteForm(ModelForm):
    class Meta:
        model = Reporte
        fields = ['titulo', 'descripcion']

    def save(self, usuario=None, commit=True, *args, **kwargs):
        reporte = super().save(commit=False)
        if usuario:
            reporte.usuario = usuario
        if commit:
            reporte.save()
        return reporte
    
    def clean_titulo(self):
        titulo = self.cleaned_data.get('titulo')
        if len(titulo) > 100:
            raise forms.ValidationError("El título no puede superar los 100 caracteres.")
        return titulo

    def clean_descripcion(self):
        descripcion = self.cleaned_data.get('descripcion')
        if len(descripcion) > 500:
            raise forms.ValidationError("La descripción no puede superar los 500 caracteres.")
        return descripcion