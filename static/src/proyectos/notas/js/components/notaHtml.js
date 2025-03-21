import { obtenerIdPizarraUrl } from '../modules/urlPizarra.js'
import { comentarioHtml } from './comentarioHtml.js';
export function notaHtml(nota) {
    return `
            <div class="task-card d-flex align-items-center justify-content-center col-12 col-sm-6 col-md-4 col-lg-3 m-4"  data-bs-toggle="modal" data-bs-target="#modal" 
                data-id=${nota.id}  data-tipo="ver-nota" style="background-color: ${nota.color};">
                    <p class="text-center">${nota.titulo}</p>
            </div>

            `;
}
export function notaCrearHtml() {
    return `
        <div class="task-card d-flex align-items-center justify-content-center col-12 col-sm-6 col-md-4 col-lg-3 m-4"  data-bs-toggle="modal" data-bs-target="#modal" data-tipo="crear-nota" >
            <img src="/static/src/core/image/agregar.svg" alt="Agregar"
                        style="display: block; max-width: 100%; max-height: 100%;">
        </div>
    `;
}
export function formularioNotaHtml() {
    return `
    <form  method="POST" id="form-crear-nota">
        <input type="hidden" name="pizarra_id" value="${obtenerIdPizarraUrl()}">

        <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" class="form-control" id="titulo" name="titulo" required>
        </div>

        <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea class="form-control" id="descripcion" name="descripcion" rows="4"></textarea>
        </div>
        
        <div class="mb-3 row">
            <div class="col-9 d-flex align-items-center gap-1">
                <label for="fecha" class="form-label fs-7 mb-0" style="white-space: nowrap;">Pendiente Para: </label>
                <input type="date" class="form-control" id="fecha" name="pendiente" style="max-width: 150px;">
            </div>  
            <div class="col d-flex align-items-center">
                <label for="etiqueta" class="form-label fs-7 mb-0 me-2">Color:</label>
                <div class="btn-group dropend">
                    <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="background: none; border: none;"></button>
                    
                    <div class="dropdown-menu p-3" style="background-color: #ede6ee;" id="drop-down-etiqueta">
                        <h6 class="text-center">Colores</h6>
                                            
                        <!-- Contenedor con scroll -->
                        <div class="container" id="color-container" style="max-height: 200px; overflow-y: auto;">
                            
                            <!-- Rosado -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color1" value="#F7C8D3" style="margin-top: 0;">
                                <label for="color1" class="flex-grow-1" style="background-color: #F7C8D3; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            </div>

                            <!-- Naranja -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color2" value="#FFD8B1" style="margin-top: 0;">
                                <label for="color2" class="flex-grow-1" style="background-color: #FFD8B1; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            
                            </div>

                            <!-- Verde -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color3" value="#B8E6C9" style="margin-top: 0;">
                                <label for="color3" class="flex-grow-1" style="background-color: #B8E6C9; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                    
                            </div>

                            <!-- Amarillo -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color4" value="#FCEFB4" style="margin-top: 0;">
                                <label for="color4" class="flex-grow-1" style="background-color: #FCEFB4; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                                
                            </div>

                            <!-- Morado -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color5" value="#D7C3FF" style="margin-top: 0;">
                                <label for="color5" class="flex-grow-1" style="background-color: #D7C3FF; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                        
                            </div>

                            <!-- Celeste -->
                            <div class="form-check d-flex align-items-center gap-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color6" value="#BEE3F8" style="margin-top: 0;">
                                <label for="color6" class="flex-grow-1" style="background-color: #BEE3F8; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div class="mb-3 d-flex justify-content-center gap-1"> 
            <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancelar</button> 
            <button type="submit" form="form-crear-nota" class="btn btn-primary">Guardar</button>
        </div>
    </form>
   
    `;
}

export function detalleNotaHtml(notaId) {
    return `
    <section id="detalle-nota" class="rounded-3">
      <!-- Creada por -->
      <div class="row mb-3">
            <div class="col-6">
            <div class="d-flex align-items-center">
                <span class="me-2 fw-semibold  mb-0">Creada por:</span>
                <div>
                    <img src="/static/src/core/image/usuario.svg" class="rounded-circle me-2" alt="Avatar">
                </div>
            </div>
            </div>
            <div class="col-6 d-flex justify-content-end">
            <div class="d-flex gap-3">
                <!-- Botón para abrir el modal de eliminación -->
                <button type="button" data-bs-toggle="modal" data-bs-target="#modal"
                    data-id="" data-tipo="eliminar-nota" style="background: none; border: none;">
                    <img src="/static/src/core/image/eliminar.svg" alt="Eliminar"> 
                </button>
                <!-- Botón para abrir el modal de edición -->
                <button type="button" data-bs-toggle="modal" data-bs-target="#modal"  
                    data-tipo="editar-nota" style="background: none; border: none;">
                    <img src="/static/src/core/image/lapiz.svg" alt="Editar">
                </button>
            </div>
            </div>
       </div>

      <!-- Título y Fecha -->
      <div class="row mb-4">
        <div class="col-6">
          <h6 id="titulo-nota" class="fs-5   mb-0">Titulo de una nota</h6>
        </div>
        <div class="col-6">
          <div class="d-flex align-items-center justify-content-end">
            <h6 class=" mb-0 me-1">Pendiente para:</h6>
            <span class="text-dark" id="Pendiente">20/03/25</span>
          </div>
        </div>
      </div>
      
      <!-- Descripción y Color --> 
       <div class="row mb-3">
            <div class="col-6">
            <div class="d-flex align-items-center">
                <h6 class="mb-0 me-2 fw-semibold  mb-0">Descripción</h6>
                <button class="btn btn-sm border-0">
                    <img src = "/static/src/core/image/list-task.svg">
                </button>
            </div>
            </div>
       </div>
      
      <!-- Área de descripción -->
      <div class="row mb-4">
        <div class="col-12">
            <div id="descripcion" class="p-3 bg-white border rounded text-break overflow-auto" style="max-height: 150px;">
            Aqui va la descripcion de una tarea xd
            </div>
        </div>
      </div>
    </section>
    <section>
            <div class="container mt-4">
            <h6>Comentarios</h6>

            <form id="comentario-form">
                <input type="hidden" name="nota_id" value="${notaId}">
                <div class="mb-3">
                    <textarea id="input-comentario" name="descripcion" class="form-control" rows="3" placeholder="Escribe tu comentario..."></textarea>
                    <button type="submit" id="btn-enviar" class="btn btn-primary mt-2">Guardar</button>
                </div>
            </form>

            <!-- Lista de comentarios -->
            <div class="mt-2 overflow-auto" id="lista-comentarios" style="max-height: 300px;">
               
            </div>
        </div>
    </section>
    `;
}
