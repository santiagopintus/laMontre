alert('Hola, cómo estás? Bienvenido a la tienda de relojes. Eligirás un reloj y podrás evaluar el precio final dependiendo de la cantidad de cuotas que elijas. (Abre la consola y recarga la página).')

let relojes = [
    ['Xiaomi', 'Smart Band 5', 2939, true, true],
    ['Skmei', '9096', 4190, false, false],
    ['Skmei', '1251', 2499, true, false],
    ['Casio', 'A158wa', 4950, true, false],
    ['Casio', 'Mq-24', 2980, false, false],
    ['Diesel', '6628', 4696.09, false, false],
    ['Diesel', '6630', 4586.75, false, false],
    ['Stone', 'SMT1058MN', 3079, true, true],
    ['Mistral', 'SMTM7', 12686.41, false, true],
    ['Sweet', 'GpsPro', 12127, true, true]
];
let interes = 1.2
let relojesObj = []
let precioTotal;
let cuota;

class Reloj {
    constructor(marca, modelo, precio, tipo, smart) {
        this.marca = marca,
        this.modelo = modelo,
        this.precio = parseFloat(precio),
        this.tipo = tipo,
        this.smart = smart    
    }
}

function main() {
    
    obtenerCriterioOrden();
    
    agregarReloj();
    
    mostrarRelojes();
    
    let relojUsuario = obtenerReloj();
    
    let { marca, modelo, precio, tipo, smart } = relojesObj[relojUsuario - 1];
    mostrarInfoReloj(marca, modelo, precio, tipo, smart);

    let cantCuotasPrompt = 'En cuántas cuotas deseas pagarlo?'
    let cantCuotas = obtenerDatos(cantCuotasPrompt);
    
    calcularCuotas(precio, cantCuotas);

    mostrarResumen(marca, modelo, cantCuotas);
}

function obtenerCriterioOrden() {
    let prompt = 'En qué orden quieres ordenar los relojes?\n1 - Marca\n2 - Modelo\n3 - Precio\n4 - Tipo\n5 - Smart o no \n(Ingresa solo números entre 1 y 5)'
    criterio = obtenerDatos(prompt) - 1;
    ordenarRelojes(criterio);
}

function agregarReloj() {
    for (let reloj of relojes) {
       let [ marca, modelo, precio, tipo, smart ] = reloj
       let relojObj = new Reloj(marca, modelo, precio, tipo, smart);
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
    let i = 1;
    for (let reloj of relojesObj) {
        console.log(
            `${i} . ${reloj.marca} ${reloj.modelo}
            Precio: $${reloj.precio}
            Tipo: ${reloj.tipo ? 'digital' : 'analógico'}
            Es smart: ${reloj.smart ? 'Si' : 'No'}`
        );
        i++;
    }
}

function obtenerReloj() {
    relojInvalido = true
    while (relojInvalido) {
        let relojUsuario = obtenerDatos(`Elige un reloj de la consola (Entre 1 y ${relojes.length})`);
        if (relojUsuario <= relojes.length && relojUsuario > 0) {
            relojInvalido = false;
            return relojUsuario;
        } else {
            alert('El reloj elegido debe ser entre 1 y ' + relojes.length);
        }
    }
}

function obtenerDatos(pregunta) {
    datosInvalidos = true

    while (datosInvalidos) {
        respuesta = parseInt(prompt(pregunta));
        
        if (!isNaN(respuesta)) {
            datosInvalidos = false;
        } else {
            alert('Tu respuesta debe ser un número entero, sin símbolos.');
        }
    }
    return respuesta;
}

function mostrarInfoReloj(marca, modelo, precio, tipo, smart) {
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

main();