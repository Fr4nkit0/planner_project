from django.urls import path
from .views import (listar_proyectos_page_view,
                    crear_proyecto_ajax_view,
                    crear_pizarra_ajax_view,
                    listar_proyectos_ajax_view,
                    listar_notas_page_view
                    )
urlpatterns = [
    path('',
         listar_proyectos_page_view,
         name='listar_proyectos_page'),
    path('ajax/crear-proyectos',
         crear_pizarra_ajax_view,
         name='crear_proyecto_ajax_view'
         ),
    path('ajax/crear-pizarra',
         crear_proyecto_ajax_view,
         name='crear_pizarra_ajax_view'
         ),
    path('ajax/listar-proyectos',
         listar_proyectos_ajax_view,
         name='listar_proyectos_ajax_view'
         ),
    path('listar-notas/<int:pizarra_id>',
         listar_notas_page_view,
         name='listar_notas_page'
         )
]
