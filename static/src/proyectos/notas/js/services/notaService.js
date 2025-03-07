export function obtenerNotas(proyecto_id, successCallback, errorCallBack) {
    const url = `/proyectos/ajax/listar-notas/${proyecto_id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error));
}
