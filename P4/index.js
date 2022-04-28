
console.log("Ejecutando JavaScript...");

/* Obtener elementos del DOM */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const imagen1 =  document.getElementById("imagen1");

const imagen2 =  document.getElementById("imagen2");

const button1 = document.getElementById("sel1");

const button2 = document.getElementById("sel2");

const controls = document.getElementById("controls");

/* Acceso al Deslizador */

const rojo = document.getElementById('rojo');

const verde = document.getElementById('verde');

const azul = document.getElementById('azul');

/* Valor del deslizador */

const range_rojo = document.getElementById('range_rojo');

const range_verde = document.getElementById('range_verde');

const range_azul = document.getElementById('range_azul');

let img = null;

let sg = false;

let inv = false;

/* Acceso a Botones */

const color = document.getElementById("color");

const grises = document.getElementById("grises");

const espejo = document.getElementById('espejo');

const negativo = document.getElementById('negativo');

const vintage = document.getElementById('vintage');

const invertir = document.getElementById('invertir');

/* Función de retrollamada del boton 1 */

button1.onclick = function() {
    
    /* Se establece como tamaño del canvas, el mismo que el de la imagen original. */
    canvas.width = imagen1.width;
    canvas.height = imagen1.height;

    /* Situar la imgen original en el canvas. No se han hecho manipulaciones todavia. */

    ctx.drawImage(imagen1, 0, 0, imagen1.width, imagen1.height);

    img = imagen1;

    console.log("Imagen lista..."); 
}

/* Función de retrollamada del boton 2 */

button2.onclick = function() {
    
    /* Se establece como tamaño del canvas, el mismo que el de la imagen original. */
    canvas.width = imagen2.width;
    canvas.height = imagen2.height;

    /* Situar la imgen original en el canvas. No se han hecho manipulaciones todavia. */

    ctx.drawImage(imagen2, 0, 0, imagen2.width, imagen2.height);

    img = imagen2;

    console.log("Imagen lista..."); 
}


function colores(){

    H_Deslizadores();

    if (sg){
        return;
    }

    /* Situar la imagen original en el canvas. */
    /* No se han hecho manipulacione todavia. */

    ctx.drawImage(img, 0, 0, img.width, img.height);

    /* Obtener la imagen del canvas en pixeles. */
    
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* Obtener el array con todos los pixeles. */

    let data = imgData.data;

    /* Resolución de los valores de los deslizadores de los colores */
    
    range_rojo.innerHTML = rojo.value;
    
    range_verde.innerHTML = verde.value;
    
    range_azul.innerHTML = azul.value;

    /* Obtención de los umbrales de los colores */

    var umbral_rojo = rojo.value;

    var umbral_verde = verde.value;

    var umbral_azul = azul.value;

    /* Filtrado de la imagen según el nuevo umbral */

    for (let i = 0; i < data.length; i += 4){
        if (data[i] > umbral_rojo){
            data[i] = umbral_rojo;
        }
        
        if (data[i+1] > umbral_verde){
            data[i+1] = umbral_verde;
        }
        
        if (data[i+2] > umbral_azul){
            data[i+2] = umbral_azul;
        }
    }

    /* Poner la imagen modificada en el canvas. */
    ctx.putImageData(imgData, 0, 0);

}

/* Función de retrollamada de los deslizadores de los colores. */

rojo.oninput = () => {
    colores();
}

verde.oninput = () => {
    colores();
}

azul.oninput = () => {
    colores();
}

color.onclick = () => {
    sg = false;
    colores();
}

grises.onclick = () => {

    DH_Deslizadores();

    if (inv){
        return;
    }
    sg = true;
    /* Obtener la imagen del canvas en pixeles. */
    
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* Obtener el array con todos los pixeles. */

    let data = imgData.data;

    /* Filtrado de la imagen según el nuevo umbral */

    for (let i = 0; i < data.length; i += 4){
        Red = data[i];
        
        Green = data[i+1];
        
        Blue = data[i+2];
        
        G_Scale = (3 * Red + 4 * Green + Blue)/8;

        G_Scale = data[i] = data[i+1] = data[i+2];
    }

    /* Poner la imagen modificada en el canvas. */
    
    ctx.putImageData(imgData, 0, 0);
}

//boton espejo
espejo.onclick =() => {

    DH_Deslizadores();

    if (inv){
        return;
    }    
    sg = false;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.translate(img.width,0);
    ctx.scale(-1,1);
    ctx.drawImage(img, 0, 0, img.width, img.height);
}

/* boton negativo */
negativo.onclick = () =>{

    DH_Deslizadores();

    if (inv){
        return;
    }
        sg = false;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    for (let i = 0; i < data.length; i+=4){
      var R = data[i];
      var G = data[i+1];
      var B = data[i+2];
      data[i] = 255 - R;
      data[i+1] = 255 - G;
      data[i+2] = 255 - B;
  }
    ctx.putImageData(imgData, 0, 0);
}

/* boton vintage */
vintage.onclick = () => {

    DH_Deslizadores();

    if (inv){
        return;
    }
    sg = false;
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    for (var i = 0; i < data.length; i++) {
      var R = data[i* 4];
      var G = data[i*4 + 1];
      var B = data[i*4 + 2];

      //Sepia
      data[i*4] = (R * .393) + (G* .769) + (B * .189);
      data[i*4 +1] = (R * .349) + (G* .686) + (B * .168);
      data[i*4 +2] = (R * .272) + (G* .534) + (B * .131);
      }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
}

/* Retrollamada del Boton de Invertir */
invertir.onclick = () =>{

    DH_Deslizadores();

    sg = false;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.translate(0,img.height);
    ctx.scale(1,-1);
    ctx.drawImage(img, 0, 0, img.width, img.height);
}

function H_Deslizadores() {
    rojo.disabled = false;
    verde.disabled = false;
    azul.disabled = false;
}

function DH_Deslizadores() {
    rojo.disabled = true;
    verde.disabled = true;
    azul.disabled = true;
}

console.log("Fin...");