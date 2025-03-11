import {reporteHtml, editarReporteFormularioHtml, eliminarReporteFormularioHtml} from "./reporteHtml.js";

export function listarReportes(data) {
    const reportesContainer = document.getElementById("reportes-container");
    reportesContainer.innerHTML = "";
    if (data.reportes && data.reportes.length > 0) {
        data.reportes.forEach(reporte => {
            reportesContainer.innerHTML += reporteHtml(reporte);
        });
    } else {
        reportesContainer.innerHTML = `<h1>No hay reportes</h1>`;
    }
}
export function actualizarModal(button) {
    const tipo = button.getAttribute("data-tipo");
    return tipoDeModal(button, tipo);
}
function tipoDeModal(button, tipo) {
    if (tipo == "editar-reporte") {
        crearEditarReporteHtml(button);
    }
    if (tipo == "eliminar-reporte") {
        crearEliminarReporteHtml(button);
    }
}
function crearEditarReporteHtml(button) {
    const reporteId = button.getAttribute("data-id");
    const nombreReporte = button.getAttribute("data-nombre");
    const descripcionReporte = button.getAttribute("data-descripcion");
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Editar Reporte";

    modalBody.innerHTML = editarReporteFormularioHtml(reporteId, nombreReporte, descripcionReporte);
}
function crearEliminarReporteHtml(button) {
    const reporteId = button.getAttribute("data-id");
    const nombreReporte = button.getAttribute("data-nombre");
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Eliminar Reporte  " + nombreReporte;
    modalBody.innerHTML = eliminarReporteFormularioHtml(reporteId, nombreReporte);
}