import { root, router } from "../../script.js";
import { carrinho, saveState } from "../models/carrinho.js";
import { cliente, saveCliente } from "../models/cliente.js";
import { adotar, dom } from "../utils/adotar.js";
import { btn_retorno } from "../utils/Retorno.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { barraSuperior, btnRetorno } from "./superior.js";

const retornar = btn_retorno("/#carrinho");

function opcoes() {

    const acressimo = 10;

    const section = dom("section", "");
    const div = adotar(dom("div", "", { id: "nome-usuario" }), [
        dom("label", "Nome: ")])

    const input = dom("input", "", { type: "text", placeholder: "seu nome", value: cliente });

    input.addEventListener("input", () => {
        saveCliente(input.value);
        input.style.border = "";
    })

    const div2 = dom("div", "", { id: "retirada" })


    const card = cards("Pessoalmente", "retirar pessoalmente");
    const card2 = cards("Entrega", "entrega de encomenda", acressimo);

    card.addEventListener("click", () => {

        if (input.value.trim().length < 2) {
            input.style.border = "1px solid red";
            return null;
        }

        carrinho.setRetirada({ metodo: "Pessoalmente", acressimo: 0 })
        navigate(router, "/#pagamento");

        saveState()
    })

    card2.addEventListener("click", () => {
        if (input.value.trim().length.length < 2) {
            input.style.border = "1px solid red";
            return null;
        }
        carrinho.setRetirada({ metodo: "Entrega", acressimo: acressimo });
        navigate(router, "/#endereco")
        saveState();
    })

    adotar(div, [input])
    adotar(div2, [div, card, card2]);
    adotar(section, [div, div2]);
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
    adotar(root, [barraSuperior, opcoes()]);
    btnRetorno.innerText = "";
    adotar(btnRetorno, [retornar])
}