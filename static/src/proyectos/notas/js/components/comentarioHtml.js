export function comentarioHtml() {
    return `
        <div class="container mt-4">
            <h5>Comentarios</h5>

            <!-- Input para agregar un comentario -->
            <div class="mb-3">
                <textarea id="input-comentario" class="form-control" rows="3" placeholder="Escribe tu comentario..."></textarea>
                <button id="btn-enviar" class="btn btn-primary mt-2">Guardar</button>
            </div>

            <!-- Lista de comentarios -->
            <div class="mt-2 overflow-auto" id="lista-comentarios" style="max-height: 300px;">
                <!-- Comentario de ejemplo 1 -->
                <div class="d-flex align-items-start mb-3">
                    <img src="/static/src/core/image/usuario.svg" class="rounded-circle me-2" alt="Avatar">
                    <div>
                        <strong>Juan Pérez</strong> <span class="text-muted">•Hace 2 horas</span>
                        <p>¡Excelente contenido! Me ha servido mucho.</p>
                    </div>
                </div>

                <!-- Comentario de ejemplo 2 -->
                <div class="d-flex align-items-start mb-3">
                    <img src="/static/src/core/image/usuario.svg" class="rounded-circle me-2" alt="Avatar">
                    <div>
                        <strong>María Gómez</strong> <span class="text-muted">• Hace 1 hora</span>
                        <p>Gracias por la información, estuvo muy clara me ayuda bastante para poder lograr lo que necesitaba para mi proyecto.</p>
                    </div>
                </div>

                <!-- Comentario de ejemplo 3 -->
                <div class="d-flex align-items-start mb-3">
                    <img src="/static/src/core/image/usuario.svg" class="rounded-circle me-2" alt="Avatar">
                    <div>
                        <strong>Carlos López</strong> <span class="text-muted">• Hace 10 minutos</span>
                        <p>Muy interesante, seguiré aprendiendo más sobre el tema.</p>
                    </div>
                </div>
            </div>
        </div>
    `
}