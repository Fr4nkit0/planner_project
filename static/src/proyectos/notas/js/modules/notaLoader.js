import { obtenerNotas } from "../services/notaService.js";
import { mostrarNotas } from "../components/notaComponents.js";
import { obtenerIdPizarraUrl } from "./urlPizarra.js";
let debounceTimer;

export function cargarNotas(pagina = 1, searchQuery = '') {
    const pizarraId = obtenerIdPizarraUrl();
    obtenerNotas(pizarraId, pagina, searchQuery,
        (data) => {
            mostrarNotas(data, searchQuery);
        },
        (error) => {
            console.log(error);
        }
    );
}
document.addEventListener("input", (e) => {
    if (e.target.id === "search-input") {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            cargarNotas(searchQuery = e.target.value.trim());
        }, 300);
    }
});