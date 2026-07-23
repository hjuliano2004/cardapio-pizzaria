import { editar } from "../../script.js";
import { objPizza } from "../pages/pizzas.js";
import { retirada } from "../pages/retirada.js";
import { listaBebidas } from "./bebida.js";
import { endereco } from "./endereco.js";


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
    localStorage.setItem("retirada", JSON.stringify(carrinho.retirada))

}

function loadRetirada(){
    let retirada = JSON.parse(localStorage.getItem("retirada"));
    if(!retirada){return {metodo: null, acressimo: 0}}
    return retirada;
}

export function delState(){
    localStorage.removeItem("pizzas");
    //localStorage.removeItem("bebidas");
    localStorage.removeItem("sequence");
    localStorage.removeItem("editar.pizza");
    localStorage.removeItem("retirada");

    carrinho.pizzas = dtLista();
    carrinho.bebidas = [];
    carrinho.etirada = loadRetirada();
    carrinho.pagamento = null;
}


export let carrinho = {
    pizzas: dtLista(),
    bebidas: listaBebidas(),
    retirada: loadRetirada(),
    pagamento: null,
    resposta: ()=>{
        return {
            pizzas: (()=>{
                let listaPizzas = [];

                for(let i=0; i<carrinho.pizzas.length;i++){
                    listaPizzas.push(carrinho.pizzas[i].getAnotacao());
                }
                return listaPizzas;
            })(),

            bebidas: carrinho.bebidas,
            retirada: carrinho.retirada,
            pagamento: carrinho.pagamento,
            total: carrinho.total(),
            endereco: endereco
        }

    },

    total: () => {
        let soma = 0;

        for (let i = 0; i < carrinho.pizzas.length; i++) {
            soma += carrinho.pizzas[i].getPreco();
        }

        for (let i = 0; i < carrinho.bebidas.length; i++) {
            soma += carrinho.bebidas[i].getPreco();
        }

        soma += carrinho.retirada.acressimo;

        return soma;

    },

    setRetirada: (nRetirada)=>{
        carrinho.retirada.metodo = nRetirada.metodo;
        carrinho.retirada.acressimo = nRetirada.acressimo;
        return carrinho.retirada;
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

