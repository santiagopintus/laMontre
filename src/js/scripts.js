
let relojes = [
    ['Xiaomi', 'Smart Band 5', 2939, true, true, 'Xiaomi_SmartBand5'],
    ['Skmei', '9096', 3699, false, false, 'Skmei_9096'],
    ['Skmei', '1251', 2499, true, false, 'Skmei_1251'],
    ['Casio', 'A158wa', 4950, true, false, 'Casio_A158wa'],
    ['Casio', 'Mq-24', 2980, false, false, 'Casio_Mq-24'],
    ['Diesel', '6628', 4696.09, false, false, 'Diesel_6628'],
    ['Diesel', '6630', 4586.75, false, false, 'Diesel_6630'],
    ['Mistral', 'SMTM7', 12686.41, false, true, 'Mistral_SMTM7'],
    ['Sweet', 'GpsPro', 12127, true, true, 'Sweet_GpsPro']
];

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

    saludarUsuario();
    
    obtenerCriterioOrden();
    
    agregarReloj();
    
    mostrarRelojes();
    
    // let relojUsuario = obtenerDatos(`Elige un reloj de la consola (Entre 1 y ${relojes.length})`, relojes.length);
    
    // let { marca, modelo, precio, tipo, smart, source } = relojesObj[relojUsuario - 1];
    // mostrarInfoReloj(marca, modelo, precio, tipo, smart, source);

    // let cantCuotasPrompt = 'En cuántas cuotas deseas pagarlo? (Máximo 24)'
    // let cantCuotas = obtenerDatos(cantCuotasPrompt, 24);
    
    // calcularCuotas(precio, cantCuotas);

    // mostrarResumen(marca, modelo, cantCuotas);
}
function saludarUsuario() {
    let nombreUsuario = document.querySelector('#nombreUsuario');
    
    nombre = prompt('Hola! Cómo te llamas?');
    nombre = capitalize(nombre)
    nombreUsuario.innerText = nombre;
}

function obtenerCriterioOrden() {
    let prompt = 'En qué orden quieres ordenar los relojes?\n1 - Marca\n2 - Modelo\n3 - Precio\n4 - Tipo\n5 - Smart o no \n(Ingresa solo números entre 1 y 5)'
    criterio = obtenerDatos(prompt, 5) - 1;
    ordenarRelojes(criterio);
}

function agregarReloj() {
    for (let reloj of relojes) {
       let [ marca, modelo, precio, tipo, smart, source ] = reloj
       let relojObj = new Reloj(marca, modelo, precio, tipo, smart, source);
       relojesObj.push(relojObj);
    }
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

function obtenerDatos(pregunta, limite) {
    datosInvalidos = true

    while (datosInvalidos) {
        respuesta = parseInt(prompt(pregunta));
        
        if (!isNaN(respuesta)) {
            if (respuesta <= limite && respuesta > 0) {
                datosInvalidos = false;
            } else {
                alert('Tu respuesta debe ser entre 1 y ' + limite);
            }
        } else {
            alert('Tu respuesta debe ser un número entero, sin símbolos.');
        }
    }
    return respuesta;
}

function mostrarInfoReloj(marca, modelo, precio, tipo, smart, source) {
    alert(`
    El reloj ${marca} ${modelo}, es de tipo ${tipo ? 'digital' : 'analógico'} y ${smart ? 'es smart' : 'no es smart'}.
    Su precio es de $${precio}.
    `);
}

function calcularCuotas(precio, cantCuotas) {
    //Calculo el precio total
    precioTotal = (precio / 100 * (cantCuotas * interes)) + precio
    precioTotal = Math.round(precioTotal * 100) / 100
    //Calculo el valor de cada cuota y la redondeo
    cuota = Math.round(precioTotal / cantCuotas * 100) / 100
}

function mostrarResumen(marca, modelo, cantCuotas) {
    //Muestro los resultados con alert.
    alert(
        `Comprarás el reloj ${marca} ${modelo}.\nAbonarás un total de $${precioTotal} en ${cantCuotas} cuotas de $${cuota} con un interes total de ${Math.round((cantCuotas * interes) * 100) / 100}% sobre el valor original del reloj.`
    )
}

function capitalize(palabra) {
    palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    return palabra
}

main();