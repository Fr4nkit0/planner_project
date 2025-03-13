export function reporteHtml(reporte) {
    const inicialUsuario = reporte.usuario ? reporte.usuario.charAt(0).toUpperCase() : "";
    const tituloMayuscula = reporte.titulo.toUpperCase();
    return `
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal" data-tipo="crear-reporte">
        + Crear Reporte
        </button>

        <div class="card p-3 reporte">
            <div class="d-flex justify-content-between align-items-center titulo_reporte">
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center justify-content-center rounded-circle bg-light text-primary fw-bold letra_icono" style="width: 40px; height: 40px;">
                        ${inicialUsuario}
                    </div>
                    <div>
                        <p class="mb-0">${tituloMayuscula}</p>
                        <p class="mb-0">FECHA: ${reporte.fecha_creacion}</p>
                    </div>
                </div>
                <div class="icono">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal"
                    data-id="${reporte.id}" data-titulo="${reporte.titulo}" data-descripcion="${reporte.descripcion}"
                    data-tipo="editar-reporte"><img src="/static/src/core/image/lapiz.svg" alt="Editar" width="20"></button>
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal"
                    data-id="${reporte.id}" data-tipo="eliminar-reporte"><img src="/static/src/core/image/eliminar.svg" alt="Eliminar" width="20"></button>
                </div>
            </div>
            <div class="card-body contenido">
                <p class="mb-0">${reporte.descripcion}</p>
            </div>
        </div>
    `;
}

export function editarReporteFormularioHtml(reporteId, titulo, descripcion) {
    return `
        <form method="POST" id="form-editar-reporte">
            <input type="hidden" name="reporte_id" value="${reporteId}">
            <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" class="form-control" id="titulo" name="titulo" value="${titulo}" required>
            </div>
            <div class="mb-3">
                <label for="descripcion" class="form-label">Descripcion</label>
                <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required>${descripcion}</textarea>
            </div>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

export function eliminarReporteFormularioHtml(reporteId) {
    return `
        <p class="text-center">¿Estás seguro de eliminar este reporte?</p>
        <form method="POST" id="form-eliminar-reporte">
            <input type="hidden" name="reporte_id" value="${reporteId}">
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-danger">Confirmar</button>
            </div>
        </form>
    `;
}

export function crearReporteFormularioHtml() {
    return `
        <form method="POST" id="form-crear-reporte">
            <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" class="form-control" id="titulo" name="titulo" required>
            </div>
            <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required></textarea>
            </div>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-success">Crear Reporte</button>
            </div>
        </form>
    `;
}