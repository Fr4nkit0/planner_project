import { obtenerProyectos } from "../services/proyectoServicio.js";
import { listarProyectos } from "../components/proyectoComponents.js";

let debounceTimer;

export function cargarProyectos(searchQuery = '') {
    obtenerProyectos(searchQuery, (data) => {
        listarProyectos(data);
    }, (error) => {
        console.error("Error cargando proyectos:", error);
    });
}

document.addEventListener("input", (e) => {
    if (e.target.id === "search-input") {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            cargarProyectos(e.target.value.trim());
        }, 300);
    }
});