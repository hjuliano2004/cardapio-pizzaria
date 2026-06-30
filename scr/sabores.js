import { navigate } from "../utils/Router.js";
import { editar, router } from "../script.js"
import { carrinho } from "./carrinho.js";

let listaSabores = [];

let retorno = document.getElementById("retorno_sabores");
export let tipo_pizza = document.getElementById("tipo_pizza");



export function paginaSabores() {

    retorno.addEventListener("click", () => {
        navigate(router, "/");
        carrinho.delPizza(editar.pizza);
    })
}

export function atlTipoPizza(){
    tipo_pizza.innerText = carrinho.pizzas[editar.pizza].getTipo();
}