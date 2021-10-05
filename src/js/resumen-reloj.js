$(() => {
    //Calling main when content loaded
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
const tituloE = $('#tituloReloj');
const marcaE = $('#marcaReloj');
const modeloE = $('#modeloReloj');
const imagenE = $('#imagenReloj');
const tipoE = $('#tipoReloj');
const smartE = $('#smartONo');
const precioE = $('#precioReloj');
const envioE = $('#envioReloj');
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
    $(tituloE).html(`${marca} ${modelo}`);
    $(marcaE).html(marca);
    $(modeloE).html(modelo);
    $(imagenE).attr("src", `${imagenesPath}${source}${formatoImg}`);
    $(imagenE).attr("alt", `Reloj ${marca} ${modelo}`);
    $(tipoE).html(tipo ? 'Digital' : 'Analógico');
    $(smartE).html(smart ? 'Si' : 'No');
    $(precioE).html(`$${precio}`);
    $(envioE).html(`$${envio}`);
    /* Cambio el titulo de la pestaña */
    $(document).attr("title", `${marca} ${modelo} - La Montre`)
}

function crearImagenGrande() {
    $('.imagen-grande').attr('src', `${imagenesPath}${source}${formatoImg}`);
    $('.imagen-grande').attr('alt', `Imagen ampliada del reloj ${marca} ${modelo}`);

    //Para que la imagen tenga el 95% del lado más chico.
    if (window.innerHeight > window.innerWidth) {
        $('.imagen-grande').css({width: '95%'})
    } else {
        $('.imagen-grande').css({height: '95%'})
    }

    //Cuando clickeo en la imagen pequeña llamo la función que la muestra
    mostrarImagen();
}

function mostrarImagen() {
    $(imagenE).on('click', () => {
        $('body').css({ overflow: 'hidden' });
        $('.imagen-contenedor').show()
        setTimeout(() => {
            $('.imagen-contenedor').addClass('mostrar');
        }, 100);
    });
    $('.imagen-overlay').on('click', () => {
        $('body').css({ overflow: 'visible' });
        $('.imagen-contenedor').removeClass('mostrar');
        setTimeout(() => {
            $('.imagen-contenedor').hide()
        }, 400);
    })
}