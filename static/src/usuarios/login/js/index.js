// index.js
import { setupValidationEvents } from './modules/events.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    if (form) {
        setupValidationEvents(form);
    }
});
