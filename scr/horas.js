let funcionamento = document.getElementById("funcionamento");

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

        funcionamento.innerText = "Fechado, abre amanhã";
        funcionamento.style.color = "red";

        return
    }

    if(aberto){

        funcionamento.innerText = "Aberto"
        funcionamento.style.color = "green";
        
    }else{
        funcionamento.innerText = "Fechado";
        funcionamento.style.color = "red";
    }



}