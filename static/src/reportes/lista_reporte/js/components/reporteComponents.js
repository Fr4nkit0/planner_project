// reporteComponents.js
import { reporteHtml, editarReporteFormularioHtml, eliminarReporteFormularioHtml } from "./reporteHtml.js";

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
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");

    if (tipo === "editar-reporte") {
        const reporteId = button.getAttribute("data-id");
        const nombreReporte = button.getAttribute("data-nombre");
        const descripcionReporte = button.getAttribute("data-descripcion");
        modalLabel.textContent = "Editar Reporte";
        modalBody.innerHTML = editarReporteFormularioHtml(reporteId, nombreReporte, descripcionReporte);
    } else if (tipo === "eliminar-reporte") {
        const reporteId = button.getAttribute("data-id");
        const nombreReporte = button.getAttribute("data-nombre");
        modalLabel.textContent = "Eliminar Reporte";
        modalBody.innerHTML = eliminarReporteFormularioHtml(reporteId, nombreReporte);
    }
}