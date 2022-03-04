console.log("Ejecutando JavaScript...");

/* Crear objetos de la GUI, con los elementos de la interfaz gráfica. */
/* Al tenerlo agrupado podemos pasarlo como parámetro o asignárselo a otro objeto */
const gui = {
    
    /* Elementos GUI del contador 1 */
    display_1: document.getElementById("display_1"),
    boton_inc_1: document.getElementById("boton_inc_1"),
    boton_dec_1: document.getElementById("boton_dec_1"),

    /* Elementos GUI del contador 2 */
    display_2: document.getElementById("display_2"),
    boton_inc_2: document.getElementById("boton_inc_2"),
    boton_dec_2: document.getElementById("boton_dec_2"),
}

/* Clase "counter" para crear contadores */
/* Hay que pasarle como parámetro en el constructor el display usado */
class counter {
    
    /* Constructor del objeto. Inicialización de las propiedades */
    constructor(display) {
        
        /* Valor del contador */
        this.valor = 0;

        /* Almacenamiento del display */
        this.display = display;
    }

    /* Metodo "INC" para actualizar el contador y mostrarlo en el display */
    inc(value) {
        this.valor += value;
        this.display.innerHTML = this.valor
    }
}

/* Creación de objetos comunes */
const C1 = new counter(gui.display_1);
const C2 = new counter(gui.display_2);

/* Acciones sobre el contador 1 (Incrementar y Decrementar) */
gui.boton_inc_1.onclick = () => {
    C1.inc(1);
}
gui.boton_dec_1.onclick = () => {
    C1.inc(-1);
}

/* Acciones sobre el contador 2 (Incrementar y Decrementar) */
gui.boton_inc_2.onclick = () => {
    C2.inc(1);
}
gui.boton_dec_2.onclick = () => {
    C2.inc(-1);
}