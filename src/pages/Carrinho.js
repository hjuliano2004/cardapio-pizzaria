import { editar, root, router } from "../../script.js";
import { carrinho, saveState } from "../models/carrinho.js";
import { adotar, dom } from "../utils/adotar.js";
import { Proximo } from "../utils/proximo.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { comprarMais } from "./header.js";
import { atualizarTotal, divProximo, listaInferior, sectionInferior } from "./inferior.js";
import { objPizza } from "./pizzas.js";
import { barraSuperior, btnRetorno, div_carrinho, tipoPizza } from "./superior.js";

let section = document.createElement("section");
let ul = document.createElement("ul");
export const btn_carrinho = BtnCarrinho();
ul.id = "pizza_carrinho";
ul.classList.add("carrinho");
section.appendChild(ul);
section.classList.add("carrinho")

const pagamento = Proximo();

function posicao(pizza) {
    const li = dom("li", "", { class: "sabores_carrinho" });

    const div = dom("div", "", { style: "width:70%" });
    const div2 = dom("div", "", { class: "dp_carrinho" });

    const tamanho = dom("h3", pizza.getTipo());
    const sabores = listaSabores(pizza);

    const borda = dom("div", `Borda: ${pizza.getBorda()} `, { class: "borda" });
    const precoBorda = dom("spam", `R$ ${formatCoins(pizza.getPrecoBorda())}`, { class: "preco" });
    adotar(borda, [precoBorda]);

    const preco = dom("spam", `R$ ${formatCoins(pizza.getPreco())}`, { class: "preco" });

    // Botões de ação
    adotar(div2, [clonagem(pizza), excluir(pizza), edit(pizza)]);

    // Monta div principal
    adotar(div, [tamanho, sabores, borda, preco]);

    // Monta li
    adotar(li, [div, div2]);

    // Adiciona ao ul
    adotar(ul, [li]);
}


function clonagem(pizza) {
    let btn = document.createElement("button");
    btn.innerText = "+";


    btn.addEventListener("click", () => {

        let sabores = [];

        for (let i = 0; i < pizza.getSabores().length; i++) {
            sabores.push(pizza.getSabores()[i]);
        }

        let nova = objPizza(pizza.getTipo(), pizza.getMaximo(), pizza.getPrecoBase());
        nova.setSabores(sabores);
        nova.setBorda({ sabor: pizza.getBorda(), preco: pizza.getPrecoBorda() });
        nova.setIncluido(true);
        carrinho.pizzas.push(nova);
        visualizacao();
        atualizarTotal();
        saveState();
    })

    return btn;
}

function edit(pizza) {

    let btn = document.createElement("button");
    btn.classList.add("editar");

    // Insere o SVG dentro do botão
    btn.innerHTML = `
    <svg class="retorno" xmlns="http://www.w3.org/2000/svg"
         fill="currentColor" class="bi bi-arrow-counterclockwise"
         viewBox="0 0 16 16">
      <path fill-rule="evenodd"
        d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
      <path
        d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
    </svg>
  `;

    btn.addEventListener("click", () => {
        editar.pizza = pizza.getId();
        navigate(router, "/#sabores");
    })


    return btn;
}

function excluir(pizza) {
    const btn = dom("button", "", { class: "btn_retorno" });

    // SVG direto no botão
    btn.innerHTML = `
      <svg id="lixo" xmlns="http://www.w3.org/2000/svg"
           fill="currentColor" class="bi bi-trash"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>
    `;

    btn.addEventListener("click", () => {
        carrinho.delPizza(pizza.getId());
        visualizacao();
        atualizarTotal();
        saveState();
    });

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

pagamento.addEventListener('click', ()=>{

    if(!carrinho.total()){return null}

    navigate(router,"/#retirada");//TODO precisa levar pra pagina de escolhas
})




function visualizacao() {

    ul.innerText = "";

    for (let i = 0; i < carrinho.pizzas.length; i++) {
        posicao(carrinho.pizzas[i]);
    }
}


export function rendCarrinho() {

    revisa();

    root.innerText = "";
    root.appendChild(barraSuperior);
    root.appendChild(section);
    root.appendChild(sectionInferior);
    tipoPizza.innerText = "";
    btnRetorno.innerText = "";
    listaInferior.innerText = "";
    divProximo.innerText = "";
    divProximo.appendChild(pagamento);
    div_carrinho.innerText = "";
    div_carrinho.appendChild(comprarMais);
    visualizacao();
    atualizarTotal();
    saveState();
}

function revisa() {
    for (let i = 0; i < carrinho.pizzas.length; i++) {
        if (carrinho.pizzas[i].getSabores().length == 0 || !carrinho.pizzas[i].getBorda()) {
            carrinho.delPizza(carrinho.pizzas[i].getId())
        }
    }
}



function BtnCarrinho() {
    let btn = document.createElement("button");

    btn.innerHTML = `
        <svg class="retorno" xmlns="http://www.w3.org/2000/svg"
         fill="currentColor" class="bi bi-cart"
         viewBox="0 0 16 16">
      <path fill-rule="evenodd"
        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
    </svg>
    `

    btn.addEventListener("click", () => {
        navigate(router, "/#carrinho");
    })

    return btn;
}