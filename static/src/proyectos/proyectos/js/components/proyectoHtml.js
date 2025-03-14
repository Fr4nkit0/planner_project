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
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" " required>
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required></textarea>
                </div>
                <div class="mb-3 d-flex align-items-center gap-2">
                    <label for="fecha_entrega" class="mb-0">Fecha De Entrega:</label>
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
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" value="${nombreProyecto}" required>
            </div>
            <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
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
        <p class="text-center">¿Estás seguro de eliminar el proyecto</p>
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
        <div class="mb-3 d-flex align-items-center gap-2">
            <label class="form-label fw-bold mb-0">Nombre:</label>
            <p class="form-control-plaintext ms-2">${nombreProyecto}</p>
        </div>
        <div class="mb-3 ">
            <label class="form-label fw-bold">Descripción</label>
            <div class="bg-light rounded-4" style="height: auto; min-height: 70px; overflow-y: auto;">
             <p class="ms-2 mt-2">${descripcionProyecto}</p>
             </div>
        </div>
        <div class="mb-3 d-flex align-items-center gap-2">
            <label for="fecha_entrega" class="fw-bold mb-0">Fecha De Entrega:</label>
            <input type="date" name="fecha_entrega" class="form-control ms-2" style="max-width: 130px;" value="${fechaEntregaProyecto}" readonly>
        </div>

`;
}