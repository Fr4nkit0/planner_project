// reporteServicio.js
export function obtenerReportes(successCallback, errorCallback) {
    const url = "/reportes/ajax/listar-reportes";
    fetch(url)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallback(error));
}

export function actualizarReporte(form, successCallback, errorCallback) {
    const url = "/reportes/ajax/actualizar-reporte";
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

export function eliminarReporte(form, successCallback, errorCallback) {
    const url = "/reportes/ajax/eliminar-reporte";
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

function getCSRFToken() {
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    return csrfToken;
}