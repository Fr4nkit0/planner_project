import { obtenerIdPizarraUrl } from '../modules/urlPizarra.js'
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
                            
                            <!-- Rojo -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color1" value="#FF5733" style="margin-top: 0;">
                                <label for="color1" class="flex-grow-1" style="background-color: #FF5733; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            </div>

                            <!-- Verde -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color2" value="#33FF57" style="margin-top: 0;">
                                <label for="color2" class="flex-grow-1" style="background-color: #33FF57; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            </div>

                            <!-- Azul -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color3" value="#3357FF" style="margin-top: 0;">
                                <label for="color3" class="flex-grow-1" style="background-color: #3357FF; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            </div>

                            <!-- Amarillo -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color4" value="#F4D03F" style="margin-top: 0;">
                                <label for="color4" class="flex-grow-1" style="background-color: #F4D03F; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            </div>

                            <!-- Morado -->
                            <div class="form-check d-flex align-items-center gap-2 mb-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color5" value="#8E44AD" style="margin-top: 0;">
                                <label for="color5" class="flex-grow-1" style="background-color: #8E44AD; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            </div>

                            <!-- Negro -->
                            <div class="form-check d-flex align-items-center gap-2">
                                <input class="form-check-input" type="checkbox" name="color" id="color6" value="#2C3E50" style="margin-top: 0;">
                                <label for="color6" class="flex-grow-1" style="background-color: #2C3E50; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div class="mb-3 d-flex justify-content-center gap-1"> 
        <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancelar</button> 
        <button type="submit" form="form-crear-nota" class="btn btn-primary">Guardar</button>
    </div>
    `;
}

export function detalleNotaHtml() {
    return `
    <section id="detalle-nota">
        <form  method="POST" id="form-editar-nota">
            <input type="hidden" name="pizarra_id" value="${obtenerIdPizarraUrl()}">
            <div class="row d-flex align-items-center gap-2 mb-3"> 
                <div class="col d-flex align-items-center">
                <input type="text" class="form-control" id="titulo" name="titulo" style="max-width: 130px;" required>
                </div>
                <div class="col-8 d-flex justify-content-end align-items-center">
                    <div class="d-flex align-items-center">
                        <label for="pendiente_para" class="me-2 mb-0">Pendiente para:</label>
                        <input type="date" id="pendiente_para" name="pendiente_para" class="form-control" style="max-width: 130px;">
                    </div>
                </div>                
            </div>
            <div class="row d-flex align-items-center gap-2 mb-3"> 
                <div class="col d-flex align-items-center">
                    <p class="mb-0">Descripción</p>
                    <div class="col-9 d-flex justify-content-end align-items-center"> 
                        <label for="etiqueta" class="form-label fs-7 mb-0 me-2">Color:</label>
                        <div class="btn-group dropend">
                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="background: none; border: none;"></button>

                            <div class="dropdown-menu p-3" style="background-color: #ede6ee;" id="drop-down-etiqueta">
                                <h6 class="text-center">Colores</h6>

                                <!-- Contenedor con scroll -->
                                <div class="container" id="color-container" style="max-height: 200px; overflow-y: auto;">

                                    <!-- Rojo -->
                                    <div class="form-check d-flex align-items-center gap-2 mb-2">
                                        <input class="form-check-input" type="checkbox" name="color" id="color1" value="#FF5733" style="margin-top: 0;">
                                        <label for="color1" class="flex-grow-1" style="background-color: #FF5733; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                                    </div>

                                    <!-- Verde -->
                                    <div class="form-check d-flex align-items-center gap-2 mb-2">
                                        <input class="form-check-input" type="checkbox" name="color" id="color2" value="#33FF57" style="margin-top: 0;">
                                        <label for="color2" class="flex-grow-1" style="background-color: #33FF57; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                                    </div>

                                    <!-- Azul -->
                                    <div class="form-check d-flex align-items-center gap-2 mb-2">
                                        <input class="form-check-input" type="checkbox" name="color" id="color3" value="#3357FF" style="margin-top: 0;">
                                        <label for="color3" class="flex-grow-1" style="background-color: #3357FF; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                                    </div>

                                    <!-- Amarillo -->
                                    <div class="form-check d-flex align-items-center gap-2 mb-2">
                                        <input class="form-check-input" type="checkbox" name="color" id="color4" value="#F4D03F" style="margin-top: 0;">
                                        <label for="color4" class="flex-grow-1" style="background-color: #F4D03F; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                                    </div>

                                    <!-- Morado -->
                                    <div class="form-check d-flex align-items-center gap-2 mb-2">
                                        <input class="form-check-input" type="checkbox" name="color" id="color5" value="#8E44AD" style="margin-top: 0;">
                                        <label for="color5" class="flex-grow-1" style="background-color: #8E44AD; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                                    </div>

                                    <!-- Negro -->
                                    <div class="form-check d-flex align-items-center gap-2">
                                        <input class="form-check-input" type="checkbox" name="color" id="color6" value="#2C3E50" style="margin-top: 0;">
                                        <label for="color6" class="flex-grow-1" style="background-color: #2C3E50; height: 20px; border-radius: 5px; display: flex; align-items: center;"></label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="mb-3">
                <textarea class="form-control" id="descripcion" name="descripcion" rows="4"></textarea>
            </div>
        </form>
    </section>
   <section class="container mt-4">
        <div class="row mb-3">
            <div class="col-12 fw-bold fs-4">
                Comentarios
            </div>
        </div>

        <!-- Caja para escribir un nuevo comentario -->
        <div class="row mb-3 align-items-center">
            <div class="col-auto">
                <img src="/static/src/core/image/usuario.svg" class="rounded-circle" width="40" height="40" alt="Usuario">
            </div>
            <div class="col">
                <div class="input-group">
                    <input type="text" class="form-control rounded-pill" placeholder="Escribe un comentario..." id="comentario" name="comentario">
                    <button class="btn btn-primary rounded-pill" type="button">
                        <img src="/static/src/core/image/send-icon.svg" alt="Enviar" width="20" height="20">
                    </button>
                </div>
            </div>
        </div>

        <!-- Contenedor de comentarios -->
        <div class="container overflow-auto" id="comentario-container" style="max-height: 400px;">
            <!-- Comentarios se agregarían dinámicamente aquí -->
            <div class="comment mb-3">
                <div class="d-flex align-items-center mb-2">
                    <img src="/static/src/core/image/usuario.svg" class="rounded-circle" width="30" height="30" alt="Usuario">
                    <span class="ms-2 fw-bold">Usuario</span>
                    <span class="ms-2 text-muted fs-6">Hace 2 minutos</span>
                </div>
                <p>Este es un ejemplo de comentario. Los comentarios serán agregados dinámicamente.</p>
            </div>
        </div>
    </section>

    <div class="mb-3 d-flex justify-content-center gap-1"> 
        <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancelar</button> 
        <button type="submit" form="form-editar-nota" class="btn btn-primary">Guardar</button>
    </div>

    `;
}
