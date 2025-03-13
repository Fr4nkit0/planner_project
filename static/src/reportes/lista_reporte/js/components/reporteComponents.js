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
    if (tipo === "editar-reporte") {
        const reporteId = button.getAttribute("data-id");
        const titulo = button.getAttribute("data-titulo");
        const descripcion = button.getAttribute("data-descripcion");
        const modalLabel = document.getElementById("modal-label");
        const modalBody = document.getElementById("modal-body");
        modalLabel.textContent = "Editar Reporte";
        modalBody.innerHTML = editarReporteFormularioHtml(reporteId, titulo, descripcion);
    } else if (tipo === "eliminar-reporte") {
        const reporteId = button.getAttribute("data-id");
        const modalLabel = document.getElementById("modal-label");
        const modalBody = document.getElementById("modal-body");
        modalLabel.textContent = "Eliminar Reporte";
        modalBody.innerHTML = eliminarReporteFormularioHtml(reporteId);
    }
}