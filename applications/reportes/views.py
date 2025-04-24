from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Reporte
from .forms import CreacionReporteForm
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator

def listar_reportes_ajax_view(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    
    try:
        # Obtener parámetros de paginación y búsqueda
        page_number = request.GET.get('page', 1)
        search_query = request.GET.get('q', '').strip()
        
        # Si el usuario es superusuario, obtener todos los reportes
        if request.user.is_superuser:
            reportes = Reporte.objects.all().order_by('-fecha_creacion')
        else:
            # Si no es superusuario, obtener solo los reportes del usuario actual
            reportes = Reporte.objects.filter(usuario=request.user).order_by('-fecha_creacion')
        
        # Aplicar filtro de búsqueda si existe
        if search_query:
            reportes = reportes.filter(titulo__icontains=search_query)
            
        # Crear un paginador con 10 reportes por página
        paginator = Paginator(reportes, 10)
        
        try:
            # Obtener la página solicitada
            page = paginator.page(page_number)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
        data = [
            {
                'id': reporte.id,
                'titulo': reporte.titulo,
                'descripcion': reporte.descripcion,
                'usuario': reporte.usuario.username if reporte.usuario else None,
                'fecha_creacion': reporte.fecha_creacion.strftime('%d/%m/%Y')
            }
            for reporte in page
        ]
        
        # Obtener la página anterior y la página siguiente
        prev_page = page.previous_page_number() if page.has_previous() else None
        next_page = page.next_page_number() if page.has_next() else None
        print(paginator.num_pages)
        return JsonResponse({
            'reportes': data,
            'paginacion': {
                'total_paginas': paginator.num_pages,
                'pagina_actual': page_number,
                'pagina_anterior': prev_page,
                'pagina_siguiente': next_page
            }
        }, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@login_required
def crear_reporte_ajax_view(request):
    if request.method == 'POST':
        print(f"Usuario autenticado: {request.user}")
        form = CreacionReporteForm(request.POST)
        if form.is_valid():
            reporte = form.save(usuario=request.user)  # Asignar el usuario aquí
            print(f"Reporte guardado con usuario: {reporte.usuario}")
            return JsonResponse({'success': 'Reporte creado correctamente'}, status=201)
        else:
            print(f"Errores del formulario: {form.errors}")
            return JsonResponse({'error': form.errors}, status=400)
    return JsonResponse({'error': 'Método no permitido'}, status=405)


def actualizar_reporte_ajax_view(request):
    if request.method == 'POST':
        try:
            reporte_id = request.POST.get('reporte_id')
            reporte = Reporte.objects.get(id=reporte_id)
            form = CreacionReporteForm(request.POST, instance=reporte)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': 'Reporte actualizado correctamente'})
            else:
                return JsonResponse({'error': form.errors}, status=400)
        except Reporte.DoesNotExist:
            return JsonResponse({'error': 'Reporte no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def eliminar_reporte_ajax_view(request):
    if request.method == 'POST':
        reporte_id = request.POST.get('reporte_id')
        try:
            reporte = Reporte.objects.get(id=reporte_id)
            reporte.delete()
            return JsonResponse({'success': 'Reporte eliminado correctamente'})
        except Reporte.DoesNotExist:
            return JsonResponse({'error': 'Reporte no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def listar_reportes_page_view(request):
    return render(request, 'reportes/pages/reportes_page.html', {})