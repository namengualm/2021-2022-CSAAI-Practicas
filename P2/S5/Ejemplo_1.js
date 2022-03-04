
/* Contador de Clicks de boton */
console.log("Ejecutando JavaScript...");

/* Acceder a los elementos del DOM */
const display = document.getElementById("display");
const boton = document.getElementById("boton");

/* Contador de clicks */
let cont = 0;

/* Configuración de la retrollamada del botón */
boton.onclick = () => {
    console.log("Click!");

    /* Incrementamos el contador */
    cont += 1;

    /* Actualizamos el display */
    display.innerHTML = cont;
}