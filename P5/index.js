console.log("Ejecutando JavaScript...");

let video1 = document.getElementById("video1");

const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");
const video4 = document.getElementById("video4");

const barras = "barras.jpg";

const camara1 = document.getElementById("camara1");
const camara2 = document.getElementById("camara2");
const camara3 = document.getElementById("camara3");

const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");
const btn_src_test = document.getElementById("btn_src_test");

const ESTADOS = {
    TEST: 0,
    RUNNING_1: 1,
    RUNNING_2: 2,
    RUNNING_3: 3,
    ON: 4,
    OFF: 5 
};

let estadoActual = ESTADOS.OFF;

video1.width = 420;
video1.height = 200;

video2.width = 200;
video2.height = 100;

video3.width = 200;
video3.height = 100;

video4.width = 200;
video4.height = 100;

video1.barras = barras;
video2.barras = barras;
video3.barras = barras;
video4.barras = barras;

camara1.onclick = () => {
    console.log(estadoActual);

    if (estadoActual == ESTADOS.RUNNING_1 || estadoActual == ESTADOS.OFF || estadoActual == ESTADOS.TEST){
        return;
    }
    
    video1.src = video2.src;
    video1.currentTime = video2.currentTime;
    video1.play();
    estadoActual = ESTADOS.RUNNING_1;
};

camara2.onclick = () => {
    console.log(estadoActual);

    if (estadoActual == ESTADOS.RUNNING_2 || estadoActual == ESTADOS.OFF || estadoActual == ESTADOS.TEST){
        return;
    }
    
    video1.src = video3.src;
    video1.currentTime = video3.currentTime;
    video1.play();
    estadoActual = ESTADOS.RUNNING_2;
};

camara3.onclick = () => {
    console.log(estadoActual);

    if (estadoActual == ESTADOS.RUNNING_3 || estadoActual == ESTADOS.OFF || estadoActual == ESTADOS.TEST){
        return;
    }
    
    video1.src = video4.src;
    video1.currentTime = video4.currentTime;
    video1.play();
    estadoActual = ESTADOS.RUNNING_3;
};

btn_src_on.onclick = () => {
    console.log(estadoActual);

    if (estadoActual != ESTADOS.OFF && estadoActual != ESTADOS.TEST){
        return;
    }
    
    video2.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
    video2.currentTime = 0;
    video2.play();
    video2.muted = true;

    video3.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
    video3.currentTime = 0;
    video3.play();
    video3.muted = true;

    video4.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"
    video4.currentTime = 0;
    video4.play();
    video4.muted = true;

    video1.barras = barras;
    estadoActual = ESTADOS.ON; 
};

btn_src_off.onclick = () => {
    console.log(estadoActual);

    if (estadoActual == ESTADOS.OFF){
        return;
    }

    video1.barras = barras;
    video1.src = "";
    
    video2.barras = barras;
    video2.src = "";
    
    video3.barras = barras;
    video3.src = "";
    
    video4.barras = barras;
    video4.src = "";

    estadoActual = ESTADOS.OFF;
};

btn_src_test.onclick = () => {
    console.log(estadoActual);

    if (estadoActual == ESTADOS.TEST){
        return;
    }

    video1.barras = barras;
    video1.src = "";
    
    video2.barras = barras;
    video2.src = "";
    
    video3.barras = barras;
    video3.src = "";
    
    video4.barras = barras;
    video4.src = "";
    
    estadoActual = ESTADOS.TEST;
};