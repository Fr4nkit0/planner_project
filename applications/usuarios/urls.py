from django.urls import path
from .views import prueba_config_view, PersonalizacionLoginView

urlpatterns = [
    path('',
         prueba_config_view,
         name='prueba_config_view'),
    path("login",
         PersonalizacionLoginView.as_view(),
         name="login-page"
         )
]
