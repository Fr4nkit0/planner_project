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
                                <button type="button" data-bs-toggle="modal" data-bs-target="#editar-modal"  
                                    data-id="${proyecto.id}" style="background: none; border: none;">
                                    <img src="/static/src/core/image/lapiz.svg" alt="Editar">
                                </button>

                                <!-- Botón para abrir el modal de eliminación -->
                                <button type="button" data-bs-toggle="modal" data-bs-target="#eliminar-modal"
                                    data-id="${proyecto.id} data-nombre="${proyecto.nombre}" style="background: none; border: none;">
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