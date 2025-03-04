export function listarProyectos(data) {
    const proyectosContainer = document.getElementById("proyectos-container");
    proyectosContainer.innerHTML = "";
    const modalesContainer = document.getElementById("modales-container");
    modalesContainer.innerHTML = "";

    if (data.proyectos && data.proyectos.length > 0) {
        data.proyectos.forEach(proyecto => {
            // Crear el HTML de cada proyecto
            const proyectoHtml = `
                <section class="proyecto p-2" >
                    <div class="proyecto-container p-3">
                        <div class="head border-bottom border-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <p>${proyecto.nombre}</p>
                                <div class="proyecto-options">
                                    <!-- Botón para abrir el modal de edición -->
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#editar-modal-${proyecto.id}" style="background: none; border: none;">
                                        <img src="/static/src/core/image/lapiz.svg" alt="Editar">
                                    </button>

                                    <!-- Botón para abrir el modal de eliminación -->
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#eliminar-modal-${proyecto.id}" style="background: none; border: none;">
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
            proyectosContainer.innerHTML += proyectoHtml;

            // Crear los modales
            const modalHtml = `
                <!-- Modal de edición -->
                <div class="modal fade" id="editar-modal-${proyecto.id}" tabindex="-1" aria-labelledby="editar-modal-label-${proyecto.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editar-modal-label-${proyecto.id}">Editar Proyecto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="modal-body">
                                <h1>PROBANDO MODAL DE EDICIÓN</h1>
                            </div>
                            <div class="modal-footer d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" class="btn btn-primary">Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal de eliminación -->
                <div class="modal fade" id="eliminar-modal-${proyecto.id}" tabindex="-1" aria-labelledby="eliminar-modal-label-${proyecto.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="eliminar-modal-label-${proyecto.id}">Eliminar Proyecto ${proyecto.nombre}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="modal-body">
                                ¿Esta Seguro que desea eliminar el proyecto?
                            </div>
                            <div class="modal-footer d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger" onclick="eliminarProyecto(${proyecto.id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- Modal de Creacion de Pizarra -->
                 <div class="modal fade" id="pizarra-modal-${proyecto.id}" tabindex="-1" aria-labelledby="pizarra-modal-label-${proyecto.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="pizarra-modal-label-${proyecto.id}">Crear Pizarra</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="modal-body">
                                <h1>Probando Modal de Creación de Pizarra</h1>
                            </div>
                            <div class="modal-footer d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary">Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            modalesContainer.innerHTML += modalHtml;
        });
    } else {
        proyectosContainer.innerHTML = `<h1>No hay proyectos</h1>`;
    }
}

export function mostrarPizarras(data, proyectoId) {
    let contenido = "";
    if (data.pizarras && data.pizarras.length > 0) {
        contenido += data.pizarras.map(pizarra => `
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
        `).join("");
    }
    contenido += botonModal(proyectoId);
    return contenido;
}

function botonModal(proyectoId) {
    return `
        <div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
            <div class="card border-0 shadow-sm rounded-4 d-flex justify-content-center align-items-center"
                style="width: 200px; height: 75px; margin: 10px; cursor: pointer;"
                data-bs-toggle="modal" data-bs-target="#pizarra-modal-${proyectoId}">
                <img src="/static/src/core/image/agregar.svg" alt="Agregar"
                    style="display: block; max-width: 100%; max-height: 100%;">
            </div>
        </div>
    `;
}
