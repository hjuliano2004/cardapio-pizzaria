import { root, router } from "../../script.js";
import { adotar, dom } from "../utils/adotar.js";
import { horario } from "../utils/horas.js";
import { Proximo } from "../utils/proximo.js";
import { navigate } from "../utils/Router.js";
import { btn_carrinho } from "./Carrinho.js";
import { rendLista } from "./pizzas.js";
import { sectionPrevia } from "./previa.js";

// Criar o header
const header = dom("header");
export const comprarMais = maisBtn();

// Imagem de destaque
const imagemDestaque = dom("img", "", { id: "imagem_destaque", src: "./imagens/pizza.png" });
const titulo = dom("h1", "Papadelli");

// Div endereço
const mapsLink = dom("a", "Rua Tuiuti, 1270, Iririu, Joinville - SC, 89227-473", {
    id: "maps",
    href: "https://maps.app.goo.gl/vvwzj1gebsCKTkAu8"
});
const endereco = dom("div", "", { id: "endereco" });
adotar(endereco, [mapsLink]);

// Seção interna do header
const sectionHeader = dom("section", "", { id: "header" });

// Formas de pagamento
const h4Pagamento = dom("h4", "formas de pagamento");
const cartaoImg = dom("img", "", { id: "cartao", src: "./imagens/cartao.png" });
const prevPagamentosBtn = dom("button", "", { id: "prevPagamentos" });
adotar(prevPagamentosBtn, [cartaoImg]);
const divPagamento = dom("div");
adotar(divPagamento, [h4Pagamento, prevPagamentosBtn]);

// Estimativa de entrega
const divEntrega = dom("div");
adotar(divEntrega, [dom("h4", "Estimativa de entrega"), dom("p", "30min - 40min")]);

// Estimativa de retirada
const divRetirada = dom("div");
adotar(divRetirada, [dom("h4", "Estimativa de retirada"), dom("p", "30min")]);

// Espaço vazio
const divVazio = dom("div");

// Funcionamento
export const h4Funcionamento = dom("h4", "Funcionamento");
const pFuncionamento = dom("p", "", { id: "funcionamento" });
const divFuncionamento = dom("div");
adotar(divFuncionamento, [h4Funcionamento, dom("p", "terça - domingo"), pFuncionamento]);

// Monta sectionHeader
adotar(sectionHeader, [divPagamento, divEntrega, divRetirada, divVazio, divFuncionamento]);

// Adicionar section dentro do endereço
adotar(endereco, [sectionHeader]);

// Adicionar endereço dentro do header
adotar(header, [imagemDestaque, titulo, endereco]);

// Div carrinho header
export const divCarrinhoHeader = dom("div", "", { id: "divCarrinhoHeader" });
adotar(header, [divCarrinhoHeader]);


prevPagamentosBtn.addEventListener("click", () => {
    sectionPrevia.style.display = "block";
})

export function renderHeader() {
    root.innerText = "";
    sectionPrevia.style.display = "none";
    root.appendChild(sectionPrevia);
    root.appendChild(header);
    divCarrinhoHeader.appendChild(btn_carrinho);

    horario();
    rendLista();
}



function maisBtn(){
    let btn = document.createElement("button");
    btn.id = "comprarMais"

    btn.innerText = "Comprar +"

    btn.addEventListener("click", ()=>{
        navigate(router, "/");

    })


    return btn;
}