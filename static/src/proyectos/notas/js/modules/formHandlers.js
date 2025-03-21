import { crearNota } from "../services/notaService.js";
import { crearComentario } from "../services/comentarioService.js";
import { cargarComentarios } from "./comentarioLoader.js";
import { cerrarModal } from "./modalHelper.js";
import { cargarNotas } from "./notaLoader.js";

const formHandlersNotas = {
    "form-crear-nota": crearNota,
    "comentario-form": crearComentario,  // Agregamos el formulario de comentarios
};

export function initFormHandlers() {
    document.addEventListener("submit", (e) => {
        const handler = formHandlersNotas[e.target.id];
        if (handler) {
            e.preventDefault();
            // Obtener el botón de enviar dentro del formulario
            const submitButton = e.target.querySelector("button[type='submit']");
            submitButton.disabled = true; // Deshabilitar el botón
            handler(e.target,
                (data) => {
                    if (e.target.id === "comentario-form") {
                        const notaId = e.target.querySelector("input[name='nota_id']").value;
                        cargarComentarios(notaId);
                        e.target.reset();

                    } else {
                        cerrarModal();
                        cargarNotas();
                    }
                    // Rehabilitar el botón después de la petición (en ambos casos)
                    setTimeout(() => {
                        submitButton.disabled = false;
                    }, 300);
                },
                (error) => {
                    console.log(error);
                    submitButton.disabled = false; // Habilitar el botón en caso de error
                }// Habilitar el botón después de la petición

            );
        }
    });
}
