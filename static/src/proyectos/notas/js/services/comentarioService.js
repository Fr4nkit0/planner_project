import { getCSRFToken } from "../../../../core/js/security.js"
export function obtenerComentarios(notaId, successCallback, errorCallBack) {
    const url = `/proyectos/ajax/listar-comentarios/${notaId}`
    fetch(url)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error));
}

export function crearComentario(form, successCallback, errorCallBack) {
    const url = '/proyectos/ajax/crear-comentario';
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
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error));
}
