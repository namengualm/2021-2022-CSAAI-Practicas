//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const btn_video1 = document.getElementById("btn_video1");
const btn_video2 = document.getElementById("btn_video2");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");
const bnormal = document.getElementById("normal");
const bauto = document.getElementById("auto");
const loop = document.getElementById("loop");

//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;
video1.width=200;  
video1.height=100;
video2.width=200;  
video2.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "test.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;

const ESTADO = {
  INIT: 0,
  MODONORMAL: 1,
  MODOAUTO: 2
}

//-- Comienza el estado inicial
let estado = ESTADO.INIT;

//-- Variables del bucle
var sloop = false;
const init = 3;
const finish = init + 2;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {

  //-- Cambia de estado 
  estado = ESTADO.MODONORMAL;
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";

  //-- Establecer la fuente de la cámara 2
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();

  //-- Y en silencio...
  video1.muted = true;
  video2.muted = true;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;

  normal()
};

//-- Boton de FUENTES-OFF
btn_src_off.onclick = () => {

  //-- Cambia de estado 
  estado = ESTADO.INIT;

  ////-- Reproducimos un vídeo, desde el comienzo
  //video1.pause();
  //video2.pause();

  //-- En la emisión en directo y videos ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
  directo.src = null;
  video1.poster = TEST_IMAGE_URL;
  video1.src = null;
  video2.poster = TEST_IMAGE_URL;
  video2.src = null;

  //--Ponemos el bucle off por si estuviera on
  sloop = false;

  MarcoVideos(3);
  loop.style.border = null;
  bnormal.style.border = null;
  bauto.style.border = null;
}

function normal(){
  //-- Botón de Test
  btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
  };

  //-- Botón de Selección de la cámara 1
  btn_video1.onclick = () => {
    if (estado == ESTADO.MODONORMAL)  {
      directo.src = video1.src;
      directo.currentTime = video1.currentTime;
      directo.play();
      directo.poster=null;
      MarcoVideos(1);
    }
  };

  //-- Botón de Selección de la cámara 2
  btn_video2.onclick = () => {
    if (estado == ESTADO.MODONORMAL)  {
      directo.src = video2.src;
      directo.currentTime = video2.currentTime;
      directo.play();
      directo.poster=null;
      MarcoVideos(2);
    }
  };
}

//-- Botón de modo Normal
bnormal.onclick = () => {
  if (estado != ESTADO.INIT) {
    //-- Cambia de estado 
    estado = ESTADO.MODONORMAL;

    //--Ponemos el bucle off por si estuviera on
    sloop = false;

    bnormal.style.border = '3px solid blue';
    loop.style.border = null;
    bauto.style.border = null;
    normal()
  }
};

//-- Botón de modo Automático
bauto.onclick = () => {
  if (estado != ESTADO.INIT) {
    //-- Cambia de estado 
    estado = ESTADO.MODOAUTO;

    //--Ponemos el bucle off por si estuviera on
    sloop = false;

    bauto.style.border = '3px solid blue';
    bnormal.style.border = null;
    loop.style.border = null;
    MarcoVideos(3);
    auto()
  }
};

//-- Funcion de espera
function espera(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//--Funcion automatica 
async function auto(){
  while(estado == ESTADO.MODOAUTO){
  
    if(estado == ESTADO.MODONORMAL) break;
  
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    MarcoVideos(1);
    directo.play();
  
    await espera(3000);
  
    if(estado == ESTADO.MODONORMAL) break;
  
    directo.src = video2.src;
    directo.currentTime = video2.currentTime;
    MarcoVideos(2);
    directo.play();
  
    await espera(3000);
  }
}

//-- Botón de modo Bucle
loop.onclick = () => {
  if (estado != ESTADO.INIT) {
    console.log('Modo bucle');
    //noloop.style.border = '5px solid black';
    //display.currentTime = init;
    sloop = true;
    loop.style.border = '3px solid blue';
    bnormal.style.border = null;
    bauto.style.border = null;
  }
};

setInterval(()=>{
  if(sloop){
    if (directo.currentTime > finish){
        directo.currentTime = init;
    }
  }
},);

//--Enmarcado de videos seleccionados en rojo
function MarcoVideos(num){
  if (num == 1){
    document.getElementById("video1").style.border = "thick solid rgba(255,51,51,1)";
    document.getElementById("video2").style.border = "thick solid rgba(255,51,51,0)";
  }else if (num == 2){
    document.getElementById("video1").style.border = "thick solid rgba(255,51,51,0)";
    document.getElementById("video2").style.border = "thick solid rgba(255,51,51,1)";
  }else if (num == 3){
    document.getElementById("video1").style.border = null;
    document.getElementById("video2").style.border = null;
  }
}