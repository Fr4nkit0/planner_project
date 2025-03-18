import { notaHtml, notaCrearHtml } from "./notaHtml.js";
import { generacionPaginacion } from "../modules/paginacion.js";
export function mostrarNotas(data, searchQuery = '') {
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
    generacionPaginacion(data.paginacion, searchQuery);
}
export function actualizarModal(button) {
    const tipo = button.getAttribute("data-tipo");
    return tipoDeModal(button, tipo);
}

