from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.utils.timezone import now
from .models import Proyecto, Pizarra
from .forms import ProyectoForm, PizarraForm
# Create your views here.


def crear_proyecto_ajax_view(request):
    if request.method == 'POST':
        form = ProyectoForm(request.POST)
        if form.is_valid():
            pizarra = form.save(usuario=request.user)
            return JsonResponse({'success': 'Proyecto creado correctamente'}, status=201)
        else:
            return JsonResponse({'error': form.errors}, status=400)
    return JsonResponse({'error': "metodo no permitido"}, status=405)


# def actualizar_proyecto_ajax_view(request):
#     if request.method == 'POST':
#         try:
#             pk = request.get('pk')
#             nombre = request.get('nombre')
#             description = request.get('description')
#             fecha_entrega = request.get('fecha_entrega')

#             proyecto = get_object_or_404(Proyecto, pk=pk)
#             proyecto.nombre = nombre
#             proyecto.description = description
#             proyecto.fecha_entrega = fecha_entrega
#             proyecto.save()

#             return JsonResponse({'success': 'Proyecto actualizado correctamente'})
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=400)


def crear_pizarra_ajax_view(request):
    if request.method == 'POST':
        form = PizarraForm(request.POST)
        if form.is_valid():
            # Asigna el usuario desde el formulario
            pizarra = form.save(usuario=request.user)
            return JsonResponse({'mensaje': 'Pizarra Creada Exitosamente'}, status=201)
        else:
            return JsonResponse({'error': form.errors}, status=400)
    return JsonResponse({'error': 'Metodo no permitido'}, status=405)


def listar_proyectos_ajax_view(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    proyectos = Proyecto.objects.prefetch_related('pizarras').all()
    data = []

    for proyecto in proyectos:
        data.append({
            'id': proyecto.id,
            'nombre': proyecto.nombre,
            'descripcion': proyecto.descripcion,
            'fecha_inicio': proyecto.fecha_inicio,
            'fecha_entrega': proyecto.fecha_entrega,
            'pizarras': list(proyecto.pizarras.values('id', 'nombre'))
        })

    return JsonResponse({'proyectos': data}, status=200)


def listar_proyectos_page_view(request):
    return render(request, 'proyectos/pages/proyectos_page.html', {})


def listar_notas_page_view(request, pizarra_id):
    return render(request, 'proyectos/pages/notas_page.html', {})
