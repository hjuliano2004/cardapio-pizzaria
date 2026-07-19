import { editar, root, router } from "../../script.js";
import { carrinho, sequencia } from "../models/carrinho.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { renderListaSabores } from "./sabores.js";

let listaPizzas = [];

export let ul = document.createElement("ul");
ul.id = "pizzas";

export function rendLista() {

    listaPizzas = [];
    ul.innerHTML = "";
    root.appendChild(ul);

    listaPizzas.push(Pizza("Broto", 4, 1, 30));
    listaPizzas.push(Pizza("Média", 8, 2, 40));
    listaPizzas.push(Pizza("Grande", 12, 3, 50));
    listaPizzas.push(Pizza("Gigante", 16, 4, 60));
    listaPizzas.push(Pizza("Extra Gigante", 20, 4, 70));



    for (let i = 0; i < listaPizzas.length; i++) {
        ul.appendChild(listaPizzas[i]);
    }

}

function Pizza(tipo, qPedacos, qSabores, preco) {

    let li = document.createElement("li");
    let titulo = document.createElement("h2");
    let p = document.createElement("p");
    let valor = document.createElement("p");

    titulo.innerText = tipo;
    p.innerHTML = `${qPedacos} pedaços - ${qSabores} sabores<br><br>`;
    valor.innerText = `A partir de R$ ${formatCoins(preco)}`;
    valor.classList.add("preco");

    li.appendChild(titulo);
    li.appendChild(p);
    li.appendChild(valor);



    li.addEventListener("click", () => {
        let novo = objPizza(tipo, qSabores, preco);
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
        setId: (nId) => { return id = nId},
        getSabores: () => { return sabores },
        setSabores: (nLista) => { return sabores = nLista },
        limpaSabores: () => { sabores = [] },
        getBorda: () => { return borda },
        getPrecoBorda: () => { return precoBorda },
        getIncluido: ()=>{return incluido},
        setIncluido: (n)=>{ return incluido = n},
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