from django.urls import path
from django.views.generic.base import RedirectView


urlpatterns = [
    path('', RedirectView.as_view(url= 'proyectos/' , permanent=False)),  # Redirige a '/listar-proyectos/'
]


