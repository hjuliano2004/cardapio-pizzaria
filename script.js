import { carrinho } from "./src/models/carrinho.js";
import { renderBordas } from "./src/pages/borda.js";
import { rendCarrinho } from "./src/pages/Carrinho.js";
import { renderHeader } from "./src/pages/header.js";
import { renderListaSabores } from "./src/pages/sabores.js";
import { tipoPizza } from "./src/pages/superior.js";
import { Router } from "./src/utils/Router.js";

export let root = document.getElementById("root");
export let editar = { pizza: 0 };

// Define quais elementos ficam visíveis em cada rota
const routes = {
    "/": () => showElements([renderHeader]),
    "/#sabores": () => showElements([renderListaSabores]),
    "/#carrinho": () => showElements([rendCarrinho]),
    "/#bordas": () => showElements([renderBordas]),
};

export const router = new Router(routes);

// Função que controla visibilidade de múltiplos elementos
function showElements(ids) {

    for (let i = 0; i < ids.length; i++) {
        ids[i]();
    }
}

export function atualizarTipoPizza() {

    tipoPizza.innerText = carrinho.pizzaById(editar.pizza).getTipo();

}
