// eventsRegister.js

import { validateUsername, validateEmail, validatePassword1, validatePassword2 } from './validationRegister.js';

export function setupValidationEvents(form) {
    const usernameInput = form.querySelector('#id_username');
    const emailInput = form.querySelector('#id_email');
    const password1Input = form.querySelector('#id_password1');
    const password2Input = form.querySelector('#id_password2');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const password1Error = document.getElementById('password1Error');
    const password2Error = document.getElementById('password2Error');

    // Validación en tiempo real
    usernameInput.addEventListener('input', () => validateUsername(usernameInput, usernameError));
    emailInput.addEventListener('input', () => validateEmail(emailInput, emailError));
    password1Input.addEventListener('input', () => validatePassword1(password1Input, password1Error));
    password2Input.addEventListener('input', () => validatePassword2(password1Input, password2Input, password2Error));

    // Validación antes de enviar el formulario
    form.addEventListener('submit', function (event) {
        const isUsernameValid = validateUsername(usernameInput, usernameError);
        const isEmailValid = validateEmail(emailInput, emailError);
        const isPassword1Valid = validatePassword1(password1Input, password1Error);
        const isPassword2Valid = validatePassword2(password1Input, password2Input, password2Error);

        if (!isUsernameValid || !isEmailValid || !isPassword1Valid || !isPassword2Valid) {
            event.preventDefault(); // Evita el envío si hay errores
        }
    });
}
