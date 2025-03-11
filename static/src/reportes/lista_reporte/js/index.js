import { obtenerReportes, eliminarReporte, actualizarReporte } from "./services/reporteServicio.js";
import { listarReportes, actualizarModal } from "./components/reporteComponents.js";

function cargarReportes() {
    obtenerReportes((data) => {
        console.log(data);
        listarReportes(data);
    }, (error) => {
        console.log(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Cargar los reportes cuando se carga la página
    cargarReportes();

    // Manejar los clics en los botones de editar y eliminar
    document.addEventListener("click", (e) => {
        e.preventDefault(); // Prevenir acción por defecto (recarga de página)
        
        const target = e.target.closest("a"); // Buscar el enlace clicado
        if (target) {
            const tipo = target.getAttribute("data-tipo"); // Obtener el tipo de acción (editar/eliminar)
            const id = target.getAttribute("data-id"); // Obtener el ID del reporte

            // Si es para eliminar un reporte, mostrar el modal de confirmación
            if (tipo === "eliminar-reporte") {
                actualizarModal(target); // Actualizar el modal con la información del reporte
                const modal = new bootstrap.Modal(document.getElementById("modal"));
                modal.show(); // Mostrar el modal de eliminación
            }
            // Si es para editar un reporte, mostrar el modal de edición
            if (tipo === "editar-reporte") {
                const url = `/reportes/ajax/actualizar-reporte/${id}`;
                actualizarModal(target); // Actualizar el modal con la información del reporte
                const modal = new bootstrap.Modal(document.getElementById("modal"));
                modal.show(); // Mostrar el modal de edición

                const form = document.getElementById("form-editar-reporte");
    actualizarReporte(url, form, (data) => {
        const modalElement = document.getElementById("modal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide(); // Oculta el modal
        cargarReportes(); // Recarga la lista de reportes
    }, (error) => {
        console.log(error);
    });
            }
        }

        // Manejar el envío del formulario de edición
        if (e.target.closest("#form-editar-reporte")) { // Verificar si el formulario de edición fue enviado
            e.preventDefault(); // Prevenir la acción por defecto del formulario (recarga de página)
            const form = document.getElementById("form-editar-reporte");
            
            // Llamar a la función para actualizar el reporte
            actualizarReporte(form, (data) => {
                const modalElement = document.getElementById("modal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide(); // Ocultar el modal
                cargarReportes(); // Recargar la lista de reportes
            }, (error) => {
                console.log(error);
            });
        }

        // Manejar el envío del formulario de eliminación
        if (e.target.closest("#form-eliminar-reporte")) { // Verificar si el formulario de eliminación fue enviado
            e.preventDefault(); // Prevenir la acción por defecto del formulario (recarga de página)
            const form = document.getElementById("form-eliminar-reporte");

            // Llamar a la función para eliminar el reporte
            eliminarReporte(form, (data) => {
                const modalElement = document.getElementById("modal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide(); // Ocultar el modal
                cargarReportes(); // Recargar la lista de reportes
            }, (error) => {
                console.log(error);
            });
        }
    });
});