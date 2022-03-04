/* Contador de Clicks de boton */
console.log("Ejecutando JavaScript...");

/* Crear objetos GUI, con los elementos de la interfaz gráfica. */
/* Al tenerlos agrupado podemos pasarlo como parámetro o asignárselo a otro objeto. */
const gui = {
    display: document.getElementById("display"),
    boton_inc: document.getElementById("boton_inc"),
    boton_dec: document.getElementById("boton_dec"),

}

/* Objeto contador: Contiene el valor y el método para incrementarse  */
const counter = {
    valor: 0,
    inc : function(value){
        this.valor += value;
        gui.display.innerHTML = this.valor;
    }
}

/* Acciones: Ligar el botón incremento al contador */
gui.boton_inc.onclick = () => {
    counter.inc(1)
}

/* Acciones: Ligar el botón decremento al contador */
gui.boton_dec.onclick = () => {
    counter.inc(-1)
}