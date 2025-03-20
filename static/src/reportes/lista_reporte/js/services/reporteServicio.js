import { getCSRFToken } from "../../../../core/js/security.js";

export function obtenerReportes(pagina = 1, searchQuery = '', successCallback, errorCallback) {
    // Construir URL con parámetros de paginación y búsqueda
    const url = `ajax/listar-reportes?page=${pagina}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("📌 Respuesta del servidor:", data);
            successCallback(data);
        })
        .catch(error => {
            console.log("❌ Error al obtener reportes:", error);
            errorCallback(error);
        });
}

export function eliminarReporte(form, successCallback, errorCallback) {
    const url = "ajax/eliminar-reporte";
    const formData = new FormData(form);
    const csrfToken = getCSRFToken();
    fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            "X-CSRFToken": csrfToken,
            "X-Requested-With": "XMLHttpRequest"
        }
    })
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallback(error));
}

export function actualizarReporte(form, successCallback, errorCallback) {
    const url = "ajax/actualizar-reporte";
    const formData = new FormData(form);
    const csrfToken = getCSRFToken();
    fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            "X-CSRFToken": csrfToken,
            "X-Requested-With": "XMLHttpRequest"
        }
    })
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallback(error));
}

export function crearReporte(form, successCallback, errorCallback) {
    const url = "ajax/crear-reporte";
    const formData = new FormData(form);
    const csrfToken = getCSRFToken();
    fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            "X-CSRFToken": csrfToken,
            "X-Requested-With": "XMLHttpRequest"
        }
    })
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallback(error));
}