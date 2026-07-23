import { carrinho, delState, sequencia } from "./src/models/carrinho.js";
import { limpaEndereco } from "./src/models/endereco.js";
import { rendBebidas } from "./src/pages/bebidas.js";
import { renderBordas } from "./src/pages/borda.js";
import { rendCarrinho } from "./src/pages/Carrinho.js";
import { renderformEndereco } from "./src/pages/Endereco.js";
import { renderHeader } from "./src/pages/header.js";
import { pagamento } from "./src/pages/pagamento.js";
import { rendPizzas } from "./src/pages/pizzas.js";
import { retirada } from "./src/pages/retirada.js";
import { renderListaSabores } from "./src/pages/sabores.js";
import { tipoPizza } from "./src/pages/superior.js";
import { navigate, Router } from "./src/utils/Router.js";

export let root = document.getElementById("root");
export let editar = { pizza: localStorage.getItem("editar.pizza") };

// Define quais elementos ficam visíveis em cada rota
const routes = {
    "/": () => showElements([renderHeader]),
    "/#sabores": () => showElements([renderListaSabores]),
    "/#carrinho": () => showElements([rendCarrinho]),
    "/#bordas": () => showElements([renderBordas]),
    "/#retirada": () => showElements([retirada]),
    "/#pagamento": () => showElements([pagamento]),
    "/#bebidas": () => showElements([rendBebidas]),
    "/#pizzas": () => showElements([rendPizzas]),
    "/#endereco": () => showElements([renderformEndereco]),
};

export const router = new Router(routes);

// Função que controla visibilidade de múltiplos elementos
function showElements(ids) {

    for (let i = 0; i < ids.length; i++) {
        ids[i]();
    }
}

export function atualizarTipoPizza() {

    try {
        tipoPizza.innerText = carrinho.pizzaById(editar.pizza).getTipo();
    } catch (e) {
        navigate(router, "/")
    }


}
