

from django.shortcuts import render


def inicio_view(request):

    contexto = {}

    return render(request, 'core/inicio_page.html', contexto)
