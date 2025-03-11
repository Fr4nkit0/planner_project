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
    path('logout/', 
         PersonalizacionLogoutView.as_view(), 
         name='logout_page'),
    path('register/', 
         registro_usuario_view, 
         name='register_page'),
    path('password_reset/', 
         auth_views.PasswordResetView.as_view(template_name='usuarios/components/password_reset_form.html'), 
         name='password_reset'),
    path('password_reset_done/', 
         auth_views.PasswordResetDoneView.as_view(template_name='usuarios/components/password_reset_done.html'), 
         name='password_reset_done'),
    path('reset/<uidb64>/<token>/', 
         auth_views.PasswordResetConfirmView.as_view(template_name='usuarios/components/password_reset_confirm.html'), 
         name='password_reset_confirm'),
    path('reset_done/', 
         auth_views.PasswordResetCompleteView.as_view(template_name='usuarios/components/password_reset_complete.html'), 
         name='password_reset_complete'),
]
