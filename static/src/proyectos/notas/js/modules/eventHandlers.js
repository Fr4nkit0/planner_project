import { cargarNotas } from "./notaLoader.js";
import { actualizarModal } from "./modalHelper.js";


export function initEventHandlers() {
    document.addEventListener("click", (e) => {
        if (e.target.closest("[data-bs-target='#modal']")) {
            const button = e.target.closest("[data-bs-target='#modal']");
            actualizarModal(button);
        }
        if (e.target.closest(".page-link")) {
            e.preventDefault();
            const pagina = parseInt(e.target.getAttribute("data-pagina")) || 1;
            const searchQuery = e.target.getAttribute("data-query") || '';
            if (pagina) {
                cargarNotas(pagina, searchQuery); // Pasa la página y el término de búsqueda        
            }
        }
    });
}
let debounceTimer;
export function initSearchHandler() {
    document.addEventListener("input", (e) => {
        if (e.target.id === "search-input") {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                // Forzar búsqueda incluso con string vacío
                cargarNotas(1, e.target.value.trim());
            }, 300);
        }
    });
}