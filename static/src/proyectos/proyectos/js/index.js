import { initEventHandlers } from "./modules/eventHandlers.js";
import { cargarProyectos } from "./modules/projectLoader.js";
import { initFormHandlers } from "./modules/formHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
    initEventHandlers();
    initFormHandlers();
});