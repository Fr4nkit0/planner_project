from django.forms import ModelForm
from .models import Reporte

class CreacionReporteForm(ModelForm):
    class Meta:
        model = Reporte
        fields = ['titulo', 'descripcion']

    def save(self, usuario=None, *args, **kwargs):
        reporte = super().save(commit=False)
        if usuario:
            reporte.usuario = usuario
        reporte.save()
        return reporte
