/* Elemento de la GUI */
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),
}

console.log("Ejecutando JavaScript...");

/* Definir un objeto cronómetro */
const crono = new Crono(gui.display);

/* Configurar las funciones de retrollamada */

/* Arranque del cronometro */
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}

/* Deterner el cronómetro */
gui.stop.onclick = () => {
    console.log("Stop!!");
    crono.stop();
}

/* Resetear del cronómetro */
gui.reset.onclick = () => {
    console.log("Reset!!")
    crono.reset();
}