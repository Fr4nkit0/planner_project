from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Reporte
from .forms import CreacionReporteForm

def crear_reporte_ajax_view(request):
    if request.method == 'POST':
        form = CreacionReporteForm(request.POST)
        if form.is_valid():
            reporte = form.save(usuario=request.user)
            return JsonResponse({'success': 'Reporte creado correctamente'}, status=201)
        else:
            return JsonResponse({'error': form.errors}, status=400)
    return JsonResponse({'error': "metodo no permitido"}, status=405)

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

def listar_reportes_ajax_view(request):
    if request.method == 'GET':
        reportes = Reporte.objects.all()
        data = []
        for reporte in reportes:
            data.append({
                'id': reporte.id,
                'titulo': reporte.titulo,
                'descripcion': reporte.descripcion,
                'usuario': reporte.usuario.username if reporte.usuario else None,
                'fecha_creacion': reporte.fecha_creacion.strftime('%d/%m/%Y')
            })
        return JsonResponse({'reportes': data}, status=200)
    return JsonResponse({'error': "metodo no permitido"}, status=405)

def listar_reportes_page_view(request):
    return render(request, 'reportes/pages/reportes_page.html', {})