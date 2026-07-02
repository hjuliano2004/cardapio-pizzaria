import { navigate } from "../utils/Router.js";
import { editar, router } from "../script.js"
import { carrinho } from "./carrinho.js";
import { formatCoins } from "./utils.js";

let listaSabores = [];

let retorno = document.getElementById("retorno_sabores");

export let btn_sabor = document.getElementById("btn_sabor");
let btns_p = document.getElementsByClassName("btn_proximo");
let ul = document.getElementById("sabores_pizza");


function Sabor(nome, preco, ingredientes, num, addf, delf) {

    let cel = document.createElement("div");
    let cel2 = document.createElement("div");
    let li = document.createElement("li");

    let add = document.createElement("button");
    let del = document.createElement("button");
    let dp = document.createElement("p");

    dp.appendChild(num);

    add.innerText = "+";
    del.innerText = "-";

    add.addEventListener("click", () => {
        addf();
    })

    del.addEventListener("click", () => {
        delf();
    })



    let p = document.createElement("h3");
    let valor = document.createElement("p");
    let descricao = document.createElement("p");

    p.innerText = nome;
    valor.innerText = `R$ ${formatCoins(preco)}`;
    valor.classList.add("preco");
    descricao.innerText = ingredientes;
    cel2.classList.add("dp");

    cel.appendChild(p);
    cel.appendChild(descricao);
    cel.appendChild(valor);

    cel2.appendChild(del);
    cel2.appendChild(dp);
    cel2.appendChild(add);




    li.appendChild(cel);
    li.appendChild(cel2);

    return li;
}

function objSabor(nome, preco, tipo, ingredientes) {

    const nomeSabor = nome;
    const precoSabor = preco;
    const ingredientesSabor = ingredientes;
    const tipoSabor = tipo;
    let valor = 0;//TODO: o valor sempre deve representar a quantidade do sabor da pizza atual



    try {
        if (carrinho.pizzaById(editar.pizza).getSabores().filter((sabor) => sabor === nomeSabor).length > 0) {     //TODO lembrar de testar diferentes botões pra 
            valor = carrinho.pizzaById(editar.pizza).getSabores().filter((sabor) => sabor === nomeSabor).length;   //TODOrenderizar a pagina sabores
        }

    }catch(e){
        console.clear();
        console.log(e)
    }

    let num = document.createElement("p");
    num.innerText = `${valor}`;

    let add = () => {

        if (carrinho.pizzaById(editar.pizza).getSabores().length < carrinho.pizzaById(editar.pizza).getMaximo()) {
            valor++;
            num.innerText = `${valor}`;
            carrinho.pizzaById(editar.pizza).getSabores().push(nomeSabor);//TODO: lembrar de transformar "sabor" em objeto com nome e preço
        }



        console.clear();
        console.log(carrinho.pizzaById(editar.pizza).getSabores());
    }

    let del = () => {
        if (valor > 0) {
            valor--;
            num.innerText = `${valor}`;
            let posicao = carrinho.pizzaById(editar.pizza).getSabores().indexOf(nomeSabor);
            carrinho.pizzaById(editar.pizza).getSabores().splice(posicao, 1);
        }

        console.clear();
        console.log(carrinho.pizzaById(editar.pizza).getSabores())//TODO: retirar esses consoles daqui
    }



    return {
        getNome: () => { return nomeSabor },
        getPreco: () => { return precoSabor },
        getIngredientes: () => { return ingredientesSabor },
        getTipo: () => { return tipoSabor },
        html: () => { return Sabor(nomeSabor, precoSabor, ingredientesSabor, num, add, del) }
    }
}

function listagemSabores() {

    listaSabores.push(objSabor("Calabresa", 0, "salgado", "Molho de tomate, mussarela, calabresa e cebola"));
    listaSabores.push(objSabor("Frango com Catupiry", 0, "salgado", "Molho de tomate, mussarela, frango desfiado e catupiry"));
    listaSabores.push(objSabor("Portuguesa", 0, "salgado", "Molho de tomate, mussarela, presunto, ovo, cebola e azeitona"));
    listaSabores.push(objSabor("Quatro Queijos", 0, "salgado", "Molho de tomate, mussarela, catupiry, provolone e parmesão"));
    listaSabores.push(objSabor("Marguerita", 0, "salgado", "Molho de tomate, mussarela, tomate e manjericão"));
    listaSabores.push(objSabor("Chocolate", 3, "doce", "Chocolate ao leite e granulado"));
    listaSabores.push(objSabor("Banana com Canela", 0, "doce", "Banana e canela"));
    listaSabores.push(objSabor("Romeu e Julieta", 4, "doce", "Mussarela e goiabada"));

}

export function rendListaSabores() {

    let ul = document.getElementById("sabores_pizza");

    ul.innerText = "";

    listagemSabores();

    for (let i = 0; i < listaSabores.length; i++) {
        ul.appendChild(listaSabores[i].html());
    }
}



export function paginaSabores() {

    retorno.addEventListener("click", () => {
        navigate(router, "/");
        carrinho.delPizza(editar.pizza);
        ul.innerText = "";
    })

    btn_sabor.addEventListener("click", () => {
        if (carrinho.pizzaById(editar.pizza).getSabores().length > 0) {
            navigate(router, "/#bordas");
        } else { alert("Selecione pelo menos um sabor para prosseguir"); }
    })

    
}