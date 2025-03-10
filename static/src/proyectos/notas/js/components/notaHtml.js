import { obtenerIdPizarraUrl } from '../modules/notaModules.js'
export function notaHtml(nota) {
    return `<!-- cambiar la class col-12 col-md-6 col-lg-6 col-xl-4 m-3 mas adelante testear con mas card  -->
            <div class="col-12 col-md-6 col-lg-6 col-xl-4 m-3">
                <div class="task-card d-flex align-items-center justify-content-center"  data-bs-toggle="modal" data-bs-target="#modal" 
                    data-id=${nota.id}  data-tipo="ver-nota" style="background-color: ${nota.color};">
                        <p class="text-center">${nota.titulo}</p>
                </div>
            </div>
            `;
}
export function notaCrearHtml() {
    return `
    <div class="col-12 col-md-6 col-lg-6 col-xl-4 m-3">
        <div class="task-card d-flex align-items-center justify-content-center"  data-bs-toggle="modal" data-bs-target="#modal" data-tipo="crear-nota" >
            <img src="/static/src/core/image/agregar.svg" alt="Agregar"
                        style="display: block; max-width: 100%; max-height: 100%;">
        </div>
    </div>
    `;
}
export function formularioNotaHtml() {
    return `
    <form id="form-nota">
        <input type="hidden" name="pizarra_id" value="${obtenerIdPizarraUrl()}">

        <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" class="form-control" id="titulo" name="titulo" required>
        </div>

        <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea class="form-control" id="descripcion" name="descripcion" rows="3"></textarea>
        </div>
        
        <div class="mb-3 row">
            <div class="col-9 d-flex align-items-center gap-1">
                <label for="fecha" class="form-label fs-7 mb-0" style="white-space: nowrap;">Pendiente Para:</label>
                <input type="date" class="form-control" id="fecha" name="fecha">
            </div>
            <div class="col d-flex align-items-center">
                <label for="etiqueta" class="form-label fs-7 mb-0 me-">Etiqueta:</label>
                <div class="btn-group dropend">
                    <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="background: none; border: none;"></button>
                    <div class="dropdown-menu">
                        <p>No hay Etiquetas Disponibles por el momento</p>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div class="mb-3 d-flex justify-content-center gap-1"> 
        <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancelar</button> 
        <button type="submit" form="form-nota" class="btn btn-primary">Guardar</button>
    </div>
    `;
} 
