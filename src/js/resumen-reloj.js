document.addEventListener('DOMContentLoaded', () => {
    main();
})
let marca = ''
let modelo = ''
let precio = ''
let tipo = ''
let smart = ''
let source = ''
//La ruta a las imágenes de los relojes
const imagenesPath = '../src/img/relojes/';
//Este formato funciona si todas las imagenes tienen el mismo formato.
const formatoImg = '.jpg'

function main() {
    obtenerReloj();
    crearHTML();
}

function obtenerReloj() {
    /* Obtiene el reloj que se guardó en LocalStorage y lo guardamos en session storage */
    reloj = localStorage.getItem('reloj');
    
    /* Parseando el objeto JSON a objecto */
    reloj = JSON.parse(reloj);
    ({ marca, modelo, precio, tipo, smart, source } = reloj)
}

function crearHTML() {
    const tituloE = document.getElementById('tituloReloj');
    const marcaE = document.getElementById('marcaReloj')
    const modeloE = document.getElementById('modeloReloj')
    const imagenE = document.getElementById('imagenReloj');
    const tipoE = document.getElementById('tipoReloj');
    const smartE = document.getElementById('smartONo');
    const precioE = document.getElementById('precioReloj');

    tituloE.innerHTML = `${marca} ${modelo}`;
    marcaE.innerHTML = marca;
    modeloE.innerHTML = modelo;
    imagenE.src = `${imagenesPath}${source}${formatoImg}`;
    imagenE.alt = `Reloj ${marca} ${modelo}`;
    tipoE.innerHTML = tipo ? 'Digital' : 'Analógico';
    smartE.innerHTML = smart ? 'Si' : 'No';
    precioE.innerHTML = `$${precio}`;
    /* Cambio el titulo de la pestaña */
    document.title = `${marca} ${modelo} - La Montre`;
}