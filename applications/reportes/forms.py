from django.forms import ModelForm
from .models import Reporte

class CreacionReporteForm(ModelForm):
    class Meta:
        model = Reporte
        fields = ['titulo', 'descripcion']