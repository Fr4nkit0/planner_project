from django.urls import path
from .views import listar_proyectos_page_view

urlpatterns = [
    path('',
         listar_proyectos_page_view,
         name='listar-proyectos-page')
]
