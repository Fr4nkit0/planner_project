from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView, View
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Reporte
from .forms import CreacionReporteForm
from django.urls import reverse_lazy
from django.contrib import messages

# Create your views here.
class BaseView(View):
    def dispatch(self, request, *args, **kwargs):
        id_reporte = self.kwargs.get('pk')
        if not str(id_reporte).isdigit():
            messages.error(request, "El ID del reporte no es valido")
            return redirect('reportes')
        if not Reporte.objects.filter(pk = id_reporte).exists():
            messages.error(request, "El reporte no fue encontrado")
            return redirect('reportes')
        return super().dispatch(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['anterior'] = self.request.GET.get('anterior', reverse_lazy('reportes'))
        return context
    
    def get_success_url(self):
        return self.request.GET.get('anterior', reverse_lazy('reportes'))

class ListaReporteView(ListView):
    model = Reporte
    context_object_name = 'reportes'
    template_name = 'reportes/pages/lista_reporte.html'
    
class DetalleReporteView(DetailView):
    model = Reporte
    context_object_name = 'reporte'
    template_name = 'reportes/pages/detalle_reporte.html'
    
    def get_object(self, queryset = None):
        reporte_id = self.kwargs.get('pk')
        try:
            return Reporte.objects.get(pk = reporte_id)
        except Reporte.DoesNotExist:
            return redirect('Reportes')
        
class CreacionReporteView(CreateView):
    model = Reporte
    form_class = CreacionReporteForm
    template_name = 'reportes/pages/formulario_reporte.html'
    success_url = reverse_lazy('reportes')
    
class ActualizacionReporteView(UpdateView, BaseView):
    model = Reporte
    form_class = CreacionReporteForm
    template_name = 'reportes/pages/formulario_reporte.html'
        
    def get_success_url(self,):
        return self.request.GET.get('anterior', reverse_lazy('reportes'))
    
class EliminacionReporteView(DeleteView, BaseView):
    model = Reporte
    template_name = 'reportes/pages/eliminacion_reporte.html'