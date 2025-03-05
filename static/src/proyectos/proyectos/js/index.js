import { obtenerProyectos } from "./services/proyectoServicio.js";
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