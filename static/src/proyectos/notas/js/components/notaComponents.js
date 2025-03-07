import { notaHtml, notaCrearHtml, formularioNotaHtml } from "./notaHtml.js";

export function mostrarNotas(data) {
    const notasContainer = document.getElementById('notas-container');
    notasContainer.innerHTML = "";
    if (data.notas && data.notas.length > 0) {
        data.notas.forEach(nota => {
            notasContainer.innerHTML += notaHtml(nota);
        });
        notasContainer.innerHTML += notaCrearHtml();
    }
    else {
        notasContainer.innerHTML = notaCrearHtml();
    }
}
export function actualizarModal(button) {
    const tipo = button.getAttribute("data-tipo");
    return tipoDeModal(button, tipo);
}
function tipoDeModal(button, tipo) {
    if (tipo == "crear-nota") {
        crearNotaHtml(button);
    }
    if (tipo == "ver-nota") {
        crearEditarNotaHtml(button);
    }
}
function crearNotaHtml(button) {
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Crear Nota";
    modalBody.innerHTML = formularioNotaHtml();

}
function crearEditarNotaHtml(button) {

} 