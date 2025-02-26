from django.urls import path
from .views import prueba_config_view

urlpatterns = [
    path('',
         prueba_config_view,
         name='prueba_config_view')
]
