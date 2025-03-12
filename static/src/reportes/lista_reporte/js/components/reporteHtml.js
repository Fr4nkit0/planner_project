// reporteHtml.js
export function reporteHtml(reporte) {
    const inicialUsuario = reporte.usuario ? reporte.usuario.charAt(0).toUpperCase() : "";
    const tituloMayuscula = reporte.titulo.toUpperCase();
    return `
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
                    <a href="#" class="me-2 btn-editar-reporte" data-id="${reporte.id}" data-tipo="editar-reporte" data-nombre="${reporte.titulo}" data-descripcion="${reporte.descripcion}">
                        <img src="/static/src/core/image/lapiz.svg" alt="Editar" width="20">
                    </a>
                    <a href="#" class="btn-eliminar-reporte" data-id="${reporte.id}" data-tipo="eliminar-reporte" data-nombre="${reporte.titulo}">
                        <img src="/static/src/core/image/eliminar.svg" alt="Eliminar" width="20">
                    </a>
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
        <form id="form-editar-reporte" method="POST">
            <input type="hidden" name="reporte_id" value="${reporteId}">
            <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" class="form-control" id="titulo" name="titulo" value="${titulo}">
            </div>
            <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcion" name="descripcion" rows="3">${descripcion}</textarea>
            </div>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button id="modal-edicion-reporte-${reporteId}" type="submit" class="btn btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
}

export function eliminarReporteFormularioHtml(reporteId, titulo) {
    return `
        <p class="text-center">¿Estás seguro de eliminar el reporte "${titulo}"?</p>
        <form id="form-eliminar-reporte" method="POST">
            <input type="hidden" name="reporte_id" value="${reporteId}">
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-danger">Confirmar Eliminación</button>
            </div>
        </form>
    `;
}