from django.shortcuts import redirect, render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
from .models import Proyecto, Pizarra
from .forms import ProyectoForm, PizarraForm, ActualizarProyectoForm
from django.contrib.auth.decorators import login_required
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


def actualizar_proyecto_ajax_view(request):
    if request.method == 'POST':
        try:
            proyecto_id = request.POST.get('proyecto_id')
            proyecto = Proyecto.objects.get(id=proyecto_id)
            form = ActualizarProyectoForm(request.POST, instance=proyecto)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': 'Proyecto actualizado correctamente'})
            else:
                return JsonResponse({'error': form.errors}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def eliminar_proyecto_ajax_view(request):
    if request.method == 'POST':
        proyecto_id = request.POST.get('proyecto_id')
        try:
            proyecto = Proyecto.objects.get(id=proyecto_id)
            proyecto.delete()
            return JsonResponse({'success': 'Proyecto eliminado correctamente'})
        except Proyecto.DoesNotExist:
            return JsonResponse({'error': 'Proyecto no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def crear_pizarra_ajax_view(request):
    if request.method == 'POST':
        form = PizarraForm(request.POST)
        if form.is_valid():
            proyect_id = request.POST.get('proyecto_id')
            try:
                proyecto = Proyecto.objects.get(id=proyect_id)
            except Proyecto.DoesNotExist:
                return JsonResponse({'error': 'Proyecto no encontrado'}, status=404)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)
            pizarra = form.save(usuario=request.user, proyecto=proyecto)
            return JsonResponse({'mensaje': 'Pizarra Creada Exitosamente'}, status=201)
        else:
            return JsonResponse({'error': form.errors}, status=400)
    return JsonResponse({'error': 'Metodo no permitido'}, status=405)


def listar_proyectos_ajax_view(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    try:
        proyectos = Proyecto.objects.prefetch_related('pizarras').all()
        data = []
    except:
        return JsonResponse({'error': 'Error al obtener los proyectos'}, status=500)
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


@login_required
def listar_proyectos_page_view(request):
    return render(request, 'proyectos/pages/proyectos_page.html', {})


def listar_notas_ajax_view(request, pizarra_id):
    if request.method == 'GET':
        try:
            pizarra = Pizarra.objects.get(id=pizarra_id)
        except Pizarra.DoesNotExist:
            return JsonResponse({'error': 'Pizarra no encontrada'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        notas = pizarra.notas.all()
        data = [
            {
                'id': nota.id,
                'titulo': nota.titulo,
                'color': nota.etiqueta.color if nota.etiqueta else None,
                'estado': nota.estado
            }
            for nota in notas
        ]
        return JsonResponse({'notas': data}, status=200)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


def listar_notas_page_view(request, pizarra_id):
    # Verificar si la pizarra existe
    if not Pizarra.objects.filter(id=pizarra_id).exists():
        return redirect('listar_proyectos_page')
    return render(request, 'proyectos/pages/notas_page.html', {})
