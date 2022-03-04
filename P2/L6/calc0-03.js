console.log("Ejecutando JavaScript...");

/* Elementos de la interfaz de la calculadora */
display = document.getElementById("display")
boton1 = document.getElementById("boton1")
boton2 = document.getElementById("boton2")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

/* Funciones de retrollamada de los botones... */
/* Cada vez que se pulse un boton se actua sobre la cadena, */
/* añadiendo digito 1 + operador + digito 2 + evaluacion de la operacion. */

/* Dígito 1 */
boton1.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

/* Dígito 2 */
boton2.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

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