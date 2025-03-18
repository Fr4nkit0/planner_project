import { cargarNotas } from "./notaLoader.js";


export function initEventHandlers() {
    document.addEventListener("click", (e) => {
        if (e.target.closest("[data-bs-target='#modal']")) {
            const button = e.target.closest("[data-bs-target='#modal']");
            actualizarModal(button);
        }
        if (e.target.closest(".page-link")) {
            e.preventDefault();
            const pagina = e.target.getAttribute("data-pagina");
            const searchQuery = e.target.getAttribute("data-query") || '';
            if (pagina) {
                cargarNotas(pagina, searchQuery); // Pasa la página y el término de búsqueda        
            }
        }
    });
}