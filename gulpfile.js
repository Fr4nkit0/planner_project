// Importa las funciones principales de Gulp para definir tareas, obtener archivos de origen (src),
// escribir archivos en destino (dest), vigilar cambios (watch) y combinar tareas (series, parallel).
const { src, dest, watch, series, parallel } = require('gulp');
// webpack-stream permite ejecutar Webpack dentro de una tarea de Gulp.
const webpack = require('webpack-stream');
// cleanCSS se usa para minificar archivos CSS.
const cleanCSS = require('gulp-clean-css');
// rename permite cambiar el nombre o la ruta de los archivos generados.
const rename = require('gulp-rename');
// flatmap permite procesar cada archivo individualmente en la tubería de Gulp.
const flatmap = require('gulp-flatmap');
// Módulo nativo de Node para trabajar con rutas de archivos.
const path = require('path');
// TerserPlugin se utiliza para minificar archivos JavaScript en Webpack.
const TerserPlugin = require('terser-webpack-plugin');

// Define las rutas base para los archivos de origen y destino.
// 'src' contiene el código original y 'build' será la carpeta de salida.
const paths = {
    src: 'static/src/',
    build: 'static/build/'
};

// Función para procesar JS con Webpack individualmente y mantener la jerarquía
function processJS() {
    return src(`${paths.src}**/index.js`, { base: paths.src })
        // Con flatmap, procesamos cada archivo individualmente.
        .pipe(flatmap((stream, file) => {
            // Se captura la carpeta relativa del archivo. 
            // Por ejemplo, si file.relative es "usuarios/login/js/index.js", 
            // entonces relativeDir será "usuarios/login/js"
            const relativeDir = path.dirname(file.relative);
            return stream
                .pipe(webpack({
                    mode: 'production',// Modo producción: habilita optimizaciones y minificación.
                    entry: file.path, // Se toma cada archivo 'index.js' como entrada
                    output: {
                        filename: 'index.min.js' // Nombre del archivo de salida.
                    },
                    module: {
                        rules: [
                            {
                                test: /\.js$/, // Aplica esta regla a archivos .js.
                                exclude: /node_modules/, // Excluye la carpeta node_modules.
                                use: {
                                    loader: 'babel-loader', // Transpila con Babel.
                                    options: {
                                        presets: ['@babel/preset-env']   // Convierte ES6+ a ES5.
                                    }
                                }
                            }
                        ]
                    },
                    optimization: {
                        minimize: true,  // Habilita la minificación.
                        minimizer: [new TerserPlugin()]  // Usa Terser para minificar.
                    },
                    resolve: {
                        extensions: ['.js'] // Resuelve archivos con extensión .js.
                    }
                }))
                // Usa rename para reestablecer la carpeta original (dirname) en la salida.
                .pipe(rename({ dirname: relativeDir }));
        }))
        // Escribe los archivos procesados en la carpeta de destino manteniendo la estructura.
        .pipe(dest(paths.build));
}

// Función para procesar CSS
function processCSS() {
    return src(`${paths.src}**/style.css`, { base: paths.src })
        .pipe(cleanCSS()) // Minifica el CSS.
        .pipe(rename({ suffix: '.min' })) // Añade ".min" al nombre del archivo.
        .pipe(dest(paths.build)); // Escribe el archivo en la carpeta de destino, manteniendo la estructura.
}

// Tarea de vigilancia
function watchFiles() {
    // Vigila todos los archivos .js en static/src y, al cambiar, ejecuta processJS.
    watch(`${paths.src}**/*.js`, processJS);
    // Vigila todos los archivos .css en static/src y, al cambiar, ejecuta processCSS.
    watch(`${paths.src}**/*.css`, processCSS);
}

// Tarea por defecto: primero procesa JS y CSS en paralelo, luego inicia la vigilancia (watchFiles).
exports.default = series(parallel(processJS, processCSS), watchFiles);
// Tarea por defecto: primero procesa JS y CSS en paralelo, luego inicia la vigilancia (watchFiles).
exports.build = parallel(processJS, processCSS);

