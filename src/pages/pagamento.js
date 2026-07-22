import { root, router } from "../../script.js";
import { carrinho } from "../models/carrinho.js";
import { adotar, dom, domNs } from "../utils/adotar.js";
import { btn_retorno } from "../utils/Retorno.js";
import { navigate } from "../utils/Router.js";
import { mensagem } from "../utils/whatsapp.js";
import { confirmacao } from "./confirmacao.js";
import { atualizarTotal, divProximo, sectionInferior } from "./inferior.js";
import { formas } from "./previa.js";
import { barraSuperior, btnRetorno } from "./superior.js";

const retorno = btn_retorno("/#retirada");

function metodos() {
    const section = dom("section", "", { id: "pagamento" });
    const ul = dom("ul", "", { id: "lista-pagamentos" });

    adotar(ul, [lDinheiro(ul)]);
    listagem(ul);

    return adotar(section, [ul]);
}

function listagem(ul) {

    for (let i = 0; i < formas.length; i++) {

        let li = dom("li", "");

        let img = dom("img", "", { src: formas[i].src });
        let p = dom("p", formas[i].texto);

        adotar(ul, [
            adotar(li, [img, p])
        ])

        acao(li, formas[i].texto, ul);

    }
}

function lDinheiro(ul) {

    const liDinheiro = dom("li");

    const svgDinheiro = domNs("http://www.w3.org/2000/svg", "svg", "", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 512",
        fill: "green"
    });
    const pathDinheiro = domNs("http://www.w3.org/2000/svg", "path", "", {
        d: "M64 96C28.7 96 0 124.7 0 160V352c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H64zm0 48h512c8.8 0 16 7.2 16 16V352c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V160c0-8.8 7.2-16 16-16zm256 32a80 80 0 1 0 0 160 80 80 0 1 0 0-160z"
    });

    adotar(svgDinheiro, [pathDinheiro]);
    adotar(liDinheiro, [svgDinheiro, dom("p", "Dinheiro")]);


    acao(liDinheiro, "Dinheiro", ul);

    return liDinheiro;
}

function acao(li, mPagamento, ul) {

    //if (texto == "Pix") {

     //   return null;
    //}

    li.addEventListener("click", () => {

        carrinho.pagamento = mPagamento;
        confirmacao(mPagamento, ul);

    });

    

}


export function pagamento() {
    root.innerText = ""


    adotar(root, [barraSuperior, metodos(), sectionInferior]);
    btnRetorno.innerText = "";
    adotar(btnRetorno, [retorno]);
    atualizarTotal();
    divProximo.innerText = "";

}