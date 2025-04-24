import { proyectoHtml, proyectosNoDisponibles } from "./proyectoHtml.js";
export function listarProyectos(data) {
    const proyectosContainer = document.getElementById("proyectos-container");
    proyectosContainer.innerHTML = "";
    if (data.proyectos && data.proyectos.length > 0) {
        data.proyectos.forEach(proyecto => {
            proyectosContainer.innerHTML += proyectoHtml(proyecto);
        });
    } else {
        proyectosContainer.innerHTML = proyectosNoDisponibles();
    }
}