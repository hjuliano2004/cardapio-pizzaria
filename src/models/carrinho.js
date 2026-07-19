import { editar } from "../../script.js";
import { objPizza } from "../pages/pizzas.js";


let sequence = { valor: setSequence()};

function setSequence() {
    let load = localStorage.getItem("sequence");
    if(!load){return 0}
    return load;
}

export function sequencia() {
    sequence.valor++;
    return sequence.valor;
}//----------------------------------------------------------------


function dtLista() {
    let string = "pizzas";

    let lista = JSON.parse(localStorage.getItem(string));

    if (!lista) {
        localStorage.setItem(string, JSON.stringify([]));
        return [];
    }

    let lista2 = [];
    for (let i = 0; i < lista.length; i++) {
        let posicao = lista[i];

        let pizza = objPizza(posicao.tipo, posicao.qSabores, posicao.preco);
        pizza.setBorda({ sabor: posicao.borda, preco: posicao.precoBorda });
        pizza.setSabores(posicao.sabores);
        pizza.setIncluido(posicao.incluido);

        lista2.push(pizza);
    }

    return lista2;
}



export function saveState() {
    let pizzas = carrinho.pizzas;
    let listaPizzas = [];
    for (let i = 0; i < pizzas.length; i++) {
        listaPizzas.push(pizzas[i].getAnotacao());
    }

    localStorage.setItem("pizzas", JSON.stringify(listaPizzas));
    localStorage.setItem("sequence", sequence.valor);
    localStorage.setItem("editar.pizza", editar.pizza);
}

export function delState(){
    localStorage.removeItem("pizzas");
    localStorage.removeItem("sequence");
}


export let carrinho = {
    pizzas: dtLista(),
    bebidas: [],

    total: () => {
        let soma = 0;

        for (let i = 0; i < carrinho.pizzas.length; i++) {
            soma += carrinho.pizzas[i].getPreco();
        }

        for (let i = 0; i < carrinho.bebidas.length; i++) {
            soma += carrinho.bebidas[i].getPreco();
        }

        return soma;

    },

    pizzaById: (id) => {
        for (let i = 0; i < carrinho.pizzas.length; i++) {
            if (carrinho.pizzas[i].getId() === id) {
                return carrinho.pizzas[i];
            }
        }

        return null;

    },

    posicaoPizza: (id) => {
        for (let i = 0; i < carrinho.pizzas.length; i++) {
            if (carrinho.pizzas[i].getId() === id) {
                return i;
            }
        }
    },

    delPizza: (id) => {

        for (let i = 0; i < carrinho.pizzas.length; i++) {

            if (carrinho.pizzas[i].getId() == id) {
                carrinho.pizzas.splice(i, 1);
                return null;
            }

        }

    },

    delBebida: (id) => {
        for (let i = 0; i < carrinho.bebidas.length; i++) {
            if (carrinho.bebidas[i].getId() === id) {
                carrinho.bebidas.splice(i, 1);
            }
        }
    }
}

