const { src, dest, watch, series, parallel } = require('gulp');
const terser = require('gulp-terser');
const webpack = require('webpack-stream');
const flatmap = require('gulp-flatmap');
const TerserPlugin = require('terser-webpack-plugin');

const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync').create();
// Ruta base
const paths = {
    src: 'static/src',
    build: 'static/build'
};

// Procesar y minificar los index.js resolviendo los imports
function processScripts() {
    return src(`${paths.src}/**/index.js`, { base: paths.src })
        //Flatmap permite manejar cada archivo index.js por separado.
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
                .pipe(rename(file => {
                    file.dirname = path.join(path.dirname(file.dirname), relativeDir);
                }));
        }))
        // Escribe los archivos procesados en la carpeta de destino manteniendo la estructura.
        .pipe(dest(paths.build));
}

// Función para manejar estilos
function processStyles() {
    return src(`${paths.src}/**/css/style.css`)
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.build));
}
// Función para ordenar los archivos JS por prioridad
function sortByPriority(files) {
    const order = ['config', 'services', 'modules', 'components'];
    return files.sort((a, b) => {
        const aDir = a.split('/')[1];
        const bDir = b.split('/')[1];
        return order.indexOf(aDir) - order.indexOf(bDir);
    });
}
// Función para recorrer recursivamente los directorios de la carpeta js  y encontrar archivos .js
function findJsFiles(dir, baseDir) {
    let jsFiles = [];

    //Verifica si existe el directorio
    if (!fs.existsSync(dir)) return jsFiles;

    // Lee el contenido del directorio
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    //Itera sobre cada entrada encontrada en el directorio.
    entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name); // Ruta absoluta del archivo/directorio
        const relativePath = path.relative(baseDir, fullPath); // Ruta relativa al baseDir

        //Maneja el directorio recursivamente
        if (entry.isDirectory()) {
            jsFiles = jsFiles.concat(findJsFiles(fullPath, baseDir));
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            jsFiles.push(`./${relativePath.replace(/\\/g, '/')}`);
        }
    });

    return jsFiles;
}

// Función principal para asegurar que index.js existe
function ensureIndexJs(done) {
    const srcPath = paths.src;

    // Lee todas las aplicaciones dentro de static/src
    const apps = fs.readdirSync(srcPath);

    apps.forEach(app => {
        // Lee todas las páginas dentro de cada aplicación
        const pages = fs.readdirSync(path.join(srcPath, app));

        pages.forEach(page => {
            //Define las rutas del directorio js y el archivo index.js
            const jsPath = path.join(srcPath, app, page, 'js');
            const indexFile = path.join(jsPath, 'index.js');

            // Si no existe el directorio js, pasar a la siguiente página
            if (!fs.existsSync(jsPath)) return;



            let jsFiles = findJsFiles(jsPath, jsPath);
            jsFiles = jsFiles.filter(file => !file.endsWith('index.js'));
            jsFiles = sortByPriority(jsFiles);
            // Si hay archivos JS, crear el index.js con los imports
            if (jsFiles.length > 0) {
                const imports = jsFiles.map(file => `import '${file}';`).join('\n');
                if (!fs.existsSync(indexFile) || fs.readFileSync(indexFile, 'utf8') !== imports) {
                    fs.writeFileSync(indexFile, imports);
                }
            } else {
                if (fs.existsSync(indexFile)) {
                    fs.unlinkSync(indexFile);
                }
            }
        });

        done(); // Indica a Gulp que la tarea ha terminado
    });
}


// Servidor local
function serve() {
    browserSync.init({
        proxy: 'http://localhost:8000/', // Ajusta el puerto según tu configuración de Django
        port: 3000,
        files: [
            'templates/**/*.html',             // Detecta cambios en las plantillas Django
            `${paths.build}/**/*.{js,css}`,    // Detecta cambios en los archivos minificados
            'static/**/*.{js,css}'             // También puedes monitorear toda la carpeta static
        ],
        reloadDelay: 500,
    });
    //  Watch es una función de Gulp que observa los archivos y ejecuta tareas cuando hay cambios.
    // series(ensureIndexJs, processScripts): Cuando se detecta un cambio en un archivo .js:
    // Primero ejecuta ensureIndexJs: Asegura que los archivos index.js existan con los imports.
    // Luego ejecuta processScripts: Minifica los archivos JS y los mueve a static/build.
    // .on('change', browserSync.reload):
    // Después de ejecutar las tareas, usa BrowserSync para recargar el navegador automáticamente.
    watch(`${paths.src}/**/js/**/*.js`, series(ensureIndexJs, processScripts, (done) => {
        console.log("🔍 Cambio detectado en JS");
        browserSync.reload({ stream: false });
        done();
    }));
    watch(`${paths.src}/**/css/**/*.css`, processStyles).on('change', browserSync.reload);
}

exports.default = series(ensureIndexJs, parallel(processScripts, processStyles), serve);
