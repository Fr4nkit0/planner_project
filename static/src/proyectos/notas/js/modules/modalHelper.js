import { formularioNotaHtml, detalleNotaHtml } from "../components/notaHtml.js"
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
const estrategiasModales = {
    "crear-nota": {
        titulo: () => "Crear Nota",
        html: () => formularioNotaHtml(),
    },
    "ver-nota": {
        titulo: (button) => button.getAttribute("data-titulo") || "Detalle de Nota",
        html: (button) => {
            const contenido = button.getAttribute("data-contenido");
            const fecha = button.getAttribute("data-fecha");
            return detalleNotaHtml(contenido, fecha);
        },
    }
};