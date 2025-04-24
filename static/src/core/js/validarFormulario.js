export function validarFormulario(formId) {
    const formulario = document.getElementById(formId);
    const camposRequeridos = formulario.querySelectorAll('[required]');
    let isValid = true;
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            isValid = false;
            campo.classList.add('is-invalid');
        } else {
            campo.classList.remove('is-invalid');
        }
    });
    return isValid;
}