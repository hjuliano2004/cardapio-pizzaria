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