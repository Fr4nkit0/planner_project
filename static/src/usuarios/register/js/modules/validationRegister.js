// validationRegister.js

export function validateUsername(usernameInput, usernameError) {
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'El nombre de usuario es obligatorio.';
        return false;
    }
    usernameError.textContent = '';
    return true;
}

export function validateEmail(emailInput, emailError) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'El correo electrónico es obligatorio.';
        return false;
    }
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'El correo electrónico no es válido.';
        return false;
    }
    emailError.textContent = '';
    return true;
}

export function validatePassword1(password1Input, password1Error) {
    if (password1Input.value.length < 8) {
        password1Error.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        return false;
    }
    password1Error.textContent = '';
    return true;
}

export function validatePassword2(password1Input, password2Input, password2Error) {
    if (password2Input.value !== password1Input.value) {
        password2Error.textContent = 'Las contraseñas no coinciden.';
        return false;
    }
    password2Error.textContent = '';
    return true;
}
