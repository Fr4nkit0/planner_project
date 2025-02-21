from django.shortcuts import render

# Create your views here.


def prueba_config(request):
    return render(request, 'users/prueba_config.html')
