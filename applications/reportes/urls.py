from django.urls import path
from applications.reportes.views import ListaReporteView, DetalleReporteView, CreacionReporteView, ActualizacionReporteView, EliminacionReporteView
urlpatterns = [
    path('', ListaReporteView.as_view(), name= 'reportes'),
    path('reporte/<int:pk>/', DetalleReporteView.as_view(), name= 'reporte'),
    path('creacion_reporte/', CreacionReporteView.as_view(), name= 'creacion_reporte'),
    path('actualizacion_reporte/<int:pk>/', ActualizacionReporteView.as_view(), name= 'actualizacion_reporte'),
    path('eliminacion_reporte/<int:pk>/', EliminacionReporteView.as_view(), name= 'eliminacion_reporte'),
]
