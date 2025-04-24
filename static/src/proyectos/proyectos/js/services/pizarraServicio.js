import { getCSRFToken } from "../../../../core/js/security.js"
export function crearPizarra(form, successCallback, errorCallBack) {
    const url = "ajax/crear-pizarra";
    const csrfToken = getCSRFToken();
    const formData = new FormData(form);
    // Mostrar contenido del formulario en consola
    console.log("Datos del formulario:");
    for (let [key, value] of formData.entries()) {
        console.log(key + ": ", value);
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
        .catch(error => errorCallBack(error));
}
export function actualizarPizarra(form, successCallback, errorCallBack) {
    const url = "ajax/actualizar-pizarra";
    const csrfToken = getCSRFToken();
    const formData = new FormData(form);
    // Mostrar contenido del formulario en consola
    console.log("Datos del formulario:");
    for (let [key, value] of formData.entries()) {
        console.log(key + ": ", value);
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
        .catch(error => errorCallBack(error));
}


export function eliminarPizarra(form, successCallback, errorCallBack) {
    const url = "ajax/eliminar-pizarra";
    const csrfToken = getCSRFToken();
    const formData = new FormData(form);
    // Mostrar contenido del formulario en consola
    console.log("Datos del formulario:");
    for (let [key, value] of formData.entries()) {
        console.log(key + ": ", value);
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
        .catch(error => errorCallBack(error));
}