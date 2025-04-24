import { setupValidationEvents } from './modules/eventsSetPassword.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('setPasswordForm');
    if (form) {
        setupValidationEvents(form);
    }
});