import { obtenerNotas, crearNota } from "./services/notaService.js";
import { mostrarNotas, actualizarModal } from "./components/notaComponents.js";
import { obtenerIdPizarraUrl } from "./modules/notaModules.js";
function cargarNotas(pagina = 1, searchQuery = '') {
    const pizarraId = obtenerIdPizarraUrl();
    obtenerNotas(pizarraId, pagina, searchQuery,
        (data) => {
            mostrarNotas(data, searchQuery);
        },
        (error) => {
            console.log(error);
        }
    );
}

document.addEventListener("DOMContentLoaded", () => {
    cargarNotas();
    // Escuchar cambios en el campo de búsqueda
    const searchInput = document.getElementById("search-input");
    console.log(searchInput)
    if (searchInput) {
        let timer;
        searchInput.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const searchQuery = searchInput.value.trim();
                cargarNotas(1, searchQuery); // Buscar desde la página 1 con el término ingresado
            }, 300); // Espera 300 ms después de que el usuario deje de escribir
        });
    }
});

document.addEventListener("click", (e) => {
    if (e.target.closest("[data-bs-target='#modal']")) {
        const button = e.target.closest("[data-bs-target='#modal']");
        actualizarModal(button);
    }
    if (e.target.closest(".page-link")) {
        e.preventDefault();
        const pagina = e.target.getAttribute("data-pagina");
        const searchQuery = e.target.getAttribute("data-query") || '';
        if (pagina) {
            cargarNotas(pagina, searchQuery); // Pasa la página y el término de búsqueda        
        }
    }
});
document.addEventListener("submit", (e) => {
    if (e.target && e.target.id != "form-cerrar-session") {
        e.preventDefault();
        if (e.target && e.target.id == "form-crear-nota") {
            const form = document.getElementById("form-crear-nota");
            crearNota(form,
                (data) => {
                    const modalElement = document.getElementById("modal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement)
                    modalInstance.hide();
                    cargarNotas();

                },
                (error) => {
                    console.log(error);
                }
            )
        }
        if (e.target && e.target.id == "form-editar-nota") {
            const form = document.getElementById("form-editar-nota");
            const formData = new FormData(form);
            // Mostrar contenido del formulario en consola
            console.log("Datos del formulario:");
            for (let [key, value] of formData.entries()) {
                console.log(key + ": ", value);
            }
        }
    }
})