from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render
from django.urls import reverse_lazy
from .forms import PersonalizadoLoginForm, PersonalizadoRegisterForm
from django.contrib.auth import get_user_model, login
from django.shortcuts import redirect 
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
import logging


# Create your views here.

User = get_user_model()  # Importa el modelo de usuario

logger = logging.getLogger(__name__) #logger para registrar cuándo y quién cierra sesión.

@login_required
def prueba_config_view(request):
    return render(request, 'usuarios/pages/perfil_page.html', {})

class PersonalizacionLoginView(LoginView):
    template_name = 'usuarios/pages/login_page.html'
    form_class = PersonalizadoLoginForm
    success_url = reverse_lazy('listar_proyectos_page')

class PersonalizacionLogoutView(LogoutView):
    next_page = reverse_lazy('login_page')  # Redirige a la página de inicio de sesión


def registro_usuario_view(request):
    if request.method == 'POST':
        form = PersonalizadoRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()  # Guarda el nuevo usuario
            login(request, user)  # Inicia sesión automáticamente después del registro
            return redirect('listar_proyectos_page')  # Redirige a la página de inicio
    else:
        form = PersonalizadoRegisterForm()
    return render(request, 'usuarios/pages/register_page.html', {'form': form})

class PersonalizacionUserInfoView(LoginRequiredMixin, TemplateView):
    template_name = 'usuarios/pages/user_info_page.html'