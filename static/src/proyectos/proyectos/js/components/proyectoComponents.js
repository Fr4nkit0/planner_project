import { proyectoHtml, editarProyectoFormularioHtml, eliminarProyectoFormularioHtml, crearProyectoFormularioHtml } from "./proyectoHtml.js";
import { crearPizarraHtml, crearEditarPizarraHtml, crearEliminarPizarraHtml } from "./pizarraComponents.js"
export function listarProyectos(data) {
    const proyectosContainer = document.getElementById("proyectos-container");
    proyectosContainer.innerHTML = "";
    if (data.proyectos && data.proyectos.length > 0) {
        data.proyectos.forEach(proyecto => {
            proyectosContainer.innerHTML += proyectoHtml(proyecto);
        });
    } else {
        proyectosContainer.innerHTML = `<h1>No hay proyectos</h1>`;
    }
}
export function actualizarModal(button) {
    const tipo = button.getAttribute("data-tipo");
    console.log(tipo)
    return tipoDeModal(button, tipo);
}
function tipoDeModal(button, tipo) {
    if (tipo == "crear-proyecto") {
        crearProyectoHtml(button);
    }
    if (tipo == "editar-proyecto") {
        crearEditarProyectoHtml(button);
    }
    if (tipo == "eliminar-proyecto") {
        crearEliminarProyectoHtml(button);
    }
    if (tipo == "crear-pizarra") {
        crearPizarraHtml(button);
    }
    if (tipo == "editar-pizarra") {
        crearEditarPizarraHtml(button);
    }
    if (tipo == "eliminar-pizarra") {
        crearEliminarPizarraHtml(button)
    }


}
function crearProyectoHtml(button) {
    console.log("Entrando a crear Proyeecto");
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Crear Proyecto";
    modalBody.innerHTML = crearProyectoFormularioHtml();

}
function crearEditarProyectoHtml(button) {
    const proyectoId = button.getAttribute("data-id");
    const nombreProyecto = button.getAttribute("data-nombre");
    const descripcionProyecto = button.getAttribute("data-descripcion");
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Editar Proyecto";
    modalBody.innerHTML = editarProyectoFormularioHtml(proyectoId, nombreProyecto, descripcionProyecto);
}
function crearEliminarProyectoHtml(button) {
    const proyectoId = button.getAttribute("data-id");
    const nombreProyecto = button.getAttribute("data-nombre");
    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");
    modalLabel.textContent = "Eliminar Proyecto  " + nombreProyecto;
    modalBody.innerHTML = eliminarProyectoFormularioHtml(proyectoId);
}