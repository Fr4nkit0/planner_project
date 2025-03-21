import { cargarNotas } from "./notaLoader.js";
import { actualizarModal } from "./modalHelper.js";

export function initEventHandlers() {
    document.addEventListener("click", (e) => {
        const abrirModalBtn = e.target.closest("[data-bs-target='#modal']");
        const actualizarModalBtn = e.target.closest(".actualizar-modal");

        // Si se hace clic en un botón que abre el modal
        if (abrirModalBtn) {
            actualizarModal(abrirModalBtn);
        }
        // Si se hace clic en un botón dentro del modal que actualiza su contenido
        else if (actualizarModalBtn) {
            e.preventDefault();
            // Verifica que el botón tenga un 'data-tipo' válido y ejecuta la acción de actualización
            const tipo = actualizarModalBtn.getAttribute("data-tipo");
            if (tipo) {
                actualizarModal(actualizarModalBtn);
            }
        }

        // Manejo de la paginación
        if (e.target.closest(".page-link")) {
            e.preventDefault();
            const pagina = parseInt(e.target.getAttribute("data-pagina")) || 1;
            const searchQuery = e.target.getAttribute("data-query") || '';
            if (pagina) {
                cargarNotas(pagina, searchQuery);
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