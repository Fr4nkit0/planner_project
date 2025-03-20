// validation.js

export function validateUsername(usernameInput, usernameError) {
    const value = usernameInput.value.trim();
    if (!value) {
        usernameError.textContent = 'El nombre de usuario es obligatorio.';
        return false;
    }
    usernameError.textContent = '';
    return true;
}

export function validatePassword(passwordInput, passwordError) {
    const value = passwordInput.value.trim();
    if (!value) {
        passwordError.textContent = 'La contraseña es obligatoria.';
        return false;
    }
    if (value.length < 8) {
        passwordError.textContent = 'Debe tener al menos 8 caracteres.';
        return false;
    }
    passwordError.textContent = '';
    return true;
}
