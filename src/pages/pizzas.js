import { editar, root, router } from "../../script.js";
import { carrinho, sequencia } from "../models/carrinho.js";
import { adotar, dom } from "../utils/adotar.js";
import { btn_retorno } from "../utils/Retorno.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { renderListaSabores } from "./sabores.js";
import { barraSuperior, btnRetorno, tipoPizza } from "./superior.js";

let listaPizzas = [];


const retorno = btn_retorno("/");
const section = dom("section");

export function rendPizzas() {
   // limpa();
    const ul = dom("ul", "", { class: "pizzas" });

    listaPizzas = [];
    root.innerHTML = "";
    btnRetorno.innerText = "";
    tipoPizza.innerText = "Pizzas"
    adotar(section, [barraSuperior, ul]);
    adotar(btnRetorno, [retorno]);
    adotar(root, [section]);

    listaPizzas.push(Pizza("Broto", 4, 1, 30));
    listaPizzas.push(Pizza("Média", 8, 2, 40));
    listaPizzas.push(Pizza("Grande", 12, 3, 50));
    listaPizzas.push(Pizza("Gigante", 16, 4, 60));
    listaPizzas.push(Pizza("Extra Gigante", 20, 4, 70));



    for (let i = 0; i < listaPizzas.length; i++) {
        ul.appendChild(listaPizzas[i]);
    }

}

function limpa() {
    let ul = document.getElementsByClassName("pizzas");

    for (let i = 0; i < ul.length; i++) {
        ul[i].remove();
    }
}


export function Pizza(tipo, qPedacos, qSabores, preco) {
    const li = dom("li");

    const titulo = dom("h2", tipo);
    const p = dom("p", `${qPedacos} pedaços - ${qSabores} sabores`);
    const valor = dom("p", `A partir de R$ ${formatCoins(preco)}`, { class: "preco" });

    adotar(li, [titulo, p, valor]);

    li.addEventListener("click", () => {
        const novo = objPizza(tipo, qSabores, preco);
        carrinho.pizzas.push(novo);
        navigate(router, "/#sabores");
        editar.pizza = novo.getId();
    });

    return li;
}



export function objPizza(tipo, qSabores, valor) {

    const type = tipo;
    const quantidade = qSabores;//quantidade de sabores possivel
    const preco = valor;//preço base da pizza
    let sabores = [];
    let borda = null;
    let precoBorda = 0;
    let id = sequencia();
    let incluido = false;

    return {
        getTipo: () => { return type },
        getMaximo: () => { return quantidade },
        getPreco: () => { return preco + precoBorda },
        getPrecoBase: () => { return preco },
        getId: () => { return id },
        setId: (nId) => { return id = nId },
        getSabores: () => { return sabores },
        setSabores: (nLista) => { return sabores = nLista },
        limpaSabores: () => { sabores = [] },
        getBorda: () => { return borda },
        getPrecoBorda: () => { return precoBorda },
        getIncluido: () => { return incluido },
        setIncluido: (n) => { return incluido = n },
        setBorda: (nborda) => {
            borda = nborda.sabor;
            precoBorda = nborda.preco;
        },
        getAnotacao: () => {
            let json = {
                id: id,
                tipo: type,
                preco: preco,
                borda: borda,
                precoBorda: precoBorda,
                sabores: sabores,
                qSabores: quantidade,
                incluido: incluido
            }

            return json;
        }

    }
}