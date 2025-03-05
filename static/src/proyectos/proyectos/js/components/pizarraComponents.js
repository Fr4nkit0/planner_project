import { pizarraHtml, botonModal, formularioPizarraHtml } from "./pizarraHtml.js"
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