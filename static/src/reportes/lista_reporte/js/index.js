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
    document.addEventListener("input", (event) => {
        if (event.target.id === "titulo") {
            validarCampo(event.target, 100, "error-titulo");
        } else if (event.target.id === "descripcion") {
            validarCampo(event.target, 500, "error-descripcion");
        }
    });
});

function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const tipo = form.getAttribute("id").includes("editar") ? "editar-reporte" :
                form.getAttribute("id").includes("eliminar") ? "eliminar-reporte" : 
                "crear-reporte";

    if (!validarFormulario(form)) {
        return; // ❌ Detener el envío si hay errores
    }

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

function validarFormulario(form) {
    let valido = true;
    const titulo = form.querySelector("#titulo");
    const descripcion = form.querySelector("#descripcion");

    if (titulo && titulo.value.length > 100) {
        validarCampo(titulo, 100, "error-titulo");
        valido = false;
    }
    if (descripcion && descripcion.value.length > 500) {
        validarCampo(descripcion, 500, "error-descripcion");
        valido = false;
    }

    if (!valido) {
        alert("Corrige los errores antes de enviar el formulario.");
    }
    return valido;
}

function validarCampo(input, maxLength, errorId) {
    const errorMsg = document.getElementById(errorId);
    if (input.value.length > maxLength) {
        errorMsg.classList.remove("d-none");
    } else {
        errorMsg.classList.add("d-none");
    }
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
    modalElement.addEventListener("hidden.bs.modal", () => {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = ""; // ✅ Habilita el scroll
        document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
    }, { once: true });
}
