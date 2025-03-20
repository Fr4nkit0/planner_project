// eventsSetPassword.js

import { validateNewPassword1, validateNewPassword2 } from './validationSetPassword.js';

export function setupValidationEvents(form) {
    const newPassword1Input = form.querySelector('#id_new_password1');
    const newPassword2Input = form.querySelector('#id_new_password2');

    const newPassword1Error = document.getElementById('newPassword1Error');
    const newPassword2Error = document.getElementById('newPassword2Error');

    // Validación en tiempo real
    newPassword1Input.addEventListener('input', () => validateNewPassword1(newPassword1Input, newPassword1Error));
    newPassword2Input.addEventListener('input', () => validateNewPassword2(newPassword1Input, newPassword2Input, newPassword2Error));

    // Validación antes de enviar el formulario
    form.addEventListener('submit', function (event) {
        const isNewPassword1Valid = validateNewPassword1(newPassword1Input, newPassword1Error);
        const isNewPassword2Valid = validateNewPassword2(newPassword1Input, newPassword2Input, newPassword2Error);

        if (!isNewPassword1Valid || !isNewPassword2Valid) {
            event.preventDefault(); // Evita el envío si hay errores
        }
    });
}
