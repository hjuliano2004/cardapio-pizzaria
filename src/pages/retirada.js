import { root } from "../../script.js";
import { adotar, dom } from "../utils/adotar.js";
import { formatCoins } from "../utils/utils.js";

function opcoes(){

    const acressimo = 10;

    const section = dom("section", "", {id: "retirada"});

    const card = cards("Retirada", "retirar pessoalmente");
    const card2 = cards("Entrega", "entrega de encomenda", acressimo);

    



    adotar(section, [card, card2]);
    return section;

}



function cards(titulo, mensagem, acressimo = 0){

    const card = dom("div", "", {class: "card-retirada"});

    const h3 = dom("h3", titulo);
    const p = dom("p", mensagem);
    const span = dom("span", `R$${formatCoins(acressimo)}`, {class: "preco"});

    adotar(card, [h3, p, span])


    return card;
}

export function retirada(){
    root.innerText = "";
    adotar(root, [opcoes()]);
}