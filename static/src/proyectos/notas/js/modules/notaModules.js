export function obtenerIdPizarraUrl() {
    const pathParts = window.location.pathname.split('/').filter(part => part);
    return pathParts[pathParts.length - 1];
}