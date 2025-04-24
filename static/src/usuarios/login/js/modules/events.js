// events.js

import { validateUsername, validatePassword } from './validation.js';

export function setupValidationEvents(form) {
    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Validación en tiempo real
    usernameInput.addEventListener('input', () => validateUsername(usernameInput, usernameError));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput, passwordError));

    // Validar antes de enviar el formulario
    form.addEventListener('submit', function (e) {
        const isUsernameValid = validateUsername(usernameInput, usernameError);
        const isPasswordValid = validatePassword(passwordInput, passwordError);

        if (!isUsernameValid || !isPasswordValid) {
            e.preventDefault(); // Evitar envío si hay errores
        }
    });
}
