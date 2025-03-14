import { obtenerProyectos, eliminarProyecto, actualizarProyecto, crearProyecto } from "./services/proyectoServicio.js";
import { crearPizarra, eliminarPizarra, actualizarPizarra } from "./services/pizarraServicio.js";
import { listarProyectos, actualizarModal } from "./components/proyectoComponents.js";

function cargarProyectos(searchQuery = '') {
    obtenerProyectos(searchQuery, (data) => {
        console.log(data)
        listarProyectos(data);
    }, (error) => {
        console.log(error);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
    // Escuchar cambios en el campo de búsqueda
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        let timer;
        searchInput.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const searchQuery = searchInput.value.trim();
                cargarProyectos(searchQuery); // Busqueda
            }, 300); // Espera 300 ms después de que el usuario deje de escribir
        });
    }
})
document.addEventListener("click", (e) => {
    // Detectar clic en una tarjeta (redirigir solo si NO es un modal o dropdown)
    const card = e.target.closest(".card");
    if (card && !e.target.closest(".dropdown") && !card.dataset.bsToggle) {
        window.location.href = card.dataset.url; // Redirigir a la URL
    }
    if (e.target.closest("[data-bs-target='#modal']")) {
        const button = e.target.closest("[data-bs-target='#modal']");
        actualizarModal(button);
    }

    if (e.target.closest(".dropdown-toggle")) {
        e.stopPropagation();
        return;
    }
});
document.addEventListener("submit", (e) => {
    if (e.target && e.target.id != "form-cerrar-session") {
        e.preventDefault();
        if (e.target && e.target.id == "form-pizarra") {
            const form = document.getElementById("form-pizarra");
            crearPizarra(form,
                (data) => {
                    const modalElement = document.getElementById("modal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement)
                    modalInstance.hide();
                    cargarProyectos();
                },
                (error) => {
                    console.log(error);
                });
        }
        if (e.target && e.target.id == "form-eliminar-proyecto") {
            const form = document.getElementById("form-eliminar-proyecto");
            console.log(form);
            eliminarProyecto(form,
                (data) => {
                    const modalElement = document.getElementById("modal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement)
                    modalInstance.hide();
                    cargarProyectos();
                },
                (error) => {
                    console.log(error);
                })
        }
        if (e.target && e.target.id == "form-crear-proyecto") {
            const form = document.getElementById("form-crear-proyecto");
            crearProyecto(form,
                (data) => {
                    const modalElement = document.getElementById("modal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                    cargarProyectos();

                },
                (error) => {
                    console.log(error);
                })
        }
        if (e.target && e.target.id == "form-actualizar-proyecto") {
            const form = document.getElementById("form-actualizar-proyecto");
            console.log(form);
            actualizarProyecto(form,
                (data) => {
                    const modalElement = document.getElementById("modal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                    cargarProyectos();

                },
                (error) => {
                    console.log(error);
                }
            )
        }
        if (e.target && e.target.id == "form-eliminar-pizarra") {
            const modalElement = document.getElementById("modal");
            const form = document.getElementById("form-eliminar-pizarra");
            eliminarPizarra(form,
                (data) => {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement)
                    modalInstance.hide();
                    cargarProyectos();
                },
                (error) => {
                    console.log(error);
                });
        }
        if (e.target && e.target.id == "form-actualizar-pizarra") {
            const modalElement = document.getElementById("modal");
            const form = document.getElementById("form-actualizar-pizarra");
            actualizarPizarra(form,
                (data) => {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement)
                    modalInstance.hide();
                    cargarProyectos();
                },
                (error) => {
                    console.log(error);
                });
        }
    }
});