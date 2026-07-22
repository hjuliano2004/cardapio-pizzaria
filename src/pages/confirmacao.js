import { router } from "../../script.js";
import { carrinho, delState } from "../models/carrinho.js";
import { adotar, dom } from "../utils/adotar.js";
import { navigate } from "../utils/Router.js";
import { mensagem } from "../utils/whatsapp.js";

export function confirmacao(mPagamento, ul) {
    const classe = "confirmacao";

    limpar(classe);

    const span = dom("span", "", { class: classe });
    const p = dom("p", `Confirmar pagamento com "${mPagamento.toUpperCase()}"`)
    const btn = dom("button", "cancelar");
    const confirma = dom("button", "Confirmar");

    adotar(ul, [adotar(span, [p, btn, confirma])]);

    confirma.addEventListener("click", () => {
        console.log(mensagem(carrinho.resposta()));
         navigate(router, "/");
        console.log("confirma");
        delState();
        span.remove();
    });

    btn.addEventListener("click", () => {
        span.remove();
    })
}

function limpar(classe) {
    let conf = document.getElementsByClassName(classe);

    for (let i = 0; i < conf.length; i++) {
        conf[i].remove();
    }
}


