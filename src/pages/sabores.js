import { navigate } from "../utils/Router.js";
import { atualizarTipoPizza, editar, root, router } from "../../script.js"
import { carrinho } from "../models/carrinho.js";
import { formatCoins } from "../utils/utils.js";
import { barraSuperior, btnRetorno, div_carrinho } from "./superior.js";
import { btn_retorno } from "../utils/Retorno.js";
import { atualizarTotal, divProximo, nLi, sectionInferior } from "./inferior.js";
import { Proximo } from "../utils/proximo.js";
import { btn_carrinho } from "./Carrinho.js";




let retorno1 = btn_retorno("/");
let proximo1 = Proximo();


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
    //let valor = document.createElement("p");
    let descricao = document.createElement("p");

    p.innerText = nome;
    //valor.innerText = `R$ ${formatCoins(preco)}`;
    //valor.classList.add("preco");
    descricao.innerText = ingredientes;
    cel2.classList.add("dp");

    cel.appendChild(p);
    cel.appendChild(descricao);
    //cel.appendChild(valor);

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

    } catch (e) {
        //TODO ainda não descobri outro jeito de contornar a excessão sem usar try catch pra evitar quebrar a página
    }

    let num = document.createElement("p");
    num.innerText = `${valor}`;

    let add = () => {

        if (carrinho.pizzaById(editar.pizza).getSabores().length < carrinho.pizzaById(editar.pizza).getMaximo()) {
            valor++;
            num.innerText = `${valor}`;
            carrinho.pizzaById(editar.pizza).getSabores().push(nomeSabor);//TODO: lembrar de transformar "sabor" em objeto com nome e preço

            nLi();
        }
    }

    let del = () => {
        if (valor > 0) {
            valor--;
            num.innerText = `${valor}`;
            let posicao = carrinho.pizzaById(editar.pizza).getSabores().indexOf(nomeSabor);
            carrinho.pizzaById(editar.pizza).getSabores().splice(posicao, 1);
            nLi();
        }

    }



    return {
        getNome: () => { return nomeSabor },
        getPreco: () => { return precoSabor },
        getIngredientes: () => { return ingredientesSabor },
        getTipo: () => { return tipoSabor },
        html: () => { return Sabor(nomeSabor, precoSabor, ingredientesSabor, num, add, del) }
    }
}

function listagemSabores(listaSabores) {

    listaSabores.push(objSabor("Calabresa", 0, "salgado", "Molho de tomate, mussarela, calabresa e cebola"));
    listaSabores.push(objSabor("Frango com Catupiry", 0, "salgado", "Molho de tomate, mussarela, frango desfiado e catupiry"));
    listaSabores.push(objSabor("Portuguesa", 0, "salgado", "Molho de tomate, mussarela, presunto, ovo, cebola e azeitona"));
    listaSabores.push(objSabor("Quatro Queijos", 0, "salgado", "Molho de tomate, mussarela, catupiry, provolone e parmesão"));
    listaSabores.push(objSabor("Marguerita", 0, "salgado", "Molho de tomate, mussarela, tomate e manjericão"));
    listaSabores.push(objSabor("Chocolate", 3, "doce", "Chocolate ao leite e granulado"));
    listaSabores.push(objSabor("Banana com Canela", 0, "doce", "Banana e canela"));
    listaSabores.push(objSabor("Romeu e Julieta", 4, "doce", "Mussarela e goiabada"));

}

export function renderListaSabores() {

    if (carrinho.pizzas.length == 0) { navigate(router, "/"); }

    let sabores_pizza = document.createElement("ul");
    sabores_pizza.id = "sabores_pizza";
    let listaSabores = [];

    listagemSabores(listaSabores);

    for (let i = 0; i < listaSabores.length; i++) {
        sabores_pizza.appendChild(listaSabores[i].html());
    }

    root.innerText = "";
    root.appendChild(barraSuperior);
    root.appendChild(sabores_pizza);
    root.appendChild(sectionInferior);
    btnRetorno.innerText = "";
    btnRetorno.appendChild(retorno1);
    divProximo.innerText = "";
    divProximo.appendChild(proximo1);
    div_carrinho.innerText = "";
    div_carrinho.appendChild(btn_carrinho);
    atualizarTipoPizza();
    atualizarTotal();
    nLi();
}

retorno1.addEventListener("click", () => {
    carrinho.delPizza(editar.pizza);//TODO quando o local storage passar a guardar o estado do carrinho, esse evewnto precisa atualizar lá também
})

proximo1.addEventListener("click", () => {
    if (carrinho.pizzaById(editar.pizza).getSabores().length > 0) {
        navigate(router, "/#bordas");
    } else {
        alert("escolha ao menos 1 sabor")
    }
})