import { pizarraHtml, botonModal } from "./pizarraHtml.js"
export function mostrarPizarras(data, proyectoId) {
    let contenido = "";
    if (data.pizarras && data.pizarras.length > 0) {
        contenido += data.pizarras.map(pizarra => pizarraHtml(pizarra)).join("");
    }
    contenido += botonModal(proyectoId);
    return contenido;
}