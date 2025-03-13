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
    cargarReportes();

    document.addEventListener("click", (e) => {
        const target = e.target.closest("button");

        if (target) {
            const tipo = target.getAttribute("data-tipo");
            const id = target.getAttribute("data-id");

            if (tipo === "editar-reporte" || tipo === "eliminar-reporte") {
                console.log(tipo);
                actualizarModal(target);
                const modal = new bootstrap.Modal(document.getElementById("modal"));
                modal.show();

                const form = document.getElementById(`form-${tipo}`);
                if (form) {
                    form.removeEventListener("submit", submitHandler);
                    form.addEventListener("submit", submitHandler);
                }
            }
        }

        if (e.target.matches("[data-bs-dismiss='modal']")) {
            cerrarModalCorrectamente();
        }
    });
});

function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const tipo = form.getAttribute("id").includes("editar") ? "editar-reporte" : "eliminar-reporte";

    if (tipo === "editar-reporte") {
        actualizarReporte(form, (data) => {
            console.log("Respuesta del servidor:", data);
            cerrarModalYActualizar();
        }, (error) => {
            console.log(error);
        });
    } else if (tipo === "eliminar-reporte") {
        eliminarReporte(form, (data) => {
            console.log("Respuesta del servidor:", data);
            cerrarModalYActualizar();
        }, (error) => {
            console.log(error);
        });
    }
}

function cerrarModalYActualizar() {
    cerrarModalCorrectamente();
    cargarReportes(); // Vuelve a cargar la lista de reportes
}

function cerrarModalCorrectamente() {
    const modalElement = document.getElementById("modal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
    setTimeout(() => {
        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
    }, 300);
}