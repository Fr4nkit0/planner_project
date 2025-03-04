import { proyectoHtml } from "./proyectoHtml.js";
export function listarProyectos(data) {
    const proyectosContainer = document.getElementById("proyectos-container");
    proyectosContainer.innerHTML = "";
    const modalesContainer = document.getElementById("modales-container");
    if (data.proyectos && data.proyectos.length > 0) {
        data.proyectos.forEach(proyecto => {
            // Crear el HTML de cada proyecto
            proyectosContainer.innerHTML += proyectoHtml(proyecto);
        });
    } else {
        proyectosContainer.innerHTML = `<h1>No hay proyectos</h1>`;
    }
}