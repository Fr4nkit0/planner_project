import { notaHtml, notaCrearHtml, formularioNotaHtml, detalleNotaHtml } from "./notaHtml.js";
import { obtenerRangoPaginacion } from "../modules/paginacion.js";
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
function generacionPaginacion(paginacion, searchQuery) {
    const paginacionContainer = document.getElementById("container-paginacion");
    // Limpia el contenedor si no hay más de una página
    if (paginacion.total_paginas <= 1) {
        paginacionContainer.innerHTML = "";
        return;
    }

    let paginacionHtml = '<nav aria-label="Page navigation"><ul class="pagination justify-content-center">';
    // Boton "Anterior"
    if (paginacion.pagina_actual > 1) {
        paginacionHtml += `
        <li class="page-item">
            <a class="page-link" href="#" data-pagina="${paginacion.pagina_actual - 1}" data-query="${searchQuery}" aria-label="Previous">
                Anterior
            </a>
        </li>`;
    }

    // Calcular el rango de páginas a mostrar (4 botones)
    let { principioPagina, finPagina } = obtenerRangoPaginacion(paginacion.total_paginas, paginacion.pagina_actual);
    // Generar los botones de paginacion 
    for (let i = principioPagina; i <= finPagina; i++) {
        if (i == paginacion.pagina_actual) {
            paginacionHtml += `
            <li class="page-item active" aria-current="page">
                <span class="page-link">${i}</span>
            </li>`;
        } else {
            paginacionHtml += `
            <li class="page-item">
                <a class="page-link" href="#" data-pagina="${i}" data-query="${searchQuery}" >${i}</a>
            </li>`;
        }
    }
    // Botón "Siguiente"
    if (paginacion.pagina_actual < paginacion.total_paginas) {
        paginacionHtml += `
        <li class="page-item">
            <a class="page-link" href="#" data-pagina="${paginacion.pagina_actual + 1}"  data-query="${searchQuery}"aria-label="Next">
                Siguiente
            </a>
        </li>`;
    }
    paginacionHtml += '</ul></nav>';
    paginacionContainer.innerHTML = paginacionHtml;

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
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "";
    modalBody.innerHTML = detalleNotaHtml();
} 