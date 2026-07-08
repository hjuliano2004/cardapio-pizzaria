import { editar } from "../../script.js";
import { carrinho } from "../models/carrinho.js";
import { formatCoins } from "../utils/utils.js";

// Criar a section principal
export const sectionInferior = document.createElement("section");
sectionInferior.style.zIndex = 1000;
sectionInferior.id = "inferior";
sectionInferior.className = "inferior";

// Lista vazia
export const listaInferior = document.createElement("ul");
listaInferior.className = "lista";
sectionInferior.appendChild(listaInferior);

// Div base
const divBase = document.createElement("div");
divBase.className = "base";

// Parágrafo total
export const pTotal = document.createElement("p");
pTotal.className = "total";
pTotal.textContent = "total";

// Botão próximo
export const divProximo = document.createElement("div");

// Montar div base
divBase.appendChild(pTotal);
divBase.appendChild(divProximo);

// Adicionar div base à section
sectionInferior.appendChild(divBase);



export function atualizarTotal() {

    let total = carrinho.total();

    pTotal.innerHTML = `total: <span class="preco">${formatCoins(total)}</span>`;
}

export function nLi() {

    listaInferior.innerText = "";

    let pizza = carrinho.pizzaById(editar.pizza);

    for (let i = 0; i < pizza.getSabores().length; i++) {
        let li = document.createElement("li");
        li.innerText = pizza.getSabores()[i];

        listaInferior.appendChild(li);
    }
}