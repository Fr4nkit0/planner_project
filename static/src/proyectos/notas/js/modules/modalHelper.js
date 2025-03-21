import { formularioNotaHtml, detalleNotaHtml } from "../components/notaHtml.js"
import { obtenerNota } from "../services/notaService.js";
import { cargarComentarios } from "./comentarioLoader.js"

// Luego usa obtenerNota directamente
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

    // Si la estrategia tiene una función async, espera a que termine
    if (estrategia.esAsync) {
        estrategia.html(button)
            .then(contenidoHtml => {
                modalBody.innerHTML = contenidoHtml;
                // Si hay acciones posteriores a cargar el HTML
                if (estrategia.despuesDeCargar) {
                    estrategia.despuesDeCargar(button);
                }
            })
            .catch(error => {
                console.error("Error al cargar el contenido del modal:", error);
                modalBody.innerHTML = `<div class="alert alert-danger">Error al cargar los datos: ${error.message}</div>`;
            });
    } else {
        // Carga síncrona 
        modalBody.innerHTML = estrategia.html(button);
        // Si hay acciones posteriores a cargar el HTML
        if (estrategia.despuesDeCargar) {
            estrategia.despuesDeCargar(button);
        }
    }
}

const estrategiasModales = {
    "crear-nota": {
        titulo: () => "Crear Nota",
        html: () => formularioNotaHtml(),
    },
    "ver-nota": {
        titulo: (button) => button.getAttribute("data-titulo") || "Detalle de Nota",
        html: (button) => detalleNotaHtml(button.getAttribute("data-id")),
        despuesDeCargar: (button) => {
            const notaId = button.getAttribute("data-id");
            if (!notaId) {
                console.error("ID de nota no proporcionado");
                return;
            }

            // Usar el servicio obtenerNota
            obtenerNota(
                notaId,
                // Success callback
                (nota) => {
                    // Actualizar los elementos del modal con los datos de la nota
                    document.getElementById('titulo-nota').textContent = nota.titulo;
                    document.getElementById('descripcion').textContent = nota.descripcion;

                    // Configurar la fecha pendiente
                    if (nota.pendiente) {
                        document.getElementById('Pendiente').textContent = formatearFecha(nota.pendiente);
                    }

                    // Configurar los botones de acciones con el ID correcto
                    const btnEliminar = document.querySelector('button[data-tipo="eliminar-nota"]');
                    if (btnEliminar) {
                        btnEliminar.dataset.id = notaId;
                    }

                    const btnEditar = document.querySelector('button[data-tipo="editar-nota"]');
                    if (btnEditar) {
                        btnEditar.dataset.id = notaId;
                    }
                    console.log(notaId)
                    cargarComentarios(notaId);


                },
                // Error callback
                (error) => {
                    console.error("Error al obtener la nota:", error);
                    const modalBody = document.getElementById("modal-body");
                    modalBody.innerHTML = `<div class="alert alert-danger">Error al cargar los datos de la nota</div>`;
                }
            );
        }
    }
    // },
    // "eliminar-nota": {
    //     titulo: () => "Eliminar Nota",
    //     html: () => `
    //         <div class="text-center">
    //             <p>¿Estás seguro de que deseas eliminar esta nota?</p>
    //             <div class="d-flex justify-content-center gap-3 mt-4">
    //                 <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    //                 <button id="confirmar-eliminar" class="btn btn-danger">Eliminar</button>
    //             </div>
    //         </div>
    //     `,
    //     despuesDeCargar: (button) => {
    //         const notaId = button.getAttribute("data-id");
    //         document.getElementById("confirmar-eliminar").addEventListener("click", () => {
    //             // Aquí iría la lógica para eliminar la nota
    //             console.log("Eliminar nota con ID:", notaId);
    //             // cerrarModal();
    //         });
    //     }
    // },
    // "editar-nota": {
    //     titulo: () => "Editar Nota",
    //     esAsync: true,
    //     html: async (button) => {
    //         const notaId = button.getAttribute("data-id");
    //         if (!notaId) {
    //             throw new Error("ID de nota no proporcionado");
    //         }

    //         return new Promise((resolve, reject) => {
    //             obtenerNota(
    //                 notaId,
    //                 // Success callback
    //                 (nota) => {
    //                     // Retornar el formulario de edición con los datos pre-cargados
    //                     resolve(formularioNotaHtml(nota));
    //                 },
    //                 // Error callback
    //                 (error) => {
    //                     console.error("Error al obtener la nota para editar:", error);
    //                     reject(error);
    //                 }
    //             );
    //         });
    //     }
    // }
};

// Función auxiliar para formatear la fecha
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
}