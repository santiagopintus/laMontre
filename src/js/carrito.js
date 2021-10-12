$(() => {
    main();
})

//GLOBALES
carrito = []
//La ruta a las imágenes de los relojes
const imagenesPath = '../src/img/relojes/';
//Este formato funciona si todas las imagenes tienen el mismo formato.
const formatoImg = '.jpg'

//FUNCION PRINCIPAL
function main() {
    obtenerCarrito();

    crearHtml();

    vaciarCarrito();
}
/* OTRAS FUNCIONES */

//Obtenemos el carrito de localStorage y el length
function obtenerCarrito() {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    if (!carrito) {
        carrito = []
    }
}

function crearHtml() {
    //Lo vaciamos para actualizarlo
    if ($('.contenedor-carrito .reloj-cart:first-child')) {
        $('.contenedor-carrito').empty();
    }

    if (carrito.length > 0) {

        for (let reloj of carrito) {
            ({ marca, modelo, precio, tipo, smart, source, envio } = reloj);
    
            let relojDiv = $(document.createElement('div'));
            $(relojDiv).addClass('reloj-cart');
            $(relojDiv).html(`
                <div class="img-reloj-cart">
                    <img src="${imagenesPath}${source}${formatoImg}">
                </div>
                <div class="info-reloj-cart">
                    <h4 class="titulo-reloj-cart">${marca} ${modelo}</h4>
                </div>
                
            `)
            $('.contenedor-carrito').append(relojDiv);
        }
        $('.empty-cart-mje').hide();
        
    } else {
        $('.empty-cart-mje').show();
        $('#vaciar').hide()
        $('#comprar').hide()

    }
    //Actualizando el número de items en el titulo
    if (carrito.length == 1) {
        $('#numeroCarrito').html(`(${carrito.length} reloj)`);
    } else if (carrito.length > 1) {
        $('#numeroCarrito').html(`(${carrito.length} relojes)`);
    } else {
        $('#numeroCarrito').html('(vacío)');
    }
}

function vaciarCarrito() {
    $('#vaciar').on('click', () => {
        localStorage.removeItem('carrito');
        obtenerCarrito();
        crearHtml();
    })
}