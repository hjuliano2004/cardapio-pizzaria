export function esconde(lista){

    for(let i=0;i<lista.length;i++){
        lista[i].style.display = "none";
    }
}

export function mostra(lista){

    for(let i=0;i<lista.length;i++){
        lista[i].style.display = "block";
    }
}