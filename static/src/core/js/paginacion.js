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
export function generacionPaginacion(paginacion, searchQuery) {
    const paginacionContainer = document.getElementById("container-paginacion");
    // Limpia el contenedor si no hay más de una página
    if (paginacion.total_paginas <= 1) {
        paginacionContainer.innerHTML = "";
        return;
    }

    let paginacionHtml = '<nav aria-label="Page navigation"><ul class="pagination justify-content-center">';
    // Boton "Anterior"
    if (paginacion.pagina_actual > 1) {
        paginacionHtml += `
        <li class="page-item">
            <a class="page-link" href="#" data-pagina="${Number(paginacion.pagina_actual) - 1}" data-query="${searchQuery}" aria-label="Previous">
                Anterior
            </a>
        </li>`;
    }

    // Calcular el rango de páginas a mostrar (4 botones)
    let { principioPagina, finPagina } = obtenerRangoPaginacion(paginacion.total_paginas, paginacion.pagina_actual);
    // Generar los botones de paginacion 
    for (let i = principioPagina; i <= finPagina; i++) {
        if (i == paginacion.pagina_actual) {
            paginacionHtml += `
            <li class="page-item active" aria-current="page">
                <span class="page-link">${i}</span>
            </li>`;
        } else {
            paginacionHtml += `
            <li class="page-item">
                <a class="page-link" href="#" data-pagina="${i}" data-query="${searchQuery}" >${i}</a>
            </li>`;
        }
    }
    // Botón "Siguiente"
    if (paginacion.pagina_actual < paginacion.total_paginas) {
        paginacionHtml += `
        <li class="page-item">
            <a class="page-link" href="#" data-pagina="${Number(paginacion.pagina_actual) + 1}"  data-query="${searchQuery}"aria-label="Next">
                Siguiente
            </a>
        </li>`;
    }
    paginacionHtml += '</ul></nav>';
    paginacionContainer.innerHTML = paginacionHtml;
}