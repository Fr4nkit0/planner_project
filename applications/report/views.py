from django.shortcuts import render

# Create your views here.


def listar_reportes_view(request):
    """
    Vista que renderiza la pantalla para mostrar el listado de reportes
    """
    contexto = {}

    return render(request, 'report/listar_reportes_page.html', contexto)


def alta_reportes_view(request):
    """
    Vista que renderiza la pantalla para dar de alta un reporte
    """
    contexto = {}

    return render(request, 'report/alta_reportes_page.html', contexto)


def listar_reportes_ajax_view(request):
    """
    Vista que envia la lista de reportes en json 
    """
    pass


def listar_reportes_ajax_view(request):
    """
    Vista que envia la lista de reportes en json 
    """
    pass
