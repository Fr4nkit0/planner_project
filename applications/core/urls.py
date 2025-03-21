from django.urls import path
from django.views.generic.base import RedirectView


urlpatterns = [
    # Redirige a '/listar-proyectos/'
    path('', RedirectView.as_view(url='proyectos/', permanent=False)),
]
