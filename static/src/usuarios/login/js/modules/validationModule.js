// validationModule.js
export const ValidationModule = (function () {
    // Función para mostrar errores
    function showError(element, message) {
        element.textContent = message;
    }

    // Función para limpiar errores
    function clearError(element) {
        element.textContent = '';
    }

    // Validación del nombre de usuario
    function validateUsername(usernameInput, usernameError) {
        const value = usernameInput.value.trim();
        if (!value) {
            showError(usernameError, 'El nombre de usuario es obligatorio.');
            return false;
        }
        clearError(usernameError);
        return true;
    }

    // Validación de la contraseña
    function validatePassword(passwordInput, passwordError) {
        const value = passwordInput.value.trim();
        if (!value) {
            showError(passwordError, 'La contraseña es obligatoria.');
            return false;
        }
        if (value.length < 8) {
            showError(passwordError, 'Debe tener al menos 8 caracteres.');
            return false;
        }
        clearError(passwordError);
        return true;
    }

    // Exponer funciones públicas
    return {
        showError,
        clearError,
        validateUsername,
        validatePassword
    };
})();