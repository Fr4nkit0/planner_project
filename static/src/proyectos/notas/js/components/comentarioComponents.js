import { comentarioHtml } from "./comentarioHtml.js";
export function mostrarComentarios(data) {
    const comentarioContainer = document.getElementById('lista-comentarios');
    // Limpiar el contenedor antes de agregar nuevos comentarios
    comentarioContainer.innerHTML = '';
    if (data.comentarios && data.comentarios.length > 0) {
        data.comentarios.forEach(comentario => {
            comentarioContainer.innerHTML += comentarioHtml(comentario);
        });
    }
    else {
        comentarioContainer.innerHTML = '<p>No existen comentarios</p>'
    }
}