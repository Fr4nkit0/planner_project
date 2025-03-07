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
    <form id="form-nota" >
        <input type="hidden" name="pizarra_id" value="${obtenerIdPizarraUrl()}">
        <div class="mb-3">
            <label for="titulo" class="form-label">Titulo</label>
            <input type="text" class="form-control" id="titulo" name="titulo" required>
        </div>
        <div class="mb-3">
            <label for="descripcion" class="form-label">Descripcion</label>
            <textarea class="form-control" id="descripcion" name="descripcion" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
    `
}