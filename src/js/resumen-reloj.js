document.addEventListener('DOMContentLoaded', () => {
    main();
})
//Propiedades del objeto reloj.
let marca = ''
let modelo = ''
let precio = ''
let tipo = ''
let smart = ''
let source = ''
let envio = ''
//Elementos HTML globales para ser accedidos en cualquier parte
const tituloE = document.getElementById('tituloReloj');
const marcaE = document.getElementById('marcaReloj')
const modeloE = document.getElementById('modeloReloj')
const imagenE = document.getElementById('imagenReloj');
const tipoE = document.getElementById('tipoReloj');
const smartE = document.getElementById('smartONo');
const precioE = document.getElementById('precioReloj');
const envioE = document.getElementById('envioReloj');
//La ruta a las imágenes de los relojes
const imagenesPath = '../src/img/relojes/';
//Este formato funciona si todas las imagenes tienen el mismo formato.
const formatoImg = '.jpg'

/* Funcion principal que llama a las otras */
function main() {
    obtenerReloj();
    crearHTML();
    crearImagenGrande();
}

function obtenerReloj() {
    /* Obtiene el reloj que se guardó en LocalStorage y lo guardamos en session storage */
    reloj = localStorage.getItem('reloj');
    
    /* Parseando el objeto JSON a objecto */
    reloj = JSON.parse(reloj);
    ({ marca, modelo, precio, tipo, smart, source } = reloj)
    envio = Math.round(precio * 0.03);
}

function crearHTML() {
    //Asigna el innnerHTML de los elementos HTML globales
    tituloE.innerHTML = `${marca} ${modelo}`;
    marcaE.innerHTML = marca;
    modeloE.innerHTML = modelo;
    imagenE.src = `${imagenesPath}${source}${formatoImg}`;
    imagenE.alt = `Reloj ${marca} ${modelo}`;
    tipoE.innerHTML = tipo ? 'Digital' : 'Analógico';
    smartE.innerHTML = smart ? 'Si' : 'No';
    precioE.innerHTML = `$${precio}`;
    envioE.innerHTML = `$${envio}`;
    /* Cambio el titulo de la pestaña */
    document.title = `${marca} ${modelo} - La Montre`;
}

function crearImagenGrande() {
    const imagenGrande = document.querySelector('.imagen-grande');
    imagenGrande.src = `${imagenesPath}${source}${formatoImg}`;
    imagenGrande.alt = `Imagen ampliada del reloj ${marca} ${modelo}`;

    //Para que la imagen tenga el 95% del lado más chico.
    if (window.innerHeight > window.innerWidth) {
        imagenGrande.style.width = '95%';
    } else {
        imagenGrande.style.height = '95%';
    }

    //Cuando clickeo en la imagen pequeña llamo la función que la muestra
    mostrarImagen();
}

function mostrarImagen() {
    const contenedorImagen = document.querySelector('.imagen-contenedor');
    const overlayImagen = document.querySelector('.imagen-overlay');
    imagenE.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        contenedorImagen.style.display = 'block';
        setTimeout(() => {
            contenedorImagen.classList.add('mostrar');
        }, 100);
    });
    overlayImagen.addEventListener('click', () => {
        document.body.style.overflow = 'visible';
        contenedorImagen.classList.remove('mostrar');
        setTimeout(() => {
            contenedorImagen.style.display = 'none';
        }, 400);
    })
}