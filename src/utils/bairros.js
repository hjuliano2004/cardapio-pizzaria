import { dom } from "./adotar.js";

const bairros = [
    "Aventureiro", "Boa Vista", "Bom Retiro", "Bucarein",
    "Espinheiros", "Iririú","Jardim Paraíso", "Jarivatuba"];

export function geraBairros(){
    let lista = [];

    for(let i=0;i<bairros.length;i++){
        lista.push(dom("option", bairros[i], {value: bairros[i]}))
    }

    return lista;
}

export function bairroExiste(bairro){
    let response = false;

    for(let i=0;i<bairros.length;i++){
        if(bairro == bairros[i]){
            response = true;
        }
    }

    return response;
}