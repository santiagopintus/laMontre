document.addEventListener('DOMContentLoaded', () => {
    main();
})

const relojes = [
    ['Xiaomi', 'Smart Band 5', 2939, true, true, 'Xiaomi_SmartBand5'],
    ['Xiaomi', 'Smart Band 6', 4799, true, true, 'Xiaomi_SmartBand6'],
    ['Xiaomi', 'Mi Watch Lite 1.4"', 7719, true, true, 'Xiaomi_miWatchLite1.4'],
    ['Skmei', '9096', 3699, false, false, 'Skmei_9096'],
    ['Skmei', '1251', 2499, true, false, 'Skmei_1251'],
    ['Casio', 'A158wa', 4950, true, false, 'Casio_A158wa'],
    ['Casio', 'Mq-24', 2980, false, false, 'Casio_Mq-24'],
    ['Diesel', '6628', 4696.09, false, false, 'Diesel_6628'],
    ['Diesel', '6630', 4586.75, false, false, 'Diesel_6630'],
    ['Mistral', 'SMTM7', 12686.41, false, true, 'Mistral_SMTM7'],
    ['Sweet', 'GpsPro', 12127, true, true, 'Sweet_GpsPro'],
    ['Samsung', 'Galaxy Watch 4', 39999, true, true, 'samsung_galaxyWatch4'],
    ['Amazfit', 'Fashion GTS 2 Mini 1.55"', 11399, true, true, 'Amazfit_FashionGTS2Mini1.55'],
    ['Samsung', 'Galaxy Fit 2 1.1"', 5599, true, true, 'Samsung_GalaxyFit21.1']
];

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

let interes = 1.2
let relojesObj = []
let precioTotal;
let cuota;
//El nombre de la persona
let nombre = '';
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
    
    ordenarRelojes(0);
    
    agregarReloj();
    
    mostrarRelojes();
    
    escucharCambioOrden();
    
    /* Más adelante se obtendrán estos datos con un formulario o inputs.(↓) */
    
    // let relojUsuario = obtenerDatos(`Elige un reloj de la consola (Entre 1 y ${relojes.length})`, relojes.length);
    
    // let { marca, modelo, precio, tipo, smart, source } = relojesObj[relojUsuario - 1];
    
    // calcularCuotas(precio, cantCuotas);
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function elegirSaludo() {
    const saludoIndex = randomInteger(0, frases.length - 1);
    const saludo = frases[saludoIndex];
    const saludoH2 = document.getElementById('saludo');

    saludoH2.innerHTML = saludo;
}

function agregarReloj() {
    
    relojesObj = []
    
    for (let reloj of relojes) {
        let [ marca, modelo, precio, tipo, smart, source ] = reloj
        let relojObj = new Reloj(marca, modelo, precio, tipo, smart, source);
        relojesObj.push(relojObj);
    }
}

function escucharCambioOrden() {
    const ordenCriterio = document.getElementById('orden');
    const ordenAscDesc = document.getElementById('ordenAscDesc');

    ordenCriterio.addEventListener('change', (e) => {
        ordenarRelojes(ordenCriterio.value, ordenAscDesc.value);
        agregarReloj()
        mostrarRelojes();
    });

    ordenAscDesc.addEventListener('change', (e) => {
        ordenarRelojes(ordenCriterio.value, ordenAscDesc.value);
        agregarReloj()
        mostrarRelojes();
    });

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
        } else {
            console.log('No se pudieron ordenar los elementos según el criterio establecido.');
        }
    })
}

function mostrarRelojes() {
    const contenedorRelojes = document.getElementById('contenedorRelojes');
    
    while (contenedorRelojes.firstChild) {
        contenedorRelojes.removeChild(contenedorRelojes.firstChild);
    }
    
    for (const reloj of relojesObj) {
        let relojDiv = document.createElement('DIV');
        relojDiv.classList.add('reloj');
        relojDiv.innerHTML = `
                            <div class=titulo>
                                <p>${reloj.marca} ${reloj.modelo}</p>
                            </div>
                            <div class="img-container">
                                <img class="reloj-img" src="${imagenesPath}${reloj.source}${formatoImg}">
                            </div>
                            <div class="precio">
                                <p>$${reloj.precio}</p>
                            </div>
                            <div class="info-secundaria">
                                <p>Tipo: ${reloj.tipo ? 'Digital' : 'Analógico'}</p>
                                <p>Es smart: ${reloj.smart ? 'Si' : 'No'}</p>
                            </div>
                            `;
        contenedorRelojes.appendChild(relojDiv);
    }
}

// function obtenerDatos(pregunta, limite) {

//     /* Voy a usar esta función para validar inputs. Por ahora no la uso */

//     datosInvalidos = true

//     while (datosInvalidos) {
//         respuesta = parseInt(prompt(pregunta));
        
//         if (!isNaN(respuesta)) {
//             if (respuesta <= limite && respuesta > 0) {
//                 datosInvalidos = false;
//             } else {
//                 alert('Tu respuesta debe ser entre 1 y ' + limite);
//             }
//         } else {
//             alert('Tu respuesta debe ser un número entero, sin símbolos.');
//         }
//     }
//     return respuesta;
// }

// function calcularCuotas(precio, cantCuotas) {
//     //Calculo el precio total "precioTotal" es global.
//     precioTotal = (precio / 100 * (cantCuotas * interes)) + precio
//     precioTotal = Math.round(precioTotal * 100) / 100
//     //Calculo el valor de cada cuota y la redondeo
//     cuota = Math.round(precioTotal / cantCuotas * 100) / 100
// }

// function capitalize(palabra) {
//     /* Transforma la primer letra de un string en mayúscula
//     y el resto en minúsculas.*/

//     palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
//     return palabra
// }