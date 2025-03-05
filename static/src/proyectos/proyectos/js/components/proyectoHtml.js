import { mostrarPizarras } from "./pizarraComponents.js";
export function proyectoHtml(proyecto) {
    return `
            <section class="proyecto p-2" >
                <div class="proyecto-container p-3">
                    <div class="head border-bottom border-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <p>${proyecto.nombre}</p>
                            <div class="proyecto-options">
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
                    <div class="body overflow-y-auto overflow-x-hidden" style="max-height: 700px;">
                        <div class="row">
                            ${mostrarPizarras(proyecto, proyecto.id)}
                        </div>
                    </div>
                </div>
            </section>
        `;
}
export function editarProyectoFormularioHtml(proyectoId, nombreProyecto, descripcionProyecto) {
    return `
        <form method="POST">
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" value="${nombreProyecto}" required>
            </div>
            <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required>${descripcionProyecto}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </form>
    `;
}
export function eliminarProyectoFormularioHtml(proyectoId, nombreProyecto) {
    return `
        <p>¿Estás seguro de eliminar el proyecto ?</p>
        <form method="POST">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger">Confirmar Eliminacion</button>
        </form>
     ` ;
}
