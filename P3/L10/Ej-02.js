console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");
const sonido_tanto = new Audio("pong-tanto.mp3");
const myAudio = document.getElementById('myAudio');
//const restart = document.getElementById("restart");

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

//-Puntuación
let score = 0;

//-- Comienza el estado inicial
let estado = ESTADO.START;

//-- Coordenadas de la bola
let x = 140;
let y = 890;

//-- Velocidades de la bola
let velx = -12;//-12
let vely = -4;//-8

//--Pintar bola
let draw = false;

//-- Coordenadas de la raqueta
let w = 100;
let z = 900;

//-- Velocidad de la raqueta
//let velw = 0;

//-- Constantes de los ladrillos
const LADRILLO = {
  F: 6,  // Filas
  C: 10,  // Columnas
  n: 75, // Ancho
  h: 30, // Alto
  origen_a: 5,
  origen_b: 170,
  padding: 0,
  visible: true
};

//-- Estructura de los ladrillos
const ladrillos = [];

for (let i = 0; i < LADRILLO.F; i++) {
  ladrillos[i] = [];
  for (let j = 0; j < LADRILLO.C; j++) {
    ladrillos[i][j] = {
        a: ((LADRILLO.n + LADRILLO.padding) * j) + LADRILLO.origen_a,
        b: ((LADRILLO.h + LADRILLO.padding) * i) + LADRILLO.origen_b,
        n: LADRILLO.n,
        h: LADRILLO.h,
        padding: LADRILLO.padding,
        visible: LADRILLO.visible
      };
  }
}

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
        draw = true;
        //myAudio.play();
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

  //-- Actualizar la posición bolita
  if (estado == ESTADO.SAQUE) {
    x = x + velx; //x+= velx
    y = y + vely; 
  }
    
  //-Termina cuando pierdes todas las vidas
  if (vidas == MIN_VIDAS){
    vidas += 1;
    estado = ESTADO.FINISH;
    console.log("Fin");
  }

   //-- Volver al estado inicial
  /*restart.onclick = () => {
    estado = ESTADO.INIT;
    console.log('Reinicio');
    vidas = 3;
    score = 0;
    x = 140;
    y = 890;
    w = 100;
    z = 900;
  }*/

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    //-- Bolita
    if (draw == true){
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    }
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
  ctx.fillText(score, 100, 100);

  if (estado == ESTADO.FINISH) {
    //-Mensaje victoria
    if (score ==60) {
      ctx.font = "50px Arial Black";
      ctx.fillStyle = 'yellow'
      ctx.fillText("You have won,", 175, 600);
      ctx.fillText("congratulations !!", 175, 655);
    }else{
    //-Mensaje derrota
    ctx.font = "50px Arial Black";
    ctx.fillStyle = 'red'
    ctx.fillText("¡¡GAME OVER!!", 175, 600);
    }
  }
  
  //-Mensaje victoria
  /*if(ladrillos[i][j].visible == false){
    ctx.font = "50px Arial Black";
    ctx.fillStyle = 'yellow'
    ctx.fillText("You have won, congratulations !!", 175, 600);
  }*/




  ctx.beginPath();
    //-- Raqueta
    ctx.rect(w,z, 80, 10);
    ctx.fillStyle = 'purple';

    //-- Dibujar el trazo
    ctx.stroke()

    //-- Dibujar el relleno
    ctx.fill()
      
  ctx.closePath()

  //-- Dibujar ladrillos
  for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {

      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible == true) {
        //-- Ladrillos rojos de dimensiones 75x30
        ctx.beginPath();
        ctx.rect(ladrillos[0][j].a, ladrillos[0][j].b, LADRILLO.n, LADRILLO.h);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'red';
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke()
        ctx.closePath();

        //-- Ladrillos rosa de dimensiones 75x30
        ctx.beginPath();
        ctx.rect(ladrillos[1][j].a, ladrillos[1][j].b, LADRILLO.n, LADRILLO.h);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'hotpink';
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke()
        ctx.closePath();

        //-- Ladrillos naranja de dimensiones 75x30
        ctx.beginPath();
        ctx.rect(ladrillos[2][j].a, ladrillos[2][j].b, LADRILLO.n, LADRILLO.h);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'orange';
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke()
        ctx.closePath();

        //-- Ladrillos amarillo de dimensiones 75x30
        ctx.beginPath();
        ctx.rect(ladrillos[3][j].a, ladrillos[3][j].b, LADRILLO.n, LADRILLO.h);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'yellow';
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke()
        ctx.closePath();

        //-- Ladrillos verde de dimensiones 75x30
        ctx.beginPath();
        ctx.rect(ladrillos[4][j].a, ladrillos[4][j].b, LADRILLO.n, LADRILLO.h);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'green';
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke()
        ctx.closePath();

        //-- Ladrillos azul de dimensiones 75x30
        ctx.beginPath();
        ctx.rect(ladrillos[5][j].a, ladrillos[5][j].b, LADRILLO.n, LADRILLO.h);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'cyan';
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke()
        ctx.closePath();
      }else if(ladrillos[i][j].visible == false){
        /*ctx.font = "50px Arial Black";
        ctx.fillStyle = 'yellow'
        ctx.fillText("You have won,", 175, 600);
        ctx.fillText("congratulations !!", 175, 655);*/
        ladrillos[i][j] = [];
      }
    }
  }

  //-Colision bola con ladrillos
  if (estado == ESTADO.SAQUE){
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
          if (ladrillos[i][j].visible == true){
                if ((x + 10) >= ladrillos[i][j].a && x <=(ladrillos[i][j].a + 95) &&
                    (y + 5) >= ladrillos[i][j].b && y <=(ladrillos[i][j].b + 30)) {
                    ladrillos[i][j].visible = false;
                    vely = -vely;
                    //-- Reproducir sonido
                    sonido_raqueta.currentTime = 0;
                    sonido_raqueta.play(); 
                    //-Puntuación
                    score += 1;
                    if (score == 60) {
                      estado = ESTADO.FINISH;
                    }
                } 
            }     
        }
    }
  }   
  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();