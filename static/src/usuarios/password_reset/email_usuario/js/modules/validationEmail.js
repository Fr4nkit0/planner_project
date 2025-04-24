// validationEmail.js

export function validateEmail(emailInput, emailError) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = emailInput.value.trim();

    if (emailValue === '') {
        emailError.textContent = 'El correo electrónico es obligatorio.';
        return false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'El correo electrónico no es válido.';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}
