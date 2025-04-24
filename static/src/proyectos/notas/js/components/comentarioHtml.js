export function comentarioHtml(comentario) {
    return `
    <div class="d-flex align-items-start mb-3">
        <img src="/static/src/core/image/usuario.svg" class="rounded-circle me-2" alt="Avatar">
        <div>
            <strong>${comentario.usuario}</strong>
            <p>${comentario.descripcion}</p>
        </div>
    </div>
    `
}