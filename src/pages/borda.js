import { atualizarTipoPizza, editar, root, router } from "../../script.js";
import { carrinho, saveState } from "../models/carrinho.js";
import { Proximo } from "../utils/proximo.js";
import { btn_retorno } from "../utils/Retorno.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { btn_carrinho } from "./Carrinho.js";
import { atualizarTotal, divProximo, nLi, sectionInferior } from "./inferior.js";
import { barraSuperior, btnRetorno, div_carrinho } from "./superior.js";

let retorno = btn_retorno("/#sabores");
let proximo = Proximo();

let bordas = [];

function bordaHtml(value, preco, escolhido) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    let input = document.createElement("input");
    let p = document.createElement("p");
    let div = document.createElement("div");


    input.type = "radio";
    input.name = "borda";
    //input.id = value;
    input.value = value;

    label.innerText = value;
    //label.htmlFor = value;

    p.innerText = `R$${formatCoins(preco)}`;
    p.classList.add("preco");

    input.checked = escolhido;


    div.appendChild(label);
    div.appendChild(p)
    li.appendChild(div);
    li.appendChild(input);

    li.addEventListener("click", () => {
        {

            input.checked = !input.checked;
            carrinho.pizzaById(editar.pizza).setBorda({ sabor: value, preco: preco });

            if (!input.checked) {
                carrinho.pizzaById(editar.pizza).setBorda({ sabor: null, preco: 0 })
            }

            atualizarTotal();
        }
    })

    return li;
}

function borda(sabor, tipo, preco) {
    const gosto = sabor;
    const valor = preco;
    const type = tipo;

    let escolhido = false;



    try {
        if (carrinho.pizzaById(editar.pizza).getBorda() === gosto) { escolhido = true }
    } catch (error) {
        navigate(router, "/")
    }

    return {
        getPreco: () => { return valor },
        getTipo: () => { return type },
        getSabor: () => { return gosto },
        getCorpo: () => { return { sabor: gosto, preco: valor } },

        html: () => { return bordaHtml(gosto, valor, escolhido) }

        //setEscolhido: (nValor) => { return escolhido = nValor },
        //getEscolhido: () => { return escolhido }
    }

}

function listagem() {
    bordas.push(borda("sem borda", null, 0));
    bordas.push(borda("chocolate", "doce", 8));
    bordas.push(borda("catupiry", "salgado", 5));
    bordas.push(borda("cheddar", "salgado", 6));
    bordas.push(borda("goiabada", "doce", 7));
    bordas.push(borda("cream cheese", "salgado", 9));
    bordas.push(borda("doce de leite", "doce", 8));
    bordas.push(borda("quatro queijos", "salgado", 10));
    bordas.push(borda("nutella", "doce", 12));
}

function lista() {
    bordas = [];
    listagem();

    let ul = document.createElement("ul");
    ul.id = "lista_bordas"

    for (let i = 0; i < bordas.length; i++) {
        ul.appendChild(bordas[i].html())

    }

    root.appendChild(ul);
}


export function renderBordas() {

    if (carrinho.pizzas.length == 0) { navigate(router, "/"); }

    root.innerText = "";
    root.appendChild(barraSuperior);
    root.appendChild(sectionInferior);

    btnRetorno.innerText = "";
    btnRetorno.appendChild(retorno);

    divProximo.innerText = "";
    divProximo.appendChild(proximo);
    div_carrinho.innerText = "";
    div_carrinho.appendChild(btn_carrinho);
    lista();
    atualizarTipoPizza();
    atualizarTotal();
    nLi();
}

proximo.addEventListener("click", () => {

    navigate(router, "/#carrinho");
    saveState();
    if (!carrinho.pizzaById(editar.pizza).getBorda()) {
        carrinho.pizzaById(editar.pizza).setBorda({ sabor: "sem borda", preco: 0 });
    }

})