import { root, router } from "../../script.js";
import { carrinho } from "../models/carrinho.js";
import { adotar, dom } from "../utils/adotar.js";
import { btn_retorno } from "../utils/Retorno.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { barraSuperior, btnRetorno } from "./superior.js";

const retornar = btn_retorno("/#carrinho");

function opcoes() {

    const acressimo = 10;

    const section = dom("section", "", { id: "retirada" });

    const card = cards("Retirada", "retirar pessoalmente");
    const card2 = cards("Entrega", "entrega de encomenda", acressimo);

    card.addEventListener("click", () => {
        carrinho.setRetirada({ metodo: "retirada", acressimo: 0 })
        navigate(router, "/#pagamento");
    })

    card2.addEventListener("click", () => {
        carrinho.setRetirada({ metodo: "retirada", acressimo: acressimo })
    })

    adotar(section, [card, card2]);
    return section;

}



function cards(titulo, mensagem, acressimo = 0) {

    const card = dom("div", "", { class: "card-retirada" });

    const h3 = dom("h3", titulo);
    const p = dom("p", mensagem);
    const span = dom("span", `R$${formatCoins(acressimo)}`, { class: "preco" });

    adotar(card, [h3, p, span])


    return card;
}

export function retirada() {
    root.innerText = "";
    adotar(root, [barraSuperior ,opcoes()]);
    btnRetorno.innerText = "";
    adotar(btnRetorno, [retornar])
}