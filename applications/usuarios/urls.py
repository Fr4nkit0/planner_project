from django.urls import path
from .views import prueba_config_view, PersonalizacionLoginView, cerrar_sesion_view
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('',
         prueba_config_view,
         name='prueba_config_view'),
    path("login",
         PersonalizacionLoginView.as_view(),
         name="login_page"
         ),
     path('logout', cerrar_sesion_view, name='logout'),
]
