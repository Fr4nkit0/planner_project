from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.utils.timezone import now
from .models import Proyecto, Pizarra
# Create your views here.


def crear_proyecto_ajax_view(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        description = request.POST.get('description')
        fecha_entrega = request.POST.get('fecha_entrega')
        try:
            proyecto = Proyecto.objects.create(
                nombre=nombre,
                description=description,
                fecha_inicio=now(),
                fecha_entrega=fecha_entrega)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def actualizar_proyecto_ajax_view(request):
    if request.method == 'POST':
        try:
            pk = request.get('pk')
            nombre = request.get('nombre')
            description = request.get('description')
            fecha_entrega = request.get('fecha_entrega')

            proyecto = get_object_or_404(Proyecto, pk=pk)
            proyecto.nombre = nombre
            proyecto.description = description
            proyecto.fecha_entrega = fecha_entrega
            proyecto.save()

            return JsonResponse({'success': 'Proyecto actualizado correctamente'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def crear_pizarra_ajax_view(request):
    if request.method == 'POST':
        try:
            pk = request.get('pk')
            nombre = request.get('nombre')

            proyecto = get_object_or_404(Proyecto, pk=pk)
            Pizarra.objects.create(nombre=nombre, proyecto=proyecto)

            return JsonResponse({'success': 'Pizarra creada correctamente'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def listar_proyectos_page_view(request):
    return render(request, 'proyectos/pages/proyectos_pages.html', {})
