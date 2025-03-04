export function obtenerProyectos(successCallback, errorCallBack) {
    const url = "ajax/listar-proyectos"
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallBack(error))
}