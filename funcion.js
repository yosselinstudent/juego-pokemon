let tarjetasDestapadas=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let aciertos=0;
let movimientos=0;
let temporizador=false;
let timer=50;
let timerInicial=50;
let tiempoRegresivoId=null;
let winAdio=new Audio("sounds/win.mp3");
let loseAdio=new Audio("sounds/lose.mp3");
let clickAudio=new Audio("sounds/click.mp3");
let rightAudio=new Audio("sounds/right.mp3");
let wrongAudio=new Audio("sounds/wrong.mp3");
let mostrarMovimientos=document.getElementById("movimientos");
let mostrarAciertos=document.getElementById("aciertos");
let mostrarTiempo=document.getElementById("t-restante");

let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros=numeros.sort(()=>{return Math.random()-0.5;});

function contarTiempo(){
    tiempoRegresivoId=setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML=`Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAdio.play();
        }
    },1000);
}

function bloquearTarjetas(){       
    for(let i=0;i<=15;i++){
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML=numeros[i];
        tarjetaBloqueada.innerHTML=`<img src="img/${numeros[i]}.png">`;
        tarjetaBloqueada.disabled=true;
    }
}
function destapar(id){
    if(temporizador==false){
        contarTiempo();
        temporizador=true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas==1){
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML=`<img src="img/${primerResultado}.png">`;
        clickAudio.play();
        tarjeta1.disabled=true;
    }else if(tarjetasDestapadas==2){
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=`<img src="img/${segundoResultado}.png">`;
        tarjeta2.disabled=true;
        movimientos++;
        mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`;
        if(primerResultado==segundoResultado){
            tarjetasDestapadas=0;
            aciertos++;
            mostrarAciertos.innerHTML=`Aciertos: ${aciertos}`;
            if(aciertos==8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML=`Aciertos: ${aciertos} <br> Ganaste!!!`;
                mostrarTiempo.innerHTML=`Tiempo: ${timerInicial-timer} segundos`;
                mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} <br> Felicidades!!!`;
                winAdio.play();
            }
        }else{
            setTimeout(()=>{
                tarjeta1.innerHTML=" ";
                tarjeta2.innerHTML=" ";
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
                wrongAudio.play();
            },700);
        }
    }
}