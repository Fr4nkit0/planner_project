// eventHandlers.js
import { ValidationModule } from './validationModule.js';

export function initEventHandlers() {
    // Seleccionar elementos del DOM
    const form = document.getElementById('loginForm');
    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Validación en tiempo real
    usernameInput.addEventListener('input', () => {
        ValidationModule.validateUsername(usernameInput, usernameError);
    });

    passwordInput.addEventListener('input', () => {
        ValidationModule.validatePassword(passwordInput, passwordError);
    });

    // Validación antes de enviar el formulario
    form.addEventListener('submit', function (e) {
        const isUsernameValid = ValidationModule.validateUsername(usernameInput, usernameError);
        const isPasswordValid = ValidationModule.validatePassword(passwordInput, passwordError);

        // Evitar el envío si hay errores
        if (!isUsernameValid || !isPasswordValid) {
            e.preventDefault();
        }
    });
}