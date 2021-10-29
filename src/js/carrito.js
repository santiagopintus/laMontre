$(() => {
    main();
})

//GLOBALES
carrito = []
//La ruta a las imágenes de los relojes
const imagenesPath = '../src/img/relojes/';
//Este formato funciona si todas las imagenes tienen el mismo formato.
const formatoImg = '.webp';
//Datos de compra
let envioTotal = 0;
let totalPagar = 0;

//FUNCION PRINCIPAL
function main() {
    obtenerCarrito();

    if (crearHtml()) {
        escucharEliminarItem();
    }

    vaciarCarrito();
    concretarCompra();
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
        let id = 0;
        totalPagar = 0

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

function concretarCompra() {
    $('#comprar').on('click', () => {
        crearCompraHtml();
        $('.compra-overlay').show();
        $('body').css('overflow', 'hidden');
    });
    
    escucharMetodosPago();
    escucharOpcionesCompra();
}

function crearCompraHtml() {
    $('#envioFinal').html(`$${envioTotal}`);
    $('#totalFinal').html(`$${totalPagar + envioTotal}`);
    if (carrito.length == 1) {
        $('#totalRelojes').html(`Reloj: $${totalPagar}`);
        
    } else {
        $('#totalRelojes').html(`Relojes: $${totalPagar}`);
    }
}

function escucharMetodosPago() {
    $('#metodoPago').on('change', (e) => {
        if($(e.target).val() == 'credito') {
            $('#cuotas').removeAttr('disabled');
            $('#resumenCuotas').show();
            escucharCambioCuotas();
        } else {
            $('#resumenCuotas').hide();
            $('#cuotas').attr('disabled', 'disabled');
        }
    });
}

function escucharCambioCuotas() {
    $('#cuotas').on('change', (e) => {
        cuotas = $(e.target).val();
        let total = totalPagar + envioTotal;
        let cuota = total / cuotas;

        $('#resumenCuotas').html(`Pagarás en ${cuotas} cuotas sin interés de <b>$${cuota.toFixed(2)}</b>`)
    });

};

function escucharOpcionesCompra() {
    $('#cancelarCompra').on('click', () => {
        $('#metodoPago').val('debito');
        $('#metodoPago').trigger('change');
        $('#cuotas').val('1');
        $('.compra-overlay').hide();
        $('body').css('overflow', 'visible');
    });

    $('#confirmarCompra').on('click', () => {
        $('.compra-overlay').hide();
        $('body').css('overflow', 'visible');
        localStorage.removeItem('carrito');
        obtenerCarrito();
        crearHtml();

        if ($('#compraExito').hasClass('esconder')){
            $('#compraExito').removeClass('esconder');
        };
        $('#compraExito').show();
        setTimeout(() => {
            $('#compraExito').addClass('esconder');
            setTimeout(() => {
                $('#compraExito').hide();
            }, 500);
        }, 3000);
    });
}