from django import forms
from django.contrib.auth.forms import AuthenticationForm


class PersonalizadoLoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Usuario",
        widget=forms.TextInput(attrs={
            'class': 'form-control rounded-4 ',
            'placeholder': 'Ingresa tu usuario',
            'autocomplete': 'username'
        })
    )

    password = forms.CharField(
        label="Contraseña",
        widget=forms.PasswordInput(attrs={
            'class': 'form-control rounded-4',
            'placeholder': 'Ingresa tu contraseña',
            'autocomplete': 'current-password'
        })
    )
