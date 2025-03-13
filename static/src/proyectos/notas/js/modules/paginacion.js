export function obtenerRangoPaginacion(totalPaginas, paginaActual) {
    let principioPagina, finPagina;
    if (totalPaginas < 4) {
        principioPagina = 1;
        finPagina = totalPaginas;
    } else {
        // Si hay más de 4 páginas, calcula el rango dinámico
        if (paginaActual <= 2) {
            principioPagina = 1;
            finPagina = 4;
        } else if (paginaActual + 1 >= totalPaginas) {
            // Para las últimas páginas, muestra las últimas 4
            principioPagina = totalPaginas - 3;
            finPagina = totalPaginas;
        } else {
            // En el medio, centra la página actual lo más posible
            principioPagina = paginaActual - 1;
            finPagina = paginaActual + 2;
        }
    }
    return { principioPagina, finPagina };
}