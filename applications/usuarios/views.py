from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView

from django.shortcuts import render
from django.urls import reverse_lazy

from .forms import PersonalizadoLoginForm
from django.contrib.auth import get_user, logout


# Create your views here.


@login_required
def prueba_config_view(request):
    return render(request, 'usuarios/pages/perfil_page.html', {})


class PersonalizacionLoginView(LoginView):
    template_name = 'usuarios/pages/login_page.html'
    form_class = PersonalizadoLoginForm
    success_url = reverse_lazy('listar-proyectos-page')
