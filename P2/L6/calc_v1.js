console.log("Ejecutando JavaScript...");

/* Elementos de la interfaz de la calculadora */
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

/* Maquina de Estados para la calculadora */
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
}

/* La variable 'ESTADO' de la calculadora; al comenzar debe estar en el estado inicial 'INIT' */
let estado = ESTADO.INIT;

/* Función de retrollamada de los digitos */
function digito(ev){

    /* Se ha recibido un dígito. Según en qué estado se encuentre la calculadora, se hará una cosa u otra... */

    /* Si es el primer dígito, no lo añadimos, sino que lo mostramos directamente en el display */
    if (estado == ESTADO.INIT){
        display.innerHTML = ev.target.value;

        /* Pasar al siguiente estado */
        estado = ESTADO.OP1;

    }else{
        /* En cualquier otro estado lo añadimos */
        display.innerHTML += ev.target.value;
        
        /* Y nos quedamos en el mismo estado... *
        /* Ojo! Este ejemplo sólo lo implementa el primer estado del diagrama- */
        /* Habría que tener en cuesta en el resto... */
    }
}

/* Obtener una colección con todos los elementos de la clase dígito */
digitos = document.getElementsByClassName("digito")

/* Establecer la misma funcion de retrollamada para todos los botones de tipo dígito */
for (let boton of digitos){

    /* Se ejecuta cuando se pulsa un botón que es un dígito */
    boton.onclick = (ev) => {
        display.innerHTML += ev.target.value;
        console.log("DIGITO!!");
    }
}

/* Obtener una colección con todos los elementos de la clase operador */
operador = document.getElementsByClassName("operador")

/* Establecer la misma funcion de retrollamada para todos los botones de tipo dígito */
for (let operando of operador){

    /* Se ejecuta cuado se pulsa un botón que es un operador */
    operando.onclick = (ev) => {
        display.innerHTML += ev.target.value;
        console.log("OPERADOR!!");
    }
    
}

/* Funciones de retrollamada de los botones... */
/* Cada vez que se pulse un boton se actua sobre la cadena, */
/* añadiendo digito 1 + operador + digito 2 + evaluacion de la operacion. */

/* Evaluar la expresión */
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
}

/* Poner a cero la expresión */
clear.onclick = () => {
    display.innerHTML = " ";
}