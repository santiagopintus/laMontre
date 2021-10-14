$(document).ready(function () {
    AOS.init();
    main();
});

// const relojes = [
//     //Marca,     Modelo,                     Precio,    Tipo,   Smart, nombre de imagen
//     ['Xiaomi',  'Smart Band 5',              2939,      true,   true, 'Xiaomi_SmartBand5'],
//     ['Xiaomi',  'Smart Band 6',              4799,      true,   true, 'Xiaomi_SmartBand6'],
//     ['Xiaomi',  'Mi Watch Lite 1.4"',        7719,      true,   true, 'Xiaomi_miWatchLite1.4'],
//     ['Skmei',   '9096',                      3699,      false,  false,'Skmei_9096'],
//     ['Skmei',   '1251',                      2499,      true,   false,'Skmei_1251'],
//     ['Casio',   'A158wa',                    4950,      true,   false,'Casio_A158wa'],
//     ['Casio',   'Mq-24',                     2980,      false,  false,'Casio_Mq-24'],
//     ['Casio',   'GG-1000-1A3',               66132,     false,  false,'Casio_GG-1000-1A3'],
//     ['Diesel',  '6628',                      4696.09,   false,  false,'Diesel_6628'],
//     ['Diesel',  '6630',                      4586.75,   false,  false,'Diesel_6630'],
//     ['Garmin', 'Instinct Tactical Coyote',   49995,    true, true, 'Garmin_InstinctTacticalCoyote'],
//     ['Garmin', 'Forerunner 55',              37999,     true,   true, 'Garmin_Forerunner55'],
//     ['Garmin', 'Venu SQ',                    38995,     true,   true, 'Garmin_VenuSQ'],
//     ['Huawei', 'Honor Band 5',               5499,      true,   true, 'Huawei_HonorBand5'],
//     ['Mistral', 'SMTM7',                     12686.41,  false,  true, 'Mistral_SMTM7'],
//     ['Sweet',   'GpsPro',                    12127,     true,   true, 'Sweet_GpsPro'],
//     ['Samsung', 'Galaxy Watch 4',            39999,     true,   true, 'samsung_galaxyWatch4'],
//     ['Amazfit', 'Fashion GTS 2 Mini 1.55"',  11399,     true,   true, 'Amazfit_FashionGTS2Mini1.55'],
//     ['Samsung', 'Galaxy Fit 2 1.1"',         5599,      true,   true, 'Samsung_GalaxyFit21.1']
// ];

const frases = [
    'Bienvenid@! Disfruta el paseo!',
    'Hola! Espero que estés con ganas de darte un gustito!',
    'Te doy la bienvenida a La Montre.',
    'Espero que encuentres lo que buscas!',
    '"Si miras el reloj, el reloj te mirará a ti." - Raúl Campoy Guillén',
    'También hay relojes de sangre; la gente suele llamarles el corazón.',
    '"El reloj no existe en las horas felices." - Ramón Gómez de la Serna',
    '"Aún un reloj parado tiene razón dos veces al día." - Marie von Ebner-Eschenbach',
    '"Un hombre con un reloj sabe la hora que es; uno con dos no está tan seguro." - Anónimo',
    'Convierte tus sueños en realidad.',
    '"Los días pueden ser iguales para un reloj, pero no para un hombre." - Marcel Proust',
    '"Vivimos o morimos por el reloj, ese es todo el tiempo que tenemos." - Tom Hanks',
    '“El tictac de los relojes parece un ratón que roe el tiempo.” - Alphonse Allais'
]
//El primer array contendrá los relojes, cada uno en formato de array
const relojes = [];
//Este segundo array contendrá los relojes, cada uno en formato de objeto
const relojesObj = [];

//Variables para la parte del pago
const interes = 1.2
let precioTotal;
let cuota;

//La ruta a las imágenes de los relojes
const imagenesPath = 'src/img/relojes/';
//Este formato funciona si todas las imagenes tienen el mismo formato.
const formatoImg = '.jpg'

class Reloj {
    constructor(marca, modelo, precio, tipo, smart, source) {
        this.marca = marca,
        this.modelo = modelo,
        this.precio = parseFloat(precio),
        this.tipo = tipo,
        this.smart = smart,
        this.source = source    
    }
}

function main() {
    elegirSaludo();
    
    obtenerRelojes();
    
    escucharCambioOrden();
    
    /* Más adelante se obtendrán estos datos con un formulario o inputs.(↓) */
    // calcularCuotas(precio, cantCuotas);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function elegirSaludo() {
    //Elige un saludo aleatorio del arreglo de saludos y lo pasa al DOM
    const saludoIndex = randInt(0, frases.length - 1);
    const saludo = frases[saludoIndex];
    $('#saludo').html(saludo);
}

function obtenerRelojes() {
    let relojesUrl = "src/relojes.json";

    $.getJSON(relojesUrl, (respuesta, estado) => {
        
        if (estado === "success") {

            let relojesJSON = respuesta;

            for (let reloj of relojesJSON) {
                //Guardo el reloj en un nuevo arreglo

                let relojArray = [];

                relojArray.push(reloj.marca);
                relojArray.push(reloj.modelo);
                relojArray.push(reloj.precio);
                relojArray.push(reloj.tipo);
                relojArray.push(reloj.smart);
                relojArray.push(reloj.source);

                //Agrego cada arreglo de reloj al arreglo de relojes donde será ordenado.
                relojes.push(relojArray);
            }
        }
    });

    /* Cuando se termina el Ajax request, se llama la función */
    $(document).ajaxStop(function() {
        ordenarRelojes(0);
    });
}

function agregarReloj() {
    /* Recorre el array de relojes y va creando un objeto por cada uno,
    Luego lo agrega al arreglo relojObj */

    //Vacío el array para volver a llenarlo.
    for (let i = relojesObj.length; i > 0; i--) {
        relojesObj.pop();
    }

    for (const reloj of relojes) {
        let [marca, modelo, precio, tipo, smart, source] = reloj;
        let relojObj = new Reloj(marca, modelo, precio, tipo, smart, source);
        relojesObj.push(relojObj);
    }

    mostrarRelojes();
}

function ordenarRelojes(i, orden = 'menor') {
    /* Ordena los relojes según el orden pasado por parámetro:
    Parámetros:
    i: El indice del valor del dato a usar para ordenar
    orden: Por defecto de menor a mayor, de Smart a no smart, de digital a analógico. Pero si se pasa otro orden como parámetro el orden será inverso.
    */
    
    relojes.sort((a, b) => {
        if (typeof a[i] === 'number' && orden === 'menor') {
            return a[i] - b[i];
        } else if (typeof a[i] === 'number') {
            return b[i] - a[i];
        } else if (typeof a[i] === 'string' && orden === 'menor') {
            return a[i].localeCompare(b[i]);
        } else if (typeof a[i] === 'string') {
            return b[i].localeCompare(a[i]);
        } else if (typeof a[i] === 'boolean' && orden === 'menor') {
            return (a[i] === b[i]) ? 0 : a[i]? -1 : 1;
        } else if (typeof a[i] === 'boolean') {
            return (a[i] === b[i]) ? 0 : a[i]? 1 : -1;
        }
    })
    //Después de ordenar el array "relojes" los agrego en forma de objeto con la siguiente función:
    agregarReloj();
}

function mostrarRelojes() {
    /* Primero vacío el HTML de relojes, luego recorro el array relojesObj
    y por cada reloj creo una card en el DOM*/
    if ($('#contenedorRelojes .reloj:first-child')) {
        $('#contenedorRelojes').empty();
    }

    let i = 0
    for (const reloj of relojesObj) {
        let relojDiv = document.createElement('DIV');
        $(relojDiv).addClass('reloj');
        //Para seleccionar cada reloj
        $(relojDiv).attr('id', i);
        //Para animar en scroll
        $(relojDiv).attr("data-aos", "flip-up");
        $(relojDiv).html(
                            `<div class="img-container">
                                <img class="reloj-img" src="${imagenesPath}${reloj.source}${formatoImg}" alt="Reloj ${reloj.marca} ${reloj.modelo}">
                            </div>
                            <div class="info-ppal">
                                <div class=titulo>
                                    <p>${reloj.marca} ${reloj.modelo}</p>
                                </div>
                                <div class="precio">
                                    <p>$${reloj.precio}</p>
                                </div>
                            </div>
                            <div class="info-secundaria">
                                <p>Tipo: ${reloj.tipo ? 'Digital' : 'Analógico'}</p>
                                <p>Es smart: ${reloj.smart ? 'Si' : 'No'}</p>
                            </div>
                            `
        )
        $('#contenedorRelojes').append(relojDiv);
        i++;
    }
    /* Después de mostrarlos escucho por un click
    (Para que cada vez que se ordenen sean clickeables)*/
    escucharClickReloj();
}

function escucharCambioOrden() {
    /*Cuando hay un cambio en el select de orden, se ordenan los relojes,
    se vuelven a agregar al array relojesObj y se muestran*/
    
    $('#orden').on('change', (e) => {
        ordenarRelojes($('#orden').val(), $('#ordenAscDesc').val());
    });
    
    $('#ordenAscDesc').on('change', (e) => {
        ordenarRelojes($('#orden').val(), $('#ordenAscDesc').val());
    });
    
}

function escucharClickReloj() {
    /* Escucha el click en un reloj, obtiene el id del reloj y muestra el reloj
    llamando a la función mostrarReloj(idReloj) */
    
    //Selecciono todos los relojes y
    //Transformo la nodeList a Array
    relojesArray = Array.from($('.reloj'));

    let idReloj;
    //Recorro el array y agrego un addEventListener a cada reloj para obtener su ID
    for (let reloj of relojesArray) {
        $(reloj).on('click', (e) => {
            //Para obtener el id del reloj en cualquier lugar donde clickeen ↓
            if (e.target.id == '') {
                // Si el elemento no tiene ID busco el del padre
                if (e.target.offsetParent.id == '') {
                    //Si el padre no tiene busco en el abuelo
                    idReloj = e.path[2].id
                } else {
                    idReloj = e.target.offsetParent.id
                }
            } else {
                idReloj = e.target.id
            }
            mostrarReloj(idReloj);
        })
    }
}

function mostrarReloj(idReloj) {    
    //Selecciono el reloj del array de relojes en formato de Objeto.
    let reloj = relojesObj[parseInt(idReloj)];
    //Elimino el reloj guardado anteriormente.
    localStorage.removeItem('reloj');
    //Lo guardo en localStorage para obtenerlo con la otra página
    localStorage.setItem('reloj', JSON.stringify(reloj));

    //redirijo al usuario
    window.location.href = 'pages/reloj.html';
}

// function calcularCuotas(precio, cantCuotas) {
//     //Calculo el precio total "precioTotal" es global.
//     precioTotal = (precio / 100 * (cantCuotas * interes)) + precio
//     precioTotal = Math.round(precioTotal * 100) / 100
//     //Calculo el valor de cada cuota y la redondeo
//     cuota = Math.round(precioTotal / cantCuotas * 100) / 100
// }

