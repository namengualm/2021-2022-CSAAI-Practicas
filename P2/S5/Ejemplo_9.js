console.log("Ejecutando JavaScript...");

const botones = document.getElementsByClassName("digito")

/* Función de retrollamada de los botones de la clase digito */
function digito(value){
    console.log("Valor: " + value);
}

for (let boton of botones){
    
    /* Establecemos la función de llamada del boton i */
    /* El cual con el comando ev.target contiene el boton */
    /* con el cual se ha recibido el click */

    boton.onclick = (ev) => {
        digito(ev.target.value)
    }
}