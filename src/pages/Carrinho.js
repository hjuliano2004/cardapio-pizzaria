import { root, router } from "../../script.js";
import { carrinho } from "../models/carrinho.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { atualizarTotal, divProximo, listaInferior, sectionInferior } from "./inferior.js";

let ul = document.createElement("ul");
ul.id = "pizza_carrinho";
ul.classList.add("carrinho")

function posicao(pizza) {

    let li = document.createElement("li");
    li.classList.add("sabores_carrinho");

    let div = document.createElement("div");
    let div2 = document.createElement("div");

    let tamanho = document.createElement("h3");
    let sabores = listaSabores(pizza);
    let borda = document.createElement("div");
    let preco = document.createElement("spam");

    preco.classList.add("preco");

    tamanho.innerText = pizza.getTipo();

    borda.innerHTML = `Borda: ${pizza.getBorda()} <spam class="preco">R$ ${formatCoins(pizza.getPrecoBorda())}</spam>`;


    preco.innerText = `R$ ${formatCoins(pizza.getPreco())}`;


    div2.appendChild(clonagem(pizza));
    div2.appendChild(excluir(pizza));
    div2.classList.add("dp_carrinho");
    div.style.width = "70%";

    borda.classList.add("borda");

    div.appendChild(tamanho);
    div.appendChild(sabores);
    div.appendChild(borda);
    div.appendChild(preco);


    li.appendChild(div);
    li.appendChild(div2);

    ul.appendChild(li)
}

function clonagem(pizza) {
    let btn = document.createElement("button");
    btn.innerText = "+";

    btn.addEventListener("click", () => {
        console.log(carrinho.pizzas)

    })

    return btn;
}

function excluir(pizza) {

    let btn = document.createElement("button");

    const svgRetorno = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgRetorno.classList.add("bi", "bi-trash");
    svgRetorno.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgRetorno.setAttribute("fill", "currentColor");
    svgRetorno.setAttribute("viewBox", "0 0 16 16");
    svgRetorno.id = "lixo"

    // Paths do SVG
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("fill-rule", "evenodd");
    path1.setAttribute("d", "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("fill-rule", "evenodd");
    path2.setAttribute("d", "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z");

    svgRetorno.appendChild(path1);
    svgRetorno.appendChild(path2);

    btn.appendChild(svgRetorno);
    btn.classList.add("btn_retorno");

    btn.addEventListener("click", () => {
        carrinho.delPizza(pizza.getId());
        visualizacao();
        atualizarTotal();
    })

    return btn;

}



function listaSabores(pizza) {

    let lista = pizza.getSabores();

    let sabores = document.createElement("ul");

    for (let i = 0; i < lista.length; i++) {
        let li = document.createElement("li");
        li.innerText = lista[i];
        sabores.appendChild(li);
    }

    return sabores;
}




function visualizacao() {

    ul.innerText = "";

    for (let i = 0; i < carrinho.pizzas.length; i++) {
        posicao(carrinho.pizzas[i]);
    }
}


export function rendCarrinho() {

    if (carrinho.pizzas.length == 0) { navigate(router, "/") }

    root.innerText = "";
    root.appendChild(ul);
    root.appendChild(sectionInferior);
    listaInferior.innerText = "";
    visualizacao();
    divProximo.innerText = "";
}