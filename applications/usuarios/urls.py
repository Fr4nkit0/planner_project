from django.urls import path
from .views import prueba_config_view, PersonalizacionLoginView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',
         prueba_config_view,
         name='prueba_config_view'),
    path("login",
         PersonalizacionLoginView.as_view(),
         name="login_page"
         ),
]
