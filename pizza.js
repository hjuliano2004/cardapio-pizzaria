let ul = document.getElementById("pizzas");
import { carrinho, sequence } from "./scr/carrinho.js";
import { esconde, mostra } from "./scr/utils.js";
import { bebidas, editar, inicio, sabores } from "./script.js";
let listaPizzas = [];

export function rendLista() {

    Pizza("Broto", 4, 1, "30,00");
    Pizza("Média", 8, 2, "40,00");
    Pizza("Grande", 12, 3, "50,00");
    Pizza("Gigante", 16, 4, "60,00");
    Pizza("Extra Gigante", 20, 4, "70,00");

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
    valor.innerText = `A partir de R$ ${preco}`;
    valor.classList.add("preco");

    li.appendChild(titulo);
    li.appendChild(p);
    li.appendChild(valor);

    listaPizzas.push(li);

    li.addEventListener("click", (e) => {
        let novo = objPizza(tipo, qSabores, preco);
        carrinho.pizzas.push(novo);
        esconde([inicio, bebidas]);
        mostra([sabores]);
        editar.pizza = novo.getId();
    })
}

function objPizza(tipo, qSabores, valor) {

    const type = tipo;
    const quantidade = qSabores;//quantidade de sabores possivel
    let preco = valor;//preço base da pizza
    let sabores = [];
    let borda = "";
    let precoBorda = 0;
    const id = sequence.valor++;

    return {
        getTipo: () => { return type },
        getMaximo: () => { return quantidade },
        getPreco: () => { return preco + precoBorda },
        getId: () => { return id },
        getSabores: () => { return sabores },
        limpaSabores: () => { sabores = [] },
        setBorda: (nborda) => {
            borda = nborda.sabor;
            precoBorda = nborda.preco;
        },
        getJson: () => {
            let json = {
                tipo: type,
                preço: `R$${preco}`,
                borda: `${borda}, $${precoBorda}`,
                sabores: sabores
            }

            return JSON.stringify(json);
        }

    }
}