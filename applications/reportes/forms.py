from django.forms import ModelForm
from .models import Reporte

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