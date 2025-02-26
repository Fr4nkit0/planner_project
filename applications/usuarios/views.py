from django.shortcuts import render

# Create your views here.


def prueba_config_view(request):
    return render(request, 'usuarios/pages/login_page.html', {})
