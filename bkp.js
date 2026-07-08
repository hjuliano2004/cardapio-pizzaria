import { rendLista } from "./pizza.js";
import { carrinho } from "./scriptsanteriores/carrinho.js";
import { horario } from "./scriptsanteriores/horas.js";
import { previa } from "./scriptsanteriores/prevPagamentos.js";
import { paginaSabores } from "./src/pages/sabores.js";
import { formatCoins } from "./scriptsanteriores/utils.js";
import { Router } from "./utils/Router.js";



export let inicio = document.getElementById("inicio");
export let bebidas = document.getElementById("bebidas");
export let sabores = document.getElementById("sabores");
export let totais = document.getElementsByClassName("total");
export let tipo_pizza = document.getElementsByClassName("tipo_pizza");

let listas = document.getElementsByClassName("lista");

export let editar = { pizza: 0 };
export let txt = "";

export function atualizarTotais(item = "") {

    txt = txt + item;


    let total = carrinho.total();

    for (let i = 0; i < totais.length; i++) {
        totais[i].innerHTML = `total <span>${formatCoins(total)}</span>`;
    }

    for (let i = 0; i < listas.length; i++) {
        listas[i].innerHTML = txt;
    }
}

export function atualizarTipoPizza() {
    for (let i = 0; i < tipo_pizza.length; i++) {
        tipo_pizza[i].innerText = carrinho.pizzaById(editar.pizza).getTipo();
    }
}



// Define quais elementos ficam visíveis em cada rota
const routes = {
    "/": () => showElements(["inicio"]),
    "/#previa": () => showElements(["inicio", "previa"]),
    "/#sabores": () => showElements(["sabores"]),
    "/#bordas": () => showElements(["bordas"]),
    "/#bebidas": () => showElements(["bebidas"]),

    "/404": () => showElements(["notfound"]),
    "/#404": () => showElements(["notfound"])
};

export const router = new Router(routes);

// Função que controla visibilidade de múltiplos elementos
function showElements(ids) {
    document.querySelectorAll(".page").forEach(el => {
        el.style.display = "none";
    });
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).style.display = "block";
    }
}

/* Intercepta links
document.querySelectorAll("a[data-link]").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        router.navigate(link.getAttribute("href"));
    });
});*/



horario();

previa();

rendLista();

paginaSabores();