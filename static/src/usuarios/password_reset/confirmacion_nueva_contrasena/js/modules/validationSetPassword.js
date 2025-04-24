// validationSetPassword.js

export function validateNewPassword1(newPassword1Input, newPassword1Error) {
    if (newPassword1Input.value.length < 8) {
        newPassword1Error.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        return false;
    }
    newPassword1Error.textContent = '';
    return true;
}

export function validateNewPassword2(newPassword1Input, newPassword2Input, newPassword2Error) {
    if (newPassword2Input.value !== newPassword1Input.value) {
        newPassword2Error.textContent = 'Las contraseñas no coinciden.';
        return false;
    }
    newPassword2Error.textContent = '';
    return true;
}
