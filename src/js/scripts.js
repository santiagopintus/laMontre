alert('Hola, cómo estás? Bienvenido a la tienda de relojes. Eligirás un reloj y podrás evaluar los diferentes métodos de pago.')

let relojes = [
    ['Xiaomi', 'Smart Band 5', 2939, 'digital', true],
    ['Skmei', '9096', 4190, 'analógico', false],
    ['Skmei', '1251', 2499, 'digital', false],
    ['Casio', 'A158wa', 4950, 'digital', false],
    ['Casio', 'Mq-24', 2980, 'analógico', false],
    ['Diesel', '6628', 4696.09, 'analógico', false],
    ['Diesel', '6630', 4586.75, 'analógico', false],
    ['Stone', 'SMT1058MN', 3079, 'digital', true],
    ['Mistral', 'SMTM7', 12686.41, 'analógico', true],
    ['Sweet', 'GpsPro', 12127, 'digital', true]
];

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
    agregarReloj();

    mostrarRelojes();

    let relojPrompt = 'De los que se muestran en la consola, cuál número de reloj eliges?'
    let relojUsuario = obtenerDatos(relojPrompt);
    
    let { marca, modelo, precio, tipo, smart } = relojesObj[relojUsuario - 1];
    mostrarInfoReloj(marca, modelo, precio, tipo, smart);

    let cantCuotasPrompt = 'En cuántas cuotas deseas pagarlo?'
    let cantCuotas = obtenerDatos(cantCuotasPrompt);
    
    calcularCuotas(precio, cantCuotas);

    mostrarResumen(marca, modelo, cantCuotas);
}


function agregarReloj() {
    for (let reloj of relojes) {
       let [ marca, modelo, precio, tipo, smart ] = reloj
       let relojObj = new Reloj(marca, modelo, precio, tipo, smart);
       relojesObj.push(relojObj);
    }
}

function mostrarRelojes() {
    let i = 1;
    for (let reloj of relojesObj) {
        console.log(
            `${i} . ${reloj.marca} ${reloj.modelo}
            Precio: $${reloj.precio}
            Tipo: ${reloj.tipo}
            Es smart: ${reloj.smart ? 'Si' : 'No'}`
        );
        i++;
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
    El reloj ${marca} ${modelo}, es de tipo ${tipo} y ${smart ? 'es smart' : 'no es smart'}.
    Su precio es de $${precio}.
    `);
}

function calcularCuotas(precio, cantCuotas) {
    //Calculo el precio total
    precioTotal = (precio / 100 * (cantCuotas * 2)) + precio
    precioTotal = Math.round(precioTotal * 100) / 100
    //Calculo el valor de cada cuota y la redondeo
    cuota = Math.round(precioTotal / cantCuotas * 100) / 100
}

function mostrarResumen(marca, modelo, cantCuotas) {
    //Muestro los resultados con alert.
    alert(
        `Comprarás el reloj ${marca} ${modelo}.\nAbonarás un total de $${precioTotal} en ${cantCuotas} cuotas de $${cuota} con un interes total de ${cantCuotas * 2}% sobre el valor original del reloj.`
    )
}

main();