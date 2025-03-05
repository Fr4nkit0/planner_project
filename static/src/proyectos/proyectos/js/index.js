import { obtenerProyectos, eliminarProyecto, actualizarProyecto } from "./services/proyectoServicio.js";
import { crearPizarra } from "./services/pizarraServicio.js";
import { listarProyectos, actualizarModal } from "./components/proyectoComponents.js";

function cargarProyectos() {
    obtenerProyectos((data) => {
        console.log(data);
        listarProyectos(data);
    }, (error) => {
        console.log(error);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
})
document.addEventListener("click", (e) => {
    if (e.target.closest("[data-bs-target='#modal']")) {
        const button = e.target.closest("[data-bs-target='#modal']");
        actualizarModal(button);
    }
});
document.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target && e.target.id == "form-pizarra") {
        const form = document.getElementById("form-pizarra");
        crearPizarra(form,
            (data) => {
                const modalElement = document.getElementById("modal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement)
                modalInstance.hide();
                cargarProyectos();

            },
            (error) => {
                console.log(error);
            });
    }
    if (e.target && e.target.id == "form-eliminar-proyecto") {
        const form = document.getElementById("form-eliminar-proyecto");
        console.log(form);
        eliminarProyecto(form,
            (data) => {
                const modalElement = document.getElementById("modal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement)
                modalInstance.hide();
                cargarProyectos();

            },
            (error) => {
                console.log(error);
            })
    }
    if (e.target && e.target.id == "form-actualizar-proyecto") {
        const form = document.getElementById("form-actualizar-proyecto");
        console.log(form);
        actualizarProyecto(form,
            (data) => {
                const modalElement = document.getElementById("modal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement)
                modalInstance.hide();
                cargarProyectos();

            },
            (error) => {
                console.log(error);
            }
        )

    }
});