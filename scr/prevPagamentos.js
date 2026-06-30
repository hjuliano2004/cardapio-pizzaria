import { router } from "../script.js";
import { navigate } from "../utils/Router.js";

let x = document.getElementById("btn-fecha-prev");
let btn = document.getElementById("prevPagamentos");
let divPrevia = document.getElementById("previa");

export function previa() {
    // botão de fechar
    x.addEventListener("click", () => {
        navigate(router, "/")
    });

    // botão que abre
    btn.addEventListener("click", () => {
        navigate(router, "/#previa")
    });

    // clique fora da div
    /*
    window.addEventListener("click", (e) => {
        if (!divPrevia.contains(e.target) && !btn.contains(e.target) && !e.target.contains(divPrevia)) {
            console.log(!e.target.contains(divPrevia))
            navigate(router, "/")
        }
    });*/
}