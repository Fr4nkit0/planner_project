import { cerrarModal } from "./modalHelper.js";
import { crearProyecto, actualizarProyecto, eliminarProyecto } from "../services/proyectoServicio.js";
import { crearPizarra, actualizarPizarra, eliminarPizarra } from "../services/pizarraServicio.js";
import { cargarProyectos } from "./projectLoader.js";

const formHandlers = {
    "form-crear-proyecto": crearProyecto,
    "form-actualizar-proyecto": actualizarProyecto,
    "form-eliminar-proyecto": eliminarProyecto,
    "form-crear-pizarra": crearPizarra,
    "form-actualizar-pizarra": actualizarPizarra,
    "form-eliminar-pizarra": eliminarPizarra
};

export function initFormHandlers() {
    document.addEventListener("submit", (e) => {
        const handler = formHandlers[e.target.id];
        if (handler) {
            e.preventDefault();
            const submitButton = e.target.querySelector("button[type='submit']");
            submitButton.disabled = true; // Deshabilitar el botón
            handler(e.target,
                (data) => {
                    cerrarModal();
                    cargarProyectos();
                    // Rehabilitar el botón después de la petición (en ambos casos)
                    setTimeout(() => {
                        submitButton.disabled = false;
                    }, 3000);
                },
                (error) => console.log(error));
            submitButton.disabled = false; // Habilitar el botón en caso de error
        }
    });
}