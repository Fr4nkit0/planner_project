// index.js
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
        console.log("skjdahskdjahsdkasjhdkasjdhaksjdhk");
        const target = e.target.closest("a");

        if (target) {
            const tipo = target.getAttribute("data-tipo");
            const id = target.getAttribute("data-id");

            if (tipo === "editar-reporte" || tipo === "eliminar-reporte") {
                console.log(tipo) ;
                actualizarModal(target);
                const modal = new bootstrap.Modal(document.getElementById("modal"));
                modal.show();

                const form = document.getElementById(`form-${tipo}`);
                if (form) {
                    form.addEventListener("submit", (e) => {
                        const url = `/reportes/ajax/${tipo}`;
                        console.log(url) ;
                        if (tipo === "editar-reporte") {
                            actualizarReporte(form, (data) => {
                                console.log("Respuesta del servidor:", data);
                                modal.hide();
                                cargarReportes();
                            }, (error) => {
                                console.log(error);
                            });
                        } else if (tipo === "eliminar-reporte") {
                            eliminarReporte(form, (data) => {
                                console.log("Respuesta del servidor:", data);
                                modal.hide();
                                cargarReportes();
                            }, (error) => {
                                console.log(error);
                            });
                        }
                    });
                }
            }
        }
    });
});