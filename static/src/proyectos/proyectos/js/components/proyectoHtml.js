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
                    <div class="body" >
                        <div class="row overflow-auto" style="max-height: 400px;">
                            ${mostrarPizarras(proyecto, proyecto.id)}
                        </div>
                    </div>
                </div>
            </section>
        `;
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

// Enviaste
// <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
//     <div class="card border-0 shadow-sm rounded-4" 
//          style="height: 75px; width: 200px; margin: 10px; cursor: pointer;" 
//          onclick="window.location.href='listar-notas/${pizarra.id}'">
        
//         <div class="d-flex justify-content-between align-items-center">
//             <div class="text-center w-100">
//                 <span>${pizarra.nombre}</span>
//             </div>
//             <div class="bg-primary position-relative" style="width: 90px; height: 75px; border-radius: 10px;">
//                 <div class="dropdown position-absolute end-0 top-0">
//                     <button class="dropdown-toggle" type="button" id="dropdownMenu" 
//                             data-bs-toggle="dropdown" aria-expanded="false" 
//                             style="background: none; border: none;" 
//                             onclick="event.stopPropagation();">
//                         <img src="/static/src/core/image/drop-down.svg"">
//                     </button>
//                     <ul class="dropdown-menu shadow-sm border-0" aria-labelledby="dropdownMenu">
//                         <li><p>Probando</p></li>
//                         <li><p>Probando</p></li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>