from django.urls import path
from .views import (
    crear_reporte_ajax_view,
    actualizar_reporte_ajax_view,
    eliminar_reporte_ajax_view,
    listar_reportes_ajax_view,
    listar_reportes_page_view,
)

urlpatterns = [
    path('', listar_reportes_page_view, name='listar_reportes_page'),
    path('ajax/crear-reporte', crear_reporte_ajax_view, name='crear_reporte_ajax_view'),
    path('ajax/actualizar-reporte', actualizar_reporte_ajax_view, name='actualizar_reporte_ajax_view'),
    path('ajax/eliminar-reporte', eliminar_reporte_ajax_view, name='eliminar_reporte_ajax_view'),
    path('ajax/listar-reportes', listar_reportes_ajax_view, name='listar_reportes_ajax_view'),
]