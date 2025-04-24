import { obtenerNotas } from "../services/notaService.js";
import { mostrarNotas } from "../components/notaComponents.js";
import { obtenerIdPizarraUrl } from "./urlPizarra.js";

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
