import { crearNota } from "../services/notaService.js";
import { cerrarModal } from "./modalHelper.js";
const formHandlersNotas = {
    "form-crear-nota": crearNota,
    // "form-editar-nota": editarNota // Asumo que existe esta función
};

export function initFormHandlers() {
    document.addEventListener("submit", (e) => {
        const handler = formHandlersNotas[e.target.id];
        if (handler) {
            e.preventDefault();
            handler(e.target,
                (data) => {
                    cerrarModal();
                    cargarNotas();
                },
                (error) => console.log(error)
            );
        }
    });
}
