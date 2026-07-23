import { editar } from "../../script.js";
import { carrinho } from "../models/carrinho.js";
import { adotar, dom } from "../utils/adotar.js";
import { formatCoins } from "../utils/utils.js";

// Criar a section principal
export const sectionInferior = dom("section", "", { 
    id: "inferior", 
    class: "inferior", 
    style: "z-index:1000" 
});

// Lista vazia
export const listaInferior = dom("ul", "", { class: "lista" });
adotar(sectionInferior, [listaInferior]);

// Div base
const divBase = dom("div", "", { class: "base" });

// Parágrafo total
export const pTotal = dom("p", "total", { class: "total" });

// Botão próximo (div container)
export const divProximo = dom("div");

// Montar div base
adotar(divBase, [pTotal, divProximo]);

// Adicionar div base à section
adotar(sectionInferior, [divBase]);

// Função atualizar total
export function atualizarTotal() {
    let total = carrinho.total();
    pTotal.innerHTML = `total: <span class="preco">${formatCoins(total)}</span>`;
}

// Função para listar sabores
export function nLi() {
    listaInferior.innerText = "";

    let pizza = carrinho.pizzaById(editar.pizza);

    for (let sabor of pizza.getSabores()) {
        let li = dom("li", sabor);
        adotar(listaInferior, [li]);
    }
}
