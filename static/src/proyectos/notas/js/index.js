import { obtenerNotas } from "./services/notaService.js";
import { mostrarNotas, actualizarModal } from "./components/notaComponents.js";
import { obtenerIdPizarraUrl } from "./modules/notaModules.js";
function cargarNotas() {
    const pizarraId = obtenerIdPizarraUrl();
    obtenerNotas(pizarraId,
        (data) => {
            console.log(data);
            mostrarNotas(data);
        },
        (error) => {
            console.log(error);
        }
    );
}

document.addEventListener("DOMContentLoaded", () => {
    cargarNotas();
});

document.addEventListener("click", (e) => {
    if (e.target.closest("[data-bs-target='#modal']")) {
        const button = e.target.closest("[data-bs-target='#modal']");
        actualizarModal(button);
    }
});