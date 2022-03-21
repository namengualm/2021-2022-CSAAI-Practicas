console.log("Ejecutando JavaScript de la Práctica 2 de CSAAI...");

/* Elementos de la interfaz de la calculadora */
let display = document.getElementById("display")
let igual = document.getElementById("igual")
let clear = document.getElementById("clear")
let clear_all = document.getElementById("clear_all")
let punto = document.getElementById("punto")
let parentesis_izq = document.getElementById("parentesis_izq")
let parentesis_dcha = document.getElementById("parentesis_dcha")
let porcentaje = document.getElementById("porcentaje")
let exponente = document.getElementById("exponente")
let numero_pi = document.getElementById("numero_pi")

/* Maquina de Estados para la calculadora */
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
    RESULT: 4,
}

/* La variable 'ESTADO', de la calculadora; al comenzar debe estar en el estado inicial 'INIT' */
let estado = ESTADO.INIT;

/* El boton/tecla 'ANS' de la calculadora, al inicializar la calculadora, está debe comenzar en el valor 0 */
let ANS = "0";
let ans = document.getElementById("ans");

//-- Crea un array con todos los elementos de la clase digito -> Busqueda en el archivo HTML.
let digitos = document.getElementsByClassName("digito"); 

//-- Crea un array con todos los elementos de la clase operacion -> Busqueda en el archivo HTML.
let operacion = document.getElementsByClassName("operacion");

/* Estamos delante de un arrow-function. Se recorre el array de los digitos [0 - 9] */
for (i=0; i<digitos.length; i++){
    digitos[i].onclick = (ev) => {
      digito(ev.target.value);
    }
}

/* Función de retrollamada de los digitos */
function digito(botons){

    /* Se ha recibido un dígito. Según en qué estado se encuentre la calculadora, se hará una cosa u otra... */

    /* Si es el primer dígito, no lo añadimos, sino que lo mostramos directamente en el display */
  if(estado == ESTADO.INIT) {
      display.innerHTML = botons;
      estado = ESTADO.OP1;
      console.log(estado,"OP1");
  }else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION){
      display.innerHTML += botons;
      if (estado == ESTADO.OPERATION) {
          estado = ESTADO.OP2;
          console.log(estado,"OP2");
      }else if (estado == ESTADO.OP1){
          console.log(estado, "OP1");
      }
  }
}

/* Establecer la misma funcion de retrollamada para todos los botones de tipo dígito */
for (let operando of operacion){

    /* Se ejecuta cuado se pulsa un botón que es un operador */
      operando.onclick = (ev) => {
        console.log(estado);
        switch(estado) { // Comprobamos en qué estado nos encontramos
          case ESTADO.INIT:
              return; // Si no hemos escrito nada no podemos empezar una operacion
          case ESTADO.OP1:
              estado = ESTADO.OPERATION;
              break; // Podemos escribir el operando
          case ESTADO.OPERATION:
              return; // Si ya hemos escrito un operando no podemos escribir otro
          case ESTADO.OP2:
              if (ev.target.value != "=") {
                  return; // Si no es el operando = no podemos escribirlo
              } else {
                  estado = ESTADO.RESULT;
                  break;
              }
          default:
              // Si alguien introdujese un estado nuevo, no pasaría nada
              return;
        }
        display.innerHTML += ev.target.value;
    } 
}

/* Funciones de retrollamada de los botones... */
/* Cada vez que se pulse un boton se actua sobre la cadena, */
/* añadiendo digito 1 + operador + digito 2 + evaluacion de la operacion. */

/*  Evaluar la expresion de la coma  */
punto.onclick = (ev) => {
    if(estado != ESTADO.OP1 && estado != ESTADO.OP2){
      console.log("Error de ejecución... No es posible poner la coma.");
    }else{
      display.innerHTML += ev.target.value;
      console.log(estado,"Ejecucción correcta, adición de la coma.");
    }
  }

/* Evaluar la expresión igual. */
igual.onclick = () => {
    if(estado == ESTADO.OP1 || estado == ESTADO.OP2){
        display.innerHTML = eval(display.innerHTML);
        ANS = display.innerHTML;
        estado = ESTADO.INIT;
        console.log(estado,"igual");
    }
}

/* Evaluar la expresion ANS. */
ans.onclick = () => {
  display.innerHTML += ANS;
}

/* Evaluamos la expresion para borrar el ultimo elemento. */
clear.onclick = () => {
    if (display.innerHTML.length == 1) {
        display.innerHTML = "";
        estado = ESTADO.INIT
      } else {
        display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
        switch(display.innerHTML[display.innerHTML.length-1]){
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            if (estado == ESTADO.OPERATION){
              estado = ESTADO.OP1;
            }else if (estado == ESTADO.RESULT){
              estado = ESTADO.OP2;
            }
            break;
          default:
            if (estado == ESTADO.OP2){
              estado = ESTADO.OPERATION;
            }else if (estado = ESTADO.OP1){
              estado = ESTADO.INIT;
            }
        }
      }
    }

/* Evaluar la expresión para volver a poner la Calculadora en ESTADO INICIAL. */
clear_all.onclick = () => {
    display.innerHTML = " ";
    estado = ESTADO.OP1;
}

/* Evaluar la expresión Raiz Cuadrada. */
raiz_cuadrada.onclick = () => {
    display.innerHTML = Math.sqrt(display.innerHTML);
}

/* Evaluar la espresión Exponente. */
exponente.onclick = () => {
  display.innerHTML += "**";
}

/* Evaluar la expresión Número PI. */
numero_pi.onclick = () => {
  display.innerHTML += Math.PI;
}

/* Evaluar las expresiones de los Parentesis */
parentesis_izq.onclick = () => {
  display.innerHTML += "("
}

/* Evaluar las expresiones de los Parentesis */
parentesis_dcha.onclick = () => {
  display.innerHTML += ")"
}

/* Evaluar las expresiones de los Parentesis */
porcentaje.onclick = () => {
  display.innerHTML += "*0.01"
}