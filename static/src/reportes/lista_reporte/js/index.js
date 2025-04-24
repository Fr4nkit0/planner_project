import { obtenerReportes, eliminarReporte, actualizarReporte, crearReporte } from "./services/reporteServicio.js";
import { listarReportes, actualizarModal } from "./components/reporteComponents.js";

// Variable para controlar envíos múltiples
let enviandoFormulario = false;
// Variable para controlar el debounce de la búsqueda
let debounceTimer;

// Función para cargar reportes con paginación
function cargarReportes(pagina = 1, searchQuery = '') {
    obtenerReportes(pagina, searchQuery, (data) => {
        console.log(data);
        listarReportes(data, searchQuery);
    }, (error) => {
        console.log(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Cargar reportes iniciales
    cargarReportes();

    // Campo de búsqueda con debounce (búsqueda en tiempo real)
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = this.value.trim();
                cargarReportes(1, query);
            }, 300); // Espera 300ms después de que el usuario deje de escribir
        });
    }
    
    // Campo de búsqueda
    const searchForm = document.getElementById("search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const searchInput = document.getElementById("search-input");
            const query = searchInput ? searchInput.value.trim() : '';
            cargarReportes(1, query);
        });
    }
    
    // Event listener para paginación y botones de acción
    document.addEventListener("click", (e) => {
        // Manejo de paginación
        if (e.target.closest(".page-link")) {
            console.log(e.target.closest(".page-link"))
            e.preventDefault();
            const pagina = parseInt(e.target.getAttribute("data-pagina")) || 1;
            const searchQuery = e.target.getAttribute("data-query") || '';
            if (pagina) {
                cargarReportes(pagina, searchQuery);
            }
        }
        
        // Manejo de botones de acción
        const target = e.target.closest("button");
        if (target) {
            const tipo = target.getAttribute("data-tipo");
            if (["editar-reporte", "eliminar-reporte", "crear-reporte"].includes(tipo)) {
                actualizarModal(target);
                
                const modal = new bootstrap.Modal(document.getElementById("modal"));
                modal.show();
                
                const form = document.getElementById(`form-${tipo}`);
                if (form) {
                    form.removeEventListener("submit", submitHandler);
                    form.addEventListener("submit", submitHandler);
                }
            }
        }
        
        if (e.target.matches("[data-bs-dismiss='modal']")) {
            cerrarModalCorrectamente();
        }
    });
    
    // Validación de inputs
    document.addEventListener("input", (event) => {
        if (event.target.id === "titulo") {
            validarCampo(event.target, 100, "error-titulo");
        } else if (event.target.id === "descripcion") {
            validarCampo(event.target, 500, "error-descripcion");
        }
    });
});

// Función para manejar envío de formularios
function submitHandler(e) {
    e.preventDefault();
    if (enviandoFormulario) return;
    enviandoFormulario = true;
    
    const form = e.target;
    
    if (!validarFormulario(form)) {
        enviandoFormulario = false;
        return;
    }
    
    const tipo = form.getAttribute("id").includes("editar") ? "editar-reporte" :
        form.getAttribute("id").includes("eliminar") ? "eliminar-reporte" : "crear-reporte";
    
    if (tipo === "editar-reporte") {
        actualizarReporte(form, manejarRespuesta, manejarError);
    } else if (tipo === "eliminar-reporte") {
        eliminarReporte(form, manejarRespuesta, manejarError);
    } else if (tipo === "crear-reporte") {
        crearReporte(form, manejarRespuesta, manejarError);
    }
}

// Función para manejar respuesta exitosa
function manejarRespuesta(data) {
    console.log("✅ Respuesta del servidor:", data);
    cerrarModalYActualizar();
    enviandoFormulario = false;
}

// Función para manejar errores
function manejarError(error) {
    console.log("❌ Error:", error);
    enviandoFormulario = false;
}

// Función para validar formulario
function validarFormulario(form) {
    let valido = true;
    const titulo = form.querySelector("#titulo");
    const descripcion = form.querySelector("#descripcion");
    
    if (titulo && titulo.value.length > 100) {
        validarCampo(titulo, 100, "error-titulo");
        valido = false;
    }
    
    if (descripcion && descripcion.value.length > 500) {
        validarCampo(descripcion, 500, "error-descripcion");
        valido = false;
    }
    
    if (!valido) {
        alert("Corrige los errores antes de enviar el formulario.");
    }
    
    return valido;
}

// Función para validar campo
function validarCampo(input, maxLength, errorId) {
    const errorMsg = document.getElementById(errorId);
    if (input.value.length > maxLength) {
        errorMsg.classList.remove("d-none");
    } else {
        errorMsg.classList.add("d-none");
    }
}

// Función para cerrar modal y actualizar reportes
function cerrarModalYActualizar() {
    cerrarModalCorrectamente();
    
    // Obtener la query de búsqueda actual si existe
    const searchInput = document.getElementById("search-input");
    const searchQuery = searchInput ? searchInput.value.trim() : '';
    
    // Recargar la página actual
    const paginacionActual = document.querySelector(".page-item.active .page-link");
    const pagina = paginacionActual ? parseInt(paginacionActual.getAttribute("data-pagina") || paginacionActual.textContent) : 1;
    
    cargarReportes(pagina, searchQuery);
}

// Función para cerrar modal correctamente
function cerrarModalCorrectamente() {
    const modalElement = document.getElementById("modal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
    
    modalElement.addEventListener("hidden.bs.modal", () => {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = ""; // ✅ Habilita el scroll
        document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
    }, { once: true });
}