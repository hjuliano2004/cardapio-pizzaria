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




export function formatCoins(coin){

    if(Number.isInteger(coin)){
        return `${coin},00`;
    }

    let str = coin.toString();
    str = str.split("");

   for(let i=0;i<str.length;i++){

    let v = null;
    if(str[i] != "." && !v){
        str.splice(i, 1);
    }else{
        v = true;
    }
   }

   coin = coin.toString();
   coin = coin.replace(".", ",");
   
   if(str.length == 3){
    return `${coin}`;
   }
   if(str.length == 2){
    return `${coin}0`
   }


}