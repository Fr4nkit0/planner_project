
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
                data-bs-toggle="modal" data-bs-target="#pizarra-modal" data-id="${proyectoId}">
                <img src="/static/src/core/image/agregar.svg" alt="Agregar"
                    style="display: block; max-width: 100%; max-height: 100%;">
            </div>
        </div>
    `;
}
