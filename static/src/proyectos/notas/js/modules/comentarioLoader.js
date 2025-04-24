import { mostrarComentarios } from "../components/comentarioComponents.js";
import { obtenerComentarios } from "../services/comentarioService.js";
export function cargarComentarios(notaId) {
    obtenerComentarios(notaId, (data) => {
        mostrarComentarios(data);
    }, (error) => {
        console.error("Error al obtener los comentarios:", error);
    });
}