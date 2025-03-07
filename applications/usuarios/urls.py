from django.urls import path
from .views import prueba_config_view, PersonalizacionLoginView, PersonalizacionLogoutView, registro_usuario_view
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
    path('logout/', PersonalizacionLogoutView.as_view(), name='logout_page'),
    path('register/', registro_usuario_view, name='register_page'),
]
