import { setupValidationEvents } from './modules/eventsRegister.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    if (form) {
        setupValidationEvents(form);
    }
});