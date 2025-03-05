export function obtenerProyectos(successCallback, errorCallBack) {
    const url = "ajax/listar-proyectos"
    const csrfToken = getCSRFToken();
    fetch(url)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error))
}
export function eliminarProyecto(form, successCallback, errorCallBack) {
    const url = "ajax/eliminar-proyecto"
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
        .catch(error => errorCallBack(error))
}
export function actualizarProyecto(form, successCallback, errorCallBack) {
    const url = "ajax/actualizar-proyecto"
    const formData = new FormData(form);
    const csrfToken = getCSRFToken();
    for (let [key, value] of formData.entries()) {
        console.log(key, value);  // Verifica todos los campos que se están enviando
    }
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
        .catch(error => errorCallBack(error))
}
function getCSRFToken() {
    let csrfToken = null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("csrftoken=")) {
            csrfToken = cookie.split("=")[1];
            break;
        }
    }
    return csrfToken;
}