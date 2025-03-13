import { obtenerReportes, eliminarReporte, actualizarReporte, crearReporte } from "./services/reporteServicio.js";
import { listarReportes, actualizarModal } from "./components/reporteComponents.js";

function cargarReportes() {
    obtenerReportes((data) => {
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

            if (["editar-reporte", "eliminar-reporte", "crear-reporte"].includes(tipo)) {
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
    const tipo = form.getAttribute("id").includes("editar") ? "editar-reporte" :
                 form.getAttribute("id").includes("eliminar") ? "eliminar-reporte" : 
                 "crear-reporte";

    if (tipo === "editar-reporte") {
        actualizarReporte(form, manejarRespuesta, manejarError);
    } else if (tipo === "eliminar-reporte") {
        eliminarReporte(form, manejarRespuesta, manejarError);
    } else if (tipo === "crear-reporte") {
        crearReporte(form, manejarRespuesta, manejarError);
    }
}

function manejarRespuesta(data) {
    console.log("✅ Respuesta del servidor:", data);
    cerrarModalYActualizar();
}

function manejarError(error) {
    console.log("❌ Error:", error);
}

function cerrarModalYActualizar() {
    cerrarModalCorrectamente();
    cargarReportes(); // Recargar la lista de reportes
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
