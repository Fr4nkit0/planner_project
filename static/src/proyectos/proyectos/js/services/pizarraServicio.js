
export function crearPizarra(form, successCallback, errorCallBack) {
    const url = "ajax/crear-pizarra";
    const csrfToken = getCSRFToken();
    const formData = new FormData(form);
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