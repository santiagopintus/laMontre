$(() => {
    //Cargo la función principal
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

//Carrito de relojes
let carrito = []
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
const formatoImg = '.webp';

/* Funcion principal que llama a las otras */
function main() {
    obtenerReloj();
    obtenerCarrito();
    crearHTML();
    crearImagenGrande();
    agregarAlCarrito();
}

function obtenerReloj() {
    /* Obtiene el reloj que se guardó en LocalStorage */
    reloj = localStorage.getItem('reloj');
    
    /* Parseando el objeto JSON a objecto */
    reloj = JSON.parse(reloj);
    ({ marca, modelo, precio, tipo, smart, source } = reloj)
    envio = Math.round(precio * 0.03);
}

function obtenerCarrito() {
    //Obtenemos el carrito actual
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    } else {
        carrito = [];
    }
}

function crearHTML() {
    //Asigna el innnerHTML de los elementos HTML globales del reloj
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
    //Actualizo el numero de relojes en el carrito
    $('#numeroCarrito').html(`${carrito.length}`)
}

function crearImagenGrande() {
    $('.imagen-grande').attr('src', `${imagenesPath}${source}${formatoImg}`);
    $('.imagen-grande').attr('alt', `Imagen ampliada del reloj ${marca} ${modelo}`);
    //Para que la imagen tenga el 95% del lado más chico.
    if (window.innerHeight > window.innerWidth) {
        $('.imagen-grande').css({
            width: '95%'
        });
        $('.contenedor-arrastrable').css({
            marginTop: `${window.innerHeight / 4}px`
        })
    } else {
        $('.imagen-grande').css({ height: '95%' });
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

function agregarAlCarrito() {
    $('#agregarAlCarrito').on('click', (e) => {
        e.preventDefault();
        //Guardamos el reloj actual en la constante relojCarrito
        const relojCarrito = { marca, modelo, precio, tipo, smart, source, envio }

        //Agregamos el reloj al carrito global
        carrito.push(relojCarrito);
        
        //reemplazamos el anterior carrito con el nuevo en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        //Actualizo el numero de relojes en el carrito
        $('#numeroCarrito').html(`${carrito.length}`)
    })
    
}
