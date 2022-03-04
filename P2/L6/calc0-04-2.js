console.log("Ejecutando JavaScript...");

/* Elementos de la interfaz de la calculadora */
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

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
    display.innerHTML = "0";
}