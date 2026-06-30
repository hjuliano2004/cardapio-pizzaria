import { rendLista } from "./pizza.js";
import { carrinho } from "./scr/carrinho.js";
import { horario } from "./scr/horas.js";
import { previa } from "./scr/prevPagamentos.js";
import { paginaSabores } from "./scr/sabores.js";
import { formatCoins } from "./scr/utils.js";
import { Router } from "./utils/Router.js";


export let editar = {pizza: 0};
export let inicio = document.getElementById("inicio");
export let bebidas = document.getElementById("bebidas");
export let sabores = document.getElementById("sabores");
export let totais = document.getElementsByClassName("total");

export function atualizarTotais(){

    let total = carrinho.total();

    for(let i=0;i<totais.length;i++){
        totais[i].innerHTML = `total <span>${formatCoins(total)}</span>`;
    }

}

horario();

previa();

rendLista();

paginaSabores();

    // Define quais elementos ficam visíveis em cada rota
    const routes = {
        "/": () => showElements(["inicio"]),
        "/#sabores": () => showElements(["sabores"]),
        "/#previa": () => showElements(["inicio", "previa"]),
        "/#bebidas": () => showElements(["bebidas"]),

        "/404": () => showElements(["notfound"])
    };

    export const router = new Router(routes);

    // Função que controla visibilidade de múltiplos elementos
    function showElements(ids) {
        document.querySelectorAll(".page").forEach(el => {
            el.style.display = "none";
        });
            for(let i=0;i<ids.length;i++){
                document.getElementById(ids[i]).style.display = "block"
            }
    }

    // Intercepta links
    document.querySelectorAll("a[data-link]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            router.navigate(link.getAttribute("href"));
        });
    });