console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");
const sonido_tanto = new Audio("pong-tanto.mp3");
const myAudio = document.getElementById('myAudio');

//-- Definir el tamaño del convas
canvas.width = 760;
canvas.height = 1000;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

const ESTADO = {
  START: 0,
  INIT: 1,
  SAQUE: 2,
  FINISH: 3,
}

//-Límite de minimas vidas
const MIN_VIDAS = -1;
//-Vidas totales
let vidas = 3;

//-- Comienza el estado inicial
let estado = ESTADO.START;

//-- Coordenadas de la bola
let x = 140;
let y = 890;

//-- Velocidades de la bola
let velx = -24;//-12
let vely = -8;//-4

//-- Coordenadas de la raqueta
let w = 100;
let z = 900;

//-- Velocidad de la raqueta
//let velw = 0;

//-- Funcion principal de animacion
function update() 
{
  //console.log("test");
  //-- Algoritmo de animacion:
  //-- 1) Actualizar posicion del  elemento
  //-- (física del movimiento rectilineo uniforme)

  //-- Condicion de rebote de bola en extremos verticales del canvas
  if (x < 10 || x >= (canvas.width - 10) ) {
    velx = -velx;
    //-- Reproducir sonido
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }

  //-- Condición de rebote de bola en extremos horizontales del canvas
  if (y <= 10) {
    vely = -vely;
    //-- Reproducir sonido
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }

  //-- Condición de rebote de bola en extremos horizontales del canvas
  if (y > (canvas.height) ) {
    estado = ESTADO.INIT;
    x = w + 40;
    y = z - 10;
    vely = -vely;
    //-- Reproducir sonido
    sonido_tanto.currentTime = 0;
    sonido_tanto.play();
  }

  //-- Condición de limite de raqueta en extremos horizontales del canvas
  if (w > 10 || w <= (canvas.width - 10) ) {

    window.onkeydown = (e) => {
      //-En el comienzo no se hace caso a las teclas
      //if (estado == ESTADO.INIT)
      //return;
    
      if (e.key == 'Enter' && estado == ESTADO.START){
        estado = ESTADO.INIT;
        myAudio.play();
        myAudio.volume = 0.2;
      }

      if (vidas != MIN_VIDAS)
      switch (e.key) {
        case " ":
        if (estado == ESTADO.INIT){
            //-- Reproducir sonido
            sonido_raqueta.currentTime = 0;
            sonido_raqueta.play();
            vidas -= 1;
            estado = ESTADO.SAQUE;
            console.log("Saque");
            //canvas.focus();
        }
        break;
        //-Movimiento raqueta a la izquierda
        case "a":
        case "A":
          if (estado == ESTADO.SAQUE){
          console.log("Moviendo a la izquierda la raqueta");
          w = w - 30;
          }
          break;
        //-Movimiento raqueta a la derecha
        case "d":
        case "D":
          if (estado == ESTADO.SAQUE){
          console.log("Moviendo a la derecha la raqueta");
          w = w + 30;
          }
          break;
        }
    }
  }
  if(w < 10) {
    w = 0;
  }
  if(w >= (canvas.width - 90)) {
    w = 680;
  }

  //-Colision bola con raqueta
  if ((x + 10) >= w && x <=(w + 100) &&
      (y + 5) >= z && y <=(z + 10)) {
        vely = -vely;
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();      
  }

  //-- Actualizar la posición
  if (estado == ESTADO.SAQUE) {
    x = x + velx;
    y = y + vely; 
  }

  //const stop = document.getElementById("stop");

    //stop.onclick = () => {
    //-- Volver al estado inicial
    //estado = ESTADO.INIT;
    //bola.init();
    //console.log('stop');
    //scoreD=0;
    //scoreI=0;
    //}
    
  //-Termina cuando pierdes todas las vidas
  if (vidas == MIN_VIDAS){
    vidas += 1;
    estado = ESTADO.FINISH;
    console.log("Fin");
    }
    
  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    //-- Bolita
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';

    //-- Dibujar el trazo
    ctx.stroke()

    //-- Dibujar el relleno
    ctx.fill()     
  ctx.closePath()

  //-- Texto solido
  ctx.font = "50px Arial Black";
  ctx.fillStyle = 'white'
  ctx.fillText(vidas, 400, 100);
  ctx.fillText("LIFES", 450, 100);

  ctx.font = "50px Arial Black";
  ctx.fillStyle = 'white'
  ctx.fillText("027", 100, 100);

  //-Mensaje final
  if (estado == ESTADO.FINISH) {
    ctx.font = "50px Arial Black";
    ctx.fillStyle = 'red'
    ctx.fillText("¡¡GAME OVER!!", 175, 600);
    }

  ctx.beginPath();
      //-- Raqueta
      ctx.rect(w,z, 80, 10);
      ctx.fillStyle = 'purple';

      //-- Dibujar el trazo
      ctx.stroke()

      //-- Dibujar el relleno
      ctx.fill()
      
  ctx.closePath()

  ctx.beginPath();
      //-- Ladrillos rojos de dimensiones 75x30
      ctx.rect(5,170, 75, 30);
      ctx.rect(80,170, 75, 30);
      ctx.rect(155,170, 75, 30);
      ctx.rect(230,170, 75, 30);
      ctx.rect(305,170, 75, 30);
      ctx.rect(380,170, 75, 30);
      ctx.rect(455,170, 75, 30);
      ctx.rect(530,170, 75, 30);
      ctx.rect(605,170, 75, 30);
      ctx.rect(680,170, 75, 30);
      ctx.strokeStyle = 'black';
      //-- Dibujar
      ctx.fillStyle = 'red';

      //-- Cambiar el tamaño de la linea del trazo
      ctx.lineWidth = 4;

      //-- Rellenar
      ctx.fill();

      //-- Dibujar el trazo
      ctx.stroke()
      
  ctx.closePath()

  ctx.beginPath();
      //-- Ladrillos rojos de dimensiones 75x30
      ctx.rect(5,200, 75, 30);
      ctx.rect(80,200, 75, 30);
      ctx.rect(155,200, 75, 30);
      ctx.rect(230,200, 75, 30);
      ctx.rect(305,200, 75, 30);
      ctx.rect(380,200, 75, 30);
      ctx.rect(455,200, 75, 30);
      ctx.rect(530,200, 75, 30);
      ctx.rect(605,200, 75, 30);
      ctx.rect(680,200, 75, 30);
      ctx.strokeStyle = 'black';
      //-- Dibujar
      ctx.fillStyle = 'hotpink';

      //-- Cambiar el tamaño de la linea del trazo
      ctx.lineWidth = 4;

      //-- Rellenar
      ctx.fill();

      //-- Dibujar el trazo
      ctx.stroke()
      
  ctx.closePath()

  ctx.beginPath();
      //-- Ladrillos rojos de dimensiones 75x30
      ctx.rect(5,230, 75, 30);
      ctx.rect(80,230, 75, 30);
      ctx.rect(155,230, 75, 30);
      ctx.rect(230,230, 75, 30);
      ctx.rect(305,230, 75, 30);
      ctx.rect(380,230, 75, 30);
      ctx.rect(455,230, 75, 30);
      ctx.rect(530,230, 75, 30);
      ctx.rect(605,230, 75, 30);
      ctx.rect(680,230, 75, 30);
      ctx.strokeStyle = 'black';
      //-- Dibujar
      ctx.fillStyle = 'orange';

      //-- Cambiar el tamaño de la linea del trazo
      ctx.lineWidth = 4;

      //-- Rellenar
      ctx.fill();

      //-- Dibujar el trazo
      ctx.stroke()
      
  ctx.closePath()

  ctx.beginPath();
      //-- Ladrillos rojos de dimensiones 75x30
      ctx.rect(5,260, 75, 30);
      ctx.rect(80,260, 75, 30);
      ctx.rect(155,260, 75, 30);
      ctx.rect(230,260, 75, 30);
      ctx.rect(305,260, 75, 30);
      ctx.rect(380,260, 75, 30);
      ctx.rect(455,260, 75, 30);
      ctx.rect(530,260, 75, 30);
      ctx.rect(605,260, 75, 30);
      ctx.rect(680,260, 75, 30);
      ctx.strokeStyle = 'black';
      //-- Dibujar
      ctx.fillStyle = 'yellow';

      //-- Cambiar el tamaño de la linea del trazo
      ctx.lineWidth = 4;

      //-- Rellenar
      ctx.fill();

      //-- Dibujar el trazo
      ctx.stroke()
      
  ctx.closePath()

  ctx.beginPath();
      //-- Ladrillos rojos de dimensiones 75x30
      ctx.rect(5,290, 75, 30);
      ctx.rect(80,290, 75, 30);
      ctx.rect(155,290, 75, 30);
      ctx.rect(230,290, 75, 30);
      ctx.rect(305,290, 75, 30);
      ctx.rect(380,290, 75, 30);
      ctx.rect(455,290, 75, 30);
      ctx.rect(530,290, 75, 30);
      ctx.rect(605,290, 75, 30);
      ctx.rect(680,290, 75, 30);
      ctx.strokeStyle = 'black';
      //-- Dibujar
      ctx.fillStyle = 'green';

      //-- Cambiar el tamaño de la linea del trazo
      ctx.lineWidth = 4;

      //-- Rellenar
      ctx.fill();

      //-- Dibujar el trazo
      ctx.stroke()
      
  ctx.closePath()

  ctx.beginPath();
      //-- Ladrillos rojos de dimensiones 75x30
      ctx.rect(5,320, 75, 30);
      ctx.rect(80,320, 75, 30);
      ctx.rect(155,320, 75, 30);
      ctx.rect(230,320, 75, 30);
      ctx.rect(305,320, 75, 30);
      ctx.rect(380,320, 75, 30);
      ctx.rect(455,320, 75, 30);
      ctx.rect(530,320, 75, 30);
      ctx.rect(605,320, 75, 30);
      ctx.rect(680,320, 75, 30);
      ctx.strokeStyle = 'black';
      //-- Dibujar
      ctx.fillStyle = 'cyan';

      //-- Cambiar el tamaño de la linea del trazo
      ctx.lineWidth = 4;

      //-- Rellenar
      ctx.fill();

      //-- Dibujar el trazo
      ctx.stroke()
      
  ctx.closePath()
  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();