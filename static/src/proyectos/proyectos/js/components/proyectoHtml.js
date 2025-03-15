import { mostrarPizarras } from "./pizarraComponents.js";
export function proyectoHtml(proyecto) {
    return `
            <section class="proyecto p-2" >
                <div class="proyecto-container p-3">
                    <div class="head border-bottom border-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <p>${proyecto.nombre}</p>
                            <div class="proyecto-options">
                               <!-- Botón para abrir el modal de ver proyecto-->
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modal"  
                                    data-id="${proyecto.id}" data-nombre="${proyecto.nombre}" data-descripcion="${proyecto.descripcion}" 
                                    data-fecha="${proyecto.fecha_entrega}" data-tipo="ver-proyecto" style="background: none; border: none;">
                                    <img src="/static/src/core/image/info.svg" alt="Editar">
                                </button>

                                <!-- Botón para abrir el modal de edición -->
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modal"  
                                    data-id="${proyecto.id}" data-nombre="${proyecto.nombre}" data-descripcion="${proyecto.descripcion}"
                                    data-tipo="editar-proyecto" style="background: none; border: none;">
                                    <img src="/static/src/core/image/lapiz.svg" alt="Editar">
                                </button>

                                <!-- Botón para abrir el modal de eliminación -->
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modal"
                                    data-id="${proyecto.id}" data-nombre="${proyecto.nombre}" data-tipo="eliminar-proyecto" style="background: none; border: none;">
                                    <img src="/static/src/core/image/eliminar.svg" alt="Eliminar">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="body" >
                        <div class="row overflow-auto" style="max-height: 400px;">
                            ${mostrarPizarras(proyecto, proyecto.id)}
                        </div>
                    </div>
                </div>
            </section>
        `;
}
export function crearProyectoFormularioHtml() {
    return `
        <form method="POST" id="form-crear-proyecto">
            <div class="mb-3">
                    <label for="nombre" class="form-label fw-semibold text-muted">Nombre</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" " required>
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label fw-semibold text-muted">Descripción</label>
                    <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required></textarea>
                </div>
                <div class="mb-3 d-flex align-items-center gap-2">
                    <label for="fecha_entrega" class="mb-0 fw-semibold text-muted">Fecha De Entrega:</label>
                    <input type="date" name="fecha_entrega" class="form-control ms-2" style="max-width: 130px;">
                </div>
                <div class="d-flex justify-content-center gap-1">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Crear Proyecto</button>
                </div>
        </form>
     `

}
export function editarProyectoFormularioHtml(proyectoId, nombreProyecto, descripcionProyecto) {
    return `
        <form method="POST" id="form-actualizar-proyecto">
            <input type="hidden" name="proyecto_id" value="${proyectoId}">
            <div class="mb-3">
                <label for="nombre" class="form-label fw-semibold text-muted">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" value="${nombreProyecto}" required>
            </div>
            <div class="mb-3">
                <label for="descripcion" class="form-label fw-semibold text-muted">Descripción</label>
                <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required>${descripcionProyecto}</textarea>
            </div>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </div>
        </form>
    `;
}
export function eliminarProyectoFormularioHtml(proyectoId) {
    return `
        <p class="text-center">¿Estás seguro de eliminar el proyecto?</p>
        <form method="POST" id="form-eliminar-proyecto">
            <input type="hidden" name="proyecto_id" value="${proyectoId}">
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-danger">Confirmar Eliminacion</button>
            </div>
        </form>
     ` ;
}
export function crearVerProyectoHtml(nombreProyecto, descripcionProyecto, fechaEntregaProyecto) {
    return `
            <!-- Descripción del Proyecto -->
            <div class="mb-4">
                <h6 class="fw-semibold text-muted">Descripción:</h6>
                <div class="bg-light p-3 rounded-4 overflow-auto" style="max-height: 300px;">
                    <p class="mb-0">${descripcionProyecto}</p>
                </div>
            </div>

            <!-- Fecha de Entrega -->
            <div class="row">
                <div class="col-auto">
                    <h6 class="fw-semibold text-muted mb-0">Fecha de Entrega:</h6>
                </div>
                <div class="col-auto">
                    <span class="text-dark">${fechaEntregaProyecto}</span>
                </div>
            </div>
`;
}
export function proyectosNoDisponibles() {
    return `   
        <div class="alert alert-info text-center py-5 mt-5" role="alert">
            <div class="mb-3">
                <div class="fs-1">📂</div>
            </div>
            <h4 class="fw-bold">No hay proyectos disponibles</h4>   
        </div>
` ;
}