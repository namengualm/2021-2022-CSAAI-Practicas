let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const btn_video1 = document.getElementById("btn_video1");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");


//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;
video1.width=200;  
video1.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "test.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;

const ESTADO = {
    INIT: 0,
    RUN: 1
}

//-- Comienza el estado inicial
let estado = ESTADO.INIT;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {

  //-- Cambia de estado 
  estado = ESTADO.RUN;
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();

  //-- Y en silencio...
  video1.muted = true;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
};

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
    console.log("test");
}

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    if (estado == ESTADO.RUN)  {
        directo.src = video1.src;
        directo.currentTime = video1.currentTime;
        directo.play();
        directo.poster=null;
        console.log("camara1");
    }
}