from django.shortcuts import redirect, render, get_object_or_404
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
from .models import Nota, Proyecto, Pizarra
from .forms import ProyectoForm, PizarraForm, ActualizarProyectoForm, NotaForm
from django.contrib.auth.decorators import login_required
# Create your views here.


def crear_proyecto_ajax_view(request):
    if request.method == 'POST':
        form = ProyectoForm(request.POST)
        if form.is_valid():
            proyecto = form.save(usuario=request.user)
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


def actualizar_pizarra_ajax_view(request):
    if request.method == 'POST':
        try:
            pizarra_id = request.POST.get('pizarra_id')
            try:
                pizarra = Pizarra.objects.get(id=pizarra_id)
            except Pizarra.DoesNotExist:
                return JsonResponse({'error': 'Pizarra no encontrada'}, status=404)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)
            form = PizarraForm(request.POST, instance=pizarra)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': 'Pizarra actualizada correctamente'})
            else:
                return JsonResponse({'error': form.errors}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def eliminar_pizarra_ajax_view(request):
    if request.method == 'POST':
        pizarra_id = request.POST.get('pizarra_id')
        try:
            pizarra = Pizarra.objects.get(id=pizarra_id)
            pizarra.delete()
            return JsonResponse({'success': 'Pizarra eliminado correctamente'})
        except Pizarra.DoesNotExist:
            return JsonResponse({'error': 'Pizarra no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def listar_proyectos_ajax_view(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    try:
        proyectos = Proyecto.objects.prefetch_related('pizarras').all()
        # Obtener el término de búsqueda desde el parámetro 'q'
        search_query = request.GET.get('q', '').strip()
        # Aplicar filtro si se proporciona un término de búsqueda
        if search_query:
            proyectos = proyectos.filter(
                nombre__icontains=search_query)

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


def crear_nota_ajax_view(request):
    if request.method == 'POST':
        form = NotaForm(request.POST)
        if form.is_valid():
            try:
                pizarra_id = request.POST.get('pizarra_id')
                pizarra = Pizarra.objects.get(id=pizarra_id)
            except Pizarra.DoesNotExist:
                return JsonResponse({'error': 'Pizarra no encontrada'}, status=404)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)
            form.save(usuario=request.user, pizarra=pizarra)
            return JsonResponse({'mensaje': 'Nota Creada Exitosamente'}, status=201)
    return JsonResponse({'error': 'Método no permitido'}, status=405)


def obtener_nota_ajax_view(request, nota_id):
    if request.method == 'GET':
        try:
            nota = Nota.objects.get(id=nota_id)
        except Nota.DoesNotExist:
            return JsonResponse({'error': 'Nota no encontrada'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        data = {
            'id': nota.id,
            'titulo': nota.titulo,
            'descripcion': nota.descripcion,
            'etiqueta': nota.etiqueta.id if nota.etiqueta else None,
            'estado': nota.estado
        }
        return JsonResponse(data, status=200)
    return JsonResponse({'error': 'Método no permitido'}, status=405)


def listar_notas_ajax_view(request, pizarra_id):
    if request.method == 'GET':
        try:
            pizarra = Pizarra.objects.get(id=pizarra_id)
        except Pizarra.DoesNotExist:
            return JsonResponse({'error': 'Pizarra no encontrada'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        # Si la URL es: /listar_notas_ajax/1/?q=importante
        search_query = request.GET.get('q', '').strip()
        # Filtrar las notas por el término de búsqueda si se proporciona
        try:
            notas = pizarra.notas.all()
            if search_query:
                notas = notas.filter(titulo__icontains=search_query)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        # Obtener el número de página de los parámetros de la solicitud (por defecto es 1)
        page_number = request.GET.get('page', 1)
        # Crear un paginador con 20 notas por página
        paginator = Paginator(notas, 20)
        try:
            # Obtener la página solicitada
            page = paginator.page(page_number)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        data = [
            {
                'id': nota.id,
                'titulo': nota.titulo,
                'color': nota.color,
                'estado': nota.estado
            }
            for nota in page
        ]
        # Obtener la página anterior y la página siguiente
        prev_page = page.previous_page_number() if page.has_previous() else None
        next_page = page.next_page_number() if page.has_next() else None
        return JsonResponse({
            'notas': data,
            'paginacion': {
                'total_paginas': paginator.num_pages,
                'pagina_actual': page.number,
                'pagina_anterior': prev_page,
                'pagina_siguiente': next_page
            }
        }, status=200)
    return JsonResponse({'error': 'Método no permitido'}, status=405)


def listar_notas_page_view(request, pizarra_id):
    # Verificar si la pizarra existe
    if not Pizarra.objects.filter(id=pizarra_id).exists():
        return redirect('listar_proyectos_page')
    return render(request, 'proyectos/pages/notas_page.html', {})
