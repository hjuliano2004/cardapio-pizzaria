import { h4Funcionamento } from "../pages/header.js";

let aberto = true;

function agora(){

    let now = new Date();

    return {
        hora: now.getHours(),
        minuto: now.getMinutes(),
        dia: now.getDay()
    }
}

export function horario(){

    let now = agora();

    if(now.hora < 18 && now.hora >= 3){
        aberto = false;
    }

    if(now.hora === 18 && now.minuto < 30){
        aberto = false;
    }

    if(now.dia === 1){
        aberto = false;

        h4Funcionamento.innerText = "Fechado, abre amanhã";
        h4Funcionamento.style.color = "red";

        return
    }

    if(aberto){

        h4Funcionamento.innerText = "Aberto"
        h4Funcionamento.style.color = "green";
        
    }else{
        h4Funcionamento.innerText = "Fechado";
        h4Funcionamento.style.color = "red";
    }

}

export function espera(espera){//essa função não funciona se houver mais de 1 hora de espera
    let agora = new Date();

    let hora = agora.getHours();
    let min = agora.getMinutes();

    if((min + espera) > 60){
        hora++;
        min = (min + espera) - 60;
        return `${mins(hora)}:${mins(min)}`;
    }

    min = min + espera;

    return `${mins(hora)}:${mins(min)}`;

}

function mins(min){
    let string = `${min}`;

    if(string.length == 1){
        return `0${string}`;
    }

    return string;
}