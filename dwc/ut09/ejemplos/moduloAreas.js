
/* export const PI_Al_CUADRADO=Math.PI**2

export function areaCirculo(radio){
    return Math.PI*radio**2
}

export function areaCuadrado(lado){
    return ladoAlCuadrado(lado)
}

export function areaHexagoR(lado){
    return 6*(ladoAlCuadrado(lado)*Math.sqrt(3))/4
}

function ladoAlCuadrado(lado){
    return lado*lado
} */


const PI=Math.PI**2;

function areaCirculo(radio){
    return Math.PI*radio**2
}

function areaCuadrado(lado){
    return ladoAlCuadrado(lado)
}

function areaHexagoR(lado){
    return 6*(ladoAlCuadrado(lado)*Math.sqrt(3))/4
}

function ladoAlCuadrado(lado){
    return lado*lado
}

export{
    PI,
    areaCirculo,
    areaHexagoR
}