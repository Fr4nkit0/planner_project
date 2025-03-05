
export function pizarraHtml(pizarra) {
    return `
        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
            <a class ="text-decoration-none text-reset"  href = "listar-notas/${pizarra.id}">
                <div class="card border-0 shadow-sm rounded-4" style="height: 75px; width: 200px; margin: 10px 0;">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="text-center w-100">
                            <span>${pizarra.nombre}</span>
                        </div>
                        <div class="bg-primary" style="width: 70px; height: 75px; border-radius: 10px;"></div>
                    </div>
                </div>
            </a>
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
        <form method="POST" id="form-pizarra">
            <input type="hidden" name="proyecto_id" value="${proyectoId}">
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre De Pizarra</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Crear Pizarra</button> 
            </div>
        </form>
    ` ;
}
