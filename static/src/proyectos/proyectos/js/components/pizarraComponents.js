import { pizarraHtml, botonModal, formularioPizarraHtml, formularioEliminarPizarraHtml, formularioEditarPizarraHtml } from "./pizarraHtml.js"
export function mostrarPizarras(data, proyectoId) {
    let contenido = "";
    if (data.pizarras && data.pizarras.length > 0) {
        contenido += data.pizarras.map(pizarra => pizarraHtml(pizarra)).join("");
    }
    contenido += botonModal(proyectoId);
    return contenido;
}
export function crearPizarraHtml(button) {
    // Obtener el elemento que contiene el título del modal
    const modalLabel = document.getElementById("modal-label");
    const proyectoId = button.getAttribute("data-id");
    const modalBody = document.getElementById("modal-body");

    modalLabel.textContent = "Crear Pizarra";
    modalBody.innerHTML = formularioPizarraHtml(proyectoId);
}

export function crearEditarPizarraHtml(button) {
    const modalLabel = document.getElementById("modal-label");
    const pizarraId = button.getAttribute("data-id");
    const pizarraNombre = button.getAttribute("data-nombre");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Actualizar Pizarra";
    modalBody.innerHTML = formularioEditarPizarraHtml(pizarraId, pizarraNombre);
}
export function crearEliminarPizarraHtml(button) {
    const modalLabel = document.getElementById("modal-label");
    const pizarraId = button.getAttribute("data-id");
    const nombrePizarra = button.getAttribute("data-nombre");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Eliminar Pizarra";
    modalBody.innerHTML = formularioEliminarPizarraHtml(pizarraId, nombrePizarra);
}