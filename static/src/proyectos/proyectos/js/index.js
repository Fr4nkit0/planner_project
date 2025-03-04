import { obtenerProyectos } from "./services/proyectoServicio.js";
import { listarProyectos } from "./components/proyectoComponents.js";

document.addEventListener("DOMContentLoaded", () => {
    obtenerProyectos((data) => {
        console.log(data);
        listarProyectos(data);
    }, (error) => {
        console.log(error);
    })
})