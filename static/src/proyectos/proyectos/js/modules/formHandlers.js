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
            handler(e.target,
                (data) => {
                    cerrarModal();
                    cargarProyectos();
                },
                (error) => console.log(error));
        }
    });
}