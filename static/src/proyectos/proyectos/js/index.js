import { obtenerProyectos } from "./services/proyectoServicio.js";
import { listarProyectos } from "./modules/proyectoModules.js";

document.addEventListener("DOMContentLoaded", () => {
    obtenerProyectos((data) => {
        console.log(data);
        listarProyectos(data);
    }, (error) => {
        console.log(error);
    })
})