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
//Elementos HTML globales para ser accedidos en cualquier parte
const tituloE = document.getElementById('tituloReloj');
const marcaE = document.getElementById('marcaReloj')
const modeloE = document.getElementById('modeloReloj')
const imagenE = document.getElementById('imagenReloj');
const tipoE = document.getElementById('tipoReloj');
const smartE = document.getElementById('smartONo');
const precioE = document.getElementById('precioReloj');
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
    /* Cambio el titulo de la pestaña */
    document.title = `${marca} ${modelo} - La Montre`;
}

function crearImagenGrande() {
    //Defino el contenedor de la imagen y el overlay y sus atributos
    const contenedorImagen = document.createElement('DIV');
    contenedorImagen.classList.add('imagen-contenedor');

    //Defino el overlay y sus atributos
    const overlayImagen = document.createElement('DIV');
    overlayImagen.classList.add('imagen-overlay');

    //Defino la imagen y sus atributos
    const imagenGrande = document.createElement('IMG');
    imagenGrande.classList.add('imagen-grande');
    imagenGrande.src = `${imagenesPath}${source}${formatoImg}`;
    imagenGrande.alt = `Imagen ampliada del reloj ${marca} ${modelo}`;

    //Para que la imagen tenga el 95% del lado más chico.
    if (window.innerHeight > window.innerWidth) {
        imagenGrande.style.width = '95%';
    } else {
        imagenGrande.style.height = '95%';
    }
    //Defino la cruz para cerrar
    const botonCerrar = document.createElement('DIV');
    overlayImagen.appendChild(botonCerrar);
    //Agrego los elementos a sus padres
    contenedorImagen.appendChild(overlayImagen);
    contenedorImagen.appendChild(imagenGrande);
    document.getElementById('mainReloj').appendChild(contenedorImagen);
    //Cuando clickeo en la imagen pequeña llamo la función que la muestra
    mostrarImagen(contenedorImagen, overlayImagen);
}

function mostrarImagen(contenedorImagen, overlayImagen) {
    imagenE.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        contenedorImagen.classList.add('mostrar');
    });
    overlayImagen.addEventListener('click', () => {
        document.body.style.overflow = 'visible';
        contenedorImagen.classList.remove('mostrar');
    })
}