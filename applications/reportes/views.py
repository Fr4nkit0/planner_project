from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Reporte
from .forms import CreacionReporteForm

def listar_reportes_ajax_view(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    try:
        reportes = Reporte.objects.all()
        data = [
            {
                'id': reporte.id,
                'titulo': reporte.titulo,
                'descripcion': reporte.descripcion,
                'usuario': reporte.usuario.username if reporte.usuario else None,
                'fecha_creacion': reporte.fecha_creacion.strftime('%d/%m/%Y')
            }
            for reporte in reportes
        ]
        return JsonResponse({'reportes': data}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def crear_reporte_ajax_view(request):
    if request.method == 'POST':
        form = CreacionReporteForm(request.POST)
        if form.is_valid():
            reporte = form.save()
            return JsonResponse({'success': 'Reporte creado correctamente'}, status=201)
        else:
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