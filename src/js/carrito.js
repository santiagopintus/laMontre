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

    if (crearHtml()) {
        escucharEliminarItem();
    }

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
        let envioTotal = 0;
        let totalPagar = 0;
        let id = 0;

        for (let reloj of carrito) {
            ({ marca, modelo, precio, tipo, smart, source, envio } = reloj);
            totalPagar += precio;

            if (envio > envioTotal) { envioTotal = envio }; //Para guardar el envío más caro
            let relojDiv = $(document.createElement('div'));
            $(relojDiv).addClass('reloj-cart');
            $(relojDiv).html(`
                <div class="img-reloj-cart">
                    <img src="${imagenesPath}${source}${formatoImg}">
                </div>
                <div class="info-reloj-cart">
                    <h4>${marca} ${modelo}</h4>
                    <p>Tipo: ${reloj.tipo ? 'Digital' : 'Analógico'}</p>
                    <p>Es smart: ${reloj.smart ? 'Si' : 'No'}</p>
                    <p>$${precio}</p>
                    <button id="${id}" class="btn btn-primary boton-eliminar">Eliminar</button>
                </div>
                
            `)
            $('.contenedor-carrito').append(relojDiv);
            id++;
            
        }
        
        $('.empty-cart-mje').hide();
        
        $('#envioTotal').html(`$${envioTotal}`);
        $('#totalPagar').html(`$${totalPagar}`);
        
        if (carrito.length == 1) {
            $('#numeroCarrito').html(`(${carrito.length} reloj)`);
        } else if (carrito.length > 1) {
            $('#numeroCarrito').html(`(${carrito.length} relojes)`);
        }

        return true;

    } else {
        $('.empty-cart-mje').show();
        $('#vaciar').hide();
        $('#comprar').hide();
        $('#envioTotal').parent().hide();
        $('#totalPagar').parent().hide();
        $('#numeroCarrito').html('(vacío)');
        return false;
    }
}

function vaciarCarrito() {
    $('#vaciar').on('click', () => {
        localStorage.removeItem('carrito');
        obtenerCarrito();
        crearHtml();
    })
}

function escucharEliminarItem() {

    $('.boton-eliminar').on('click', (e) => {
        eliminarReloj(e.target.id);
    });

}

function eliminarReloj(id) {
    carrito.splice(id, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (crearHtml()) {
        escucharEliminarItem();
    }
}