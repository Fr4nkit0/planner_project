import { getCSRFToken } from "../../../../core/js/security.js"
export function obtenerNotas(proyecto_id, pagina = 1, searchQuery = '', successCallback, errorCallBack) {
    const url = `/proyectos/ajax/listar-notas/${proyecto_id}?page=${pagina}&q=${encodeURIComponent(searchQuery)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error));
}
export function obtenerNota(nota_id, successCallback, errorCallBack) {
    const url = `/proyectos/ajax/obtener-nota/${nota_id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error));
}
export function crearNota(form, successCallback, errorCallBack) {
    const url = `/proyectos/ajax/crear-nota`;
    const formData = new FormData(form);
    const csrfToken = getCSRFToken();
    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrfToken,
            "X-Requested-With": "XMLHttpRequest"
        },

    })
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error));
}
export function eliminarNota(form, successCallback, errorCallBack) {
    const url = "/proyectos/ajax/eliminar-nota";
    const formData = new FormData(form);
    const csrfToken = getCSRFToken();
    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrfToken,
            "X-Requested-With": "XMLHttpRequest"
        },

    })
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error));
}
