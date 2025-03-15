
export function pizarraHtml(pizarra) {
    return `
        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
            <div class="card border-0 shadow-sm rounded-4" style="height: 75px; width: 200px; margin: 10px;" data-url="listar-notas/${pizarra.id}" >
                <div class="d-flex justify-content-between align-items-center">
                    <div class="text-center w-100">
                        <span>${pizarra.nombre}</span>
                    </div>
                    <div class="bg-primary position-relative" style="width: 110px; height: 75px; border-radius: 10px;">
                        <div class="dropdown position-absolute end-0 top-0">
                            <button class="dropdown-toggle" type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false" style="background: none; border: none;">
                                <img src="/static/src/core/image/drop-down.svg"">
                            </button>
                            <ul class="dropdown-menu shadow-sm border-0" aria-labelledby="dropdownMenu">
                                <li>
                                    <!-- Botón para abrir el modal de edición -->
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#modal"  
                                        data-id="${pizarra.id}" data-nombre="${pizarra.nombre}"
                                        data-tipo="editar-pizarra" style="background: none; border: none;">
                                        <img src="/static/src/core/image/lapiz.svg" alt="Editar">Editar
                                    </button>
                                </li>
                                <li>
                                    <!-- Botón para abrir el modal de eliminación -->
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#modal"
                                        data-id="${pizarra.id}" data-nombre="${pizarra.nombre}" data-tipo="eliminar-pizarra" style="background: none; border: none;">
                                        <img src="/static/src/core/image/eliminar.svg" alt="Eliminar"> Eliminar
                                    </button>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        `;
}

export function botonModal(proyectoId) {
    return `
        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
            <div class="card border-0 shadow-sm rounded-4 d-flex justify-content-center align-items-center"
                style="width: 200px; height: 75px; margin: 10px; cursor: pointer;"
                data-bs-toggle="modal" data-bs-target="#modal" data-id="${proyectoId}" data-tipo="crear-pizarra">
                <img src="/static/src/core/image/agregar.svg" alt="Agregar"
                    style="display: block; max-width: 100%; max-height: 100%;">
            </div>
        </div>
    `;
}
export function formularioPizarraHtml(proyectoId) {
    return ` 
        <form method="POST" id="form-pizarra" novalidate >
            <input type="hidden" name="proyecto_id" value="${proyectoId}">
            <div class="mb-3">
                <label for="nombre" class="form-label fw-semibold text-muted">Nombre De Pizarra</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Crear Pizarra</button> 
            </div>
        </form>
    ` ;
}
export function formularioEditarPizarraHtml(pizarraId, nombrePizarra) {
    return `
        <form method="POST" id="form-actualizar-pizarra">
            <input type="hidden" name="pizarra_id" value="${pizarraId}">
            <div class="mb-3">
                <label for="nombre" class="form-label fw-semibold text-muted">Nombre De Pizarra</label>
                <input type="text" class="form-control" id="nombre" name="nombre" value="${nombrePizarra}" required>
            </div>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Actualizar Pizarra</button>
            </div>
        </form>
    ` ;
}
export function formularioEliminarPizarraHtml(pizarraId, nombrePizarra) {
    return `
        <p class="text-center">¿Estás seguro de eliminar la pizarra ${nombrePizarra}?</p>
        <form method="POST" id="form-eliminar-pizarra">
            <input type="hidden" name="pizarra_id" value="${pizarraId}">
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-danger">Confirmar Eliminacion</button>
            </div>
        </form>
     `;
}
