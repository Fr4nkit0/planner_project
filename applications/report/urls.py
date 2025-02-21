from django.urls import path
from .views import (
    listar_reportes_view,
    alta_reportes_view,
    listar_reportes_ajax_view,
    listar_reportes_select2_view
)
urlpatterns = [
    path(
        'listar-reportes',
        listar_reportes_view,
        name="listar_reportes"
    ),
    path(
        'alta-reportes',
        alta_reportes_view,
        name="alta_reportes"
    ),
    path(
        'ajax/listar-reportes',
        listar_reportes_ajax_view,
        name="listar_reportes_ajax"
    ),
    path(
        'select2/listar-reportes',
        listar_reportes_select2_view,
        name="listar_reportes_select2"
    ),
]
