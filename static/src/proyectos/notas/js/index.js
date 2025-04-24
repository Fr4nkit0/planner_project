import { cargarNotas } from "./modules/notaLoader.js";
import { initEventHandlers, initSearchHandler } from "./modules/eventHandlers.js";
import { initFormHandlers } from "./modules/formHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarNotas();
    initEventHandlers();
    initFormHandlers();
    initSearchHandler();
});