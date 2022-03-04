console.log("Ejecutando JavaScript...");

/* Elementos de la interfaz de la calculadora */
display = document.getElementById("display")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

/* Obtener una coleccion con todos los elementos de la clase dígito */
digitos = document.getElementsByClassName("digito")

/* Establecer la misma funcion de retrollamada para todos los botones de tipo dígito */
for (let boton of digitos){

    /* Se ejecuta cuando se pulsa un botón que es un dígito */
    boton.onclick = (ev) => {
        display.innerHTML += ev.target.value;
        console.log("DIGITO!!");
    }
}

/* Funciones de retrollamada de los botones... */
/* Cada vez que se pulse un boton se actua sobre la cadena, */
/* añadiendo digito 1 + operador + digito 2 + evaluacion de la operacion. */

/* Insertar simbolo suma */
suma.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

/* Insertar simbolo resta */
resta.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

/* Evaluar la expresión */
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
}

/* Poner a cero la expresión */
clear.onclick = () => {
    display.innerHTML = "0";
}