import { setupEmailValidationEvents } from './modules/eventsEmail.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('emailForm');
    if (form) {
        setupEmailValidationEvents(form);
    }
});