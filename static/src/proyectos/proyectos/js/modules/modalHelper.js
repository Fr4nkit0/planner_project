import { crearProyectoFormularioHtml, editarProyectoFormularioHtml, crearVerProyectoHtml, eliminarProyectoFormularioHtml } from "../components/proyectoHtml.js"
import { formularioPizarraHtml, formularioEditarPizarraHtml, formularioEliminarPizarraHtml } from "../components/pizarraHtml.js";
export function cerrarModal() {
    const modalElement = document.getElementById("modal");
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
}
export function actualizarModal(button) {
    const tipo = button.getAttribute("data-tipo");
    const estrategia = estrategiasModales[tipo];

    if (!estrategia) {
        console.error(`No hay estrategia definida para el tipo: ${tipo}`);
        return;
    }

    const modalLabel = document.getElementById("modal-label");
    const modalBody = document.getElementById("modal-body");

    modalLabel.textContent = estrategia.titulo(button);
    modalBody.innerHTML = estrategia.html(button);
}

// Estrategias de modales
const estrategiasModales = {
    "crear-proyecto": {
        titulo: () => "Crear Proyecto",
        html: () => crearProyectoFormularioHtml(),
    },
    "editar-proyecto": {
        titulo: () => "Editar Proyecto",
        html: (button) => {
            const id = button.getAttribute("data-id");
            const nombre = button.getAttribute("data-nombre");
            const descripcion = button.getAttribute("data-descripcion");
            return editarProyectoFormularioHtml(id, nombre, descripcion);
        },
    },
    "ver-proyecto": {
        titulo: (button) => button.getAttribute("data-nombre"),
        html: (button) => {
            const nombre = button.getAttribute("data-nombre");
            const descripcion = button.getAttribute("data-descripcion");
            const fecha = button.getAttribute("data-fecha");
            return crearVerProyectoHtml(nombre, descripcion, fecha);
        },
    },
    "eliminar-proyecto": {
        titulo: (button) => `Eliminar Proyecto ${button.getAttribute("data-nombre")}`,
        html: (button) => eliminarProyectoFormularioHtml(button.getAttribute("data-id")),
    },
    "crear-pizarra": {
        titulo: () => "Crear Pizarra",
        html: (button) => formularioPizarraHtml(button.getAttribute("data-id")),
    },
    "editar-pizarra": {
        titulo: () => "Actualizar Pizarra",
        html: (button) => {
            const id = button.getAttribute("data-id");
            const nombre = button.getAttribute("data-nombre");
            return formularioEditarPizarraHtml(id, nombre);
        },
    },
    "eliminar-pizarra": {
        titulo: () => "Eliminar Pizarra",
        html: (button) => {
            const id = button.getAttribute("data-id");
            const nombre = button.getAttribute("data-nombre");
            return formularioEliminarPizarraHtml(id, nombre);
        },
    }
};
