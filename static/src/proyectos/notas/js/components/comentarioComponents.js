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
        comentarioContainer.innerHTML = `
            <div class="alert alert-light text-center p-4 border rounded shadow-sm">
                <i class="bi bi-chat-left-dots fs-2 text-secondary"></i>
                <p class="mt-2 text-muted fw-semibold">Aún no hay comentarios. Sé el primero en escribir uno.</p>
            </div>
        `;
    }
}