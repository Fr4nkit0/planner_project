from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, SetPasswordForm, PasswordResetForm
from .models import Usuario

class PersonalizadoLoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Usuario",
        widget=forms.TextInput(attrs={
            'class': 'form-control fw-bold',
            'placeholder': 'Usuario',
            'autocomplete': 'username'
        })
    )

    password = forms.CharField(
        label="Contraseña",
        widget=forms.PasswordInput(attrs={
            'class': 'form-control fw-bold',
            'placeholder': 'Contraseña',
            'autocomplete': 'current-password'
        })
    )

class PersonalizadoRegisterForm(UserCreationForm):
    class Meta:
        model = Usuario  # Asocia el formulario con tu modelo personalizado
        fields = ["username", "email", "password1", "password2"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Personalizar el campo de nombre de usuario
        self.fields['username'].widget.attrs.update({
            'class': 'form-control fw-bold',
            'placeholder': 'Nombre de usuario',
        })

        # Personalizar el campo de nombre de email
        self.fields['email'].widget.attrs.update({
            'class': 'form-control fw-bold',
            'placeholder': 'Correo electrónico',
        })

        # Personalizar el campo de contraseña (password1)
        self.fields['password1'].widget = forms.PasswordInput(attrs={
            'class': 'form-control  fw-bold',
            'placeholder': 'Contraseña',
            'autocomplete': 'current-password',
        })

        # Personalizar el campo de confirmación de contraseña (password2)
        self.fields['password2'].widget = forms.PasswordInput(attrs={
            'class': 'form-control fw-bold',
            'placeholder': 'Confirmar contraseña',
            'autocomplete': 'current-password',
        })

class PersonalizadoSetPasswordForm(SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Personaliza el campo new_password1
        self.fields['new_password1'].widget.attrs.update({
            'class': 'form-control  fw-bold',
            'placeholder': 'Nueva contraseña',  # Agrega un placeholder
        })

        # Personaliza el campo new_password2
        self.fields['new_password2'].widget.attrs.update({
            'class': 'form-control  fw-bold',
            'placeholder': 'Confirmar nueva contraseña',  # Agrega un placeholder
        })
        
class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['username', 'email']
