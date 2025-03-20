// eventsEmail.js

import { validateEmail } from './validationEmail.js';

export function setupEmailValidationEvents(form) {
    const emailInput = form.querySelector('#id_email');
    const emailError = document.getElementById('emailError');

    // Validación en tiempo real
    emailInput.addEventListener('input', () => validateEmail(emailInput, emailError));

    // Validación antes de enviar el formulario
    form.addEventListener('submit', function (event) {
        const isEmailValid = validateEmail(emailInput, emailError);

        if (!isEmailValid) {
            event.preventDefault(); // Evita el envío si hay errores
        }
    });
}
