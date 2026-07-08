import { root, router } from "../../script.js";
import { horario } from "../utils/horas.js";
import { Proximo } from "../utils/proximo.js";
import { navigate } from "../utils/Router.js";
import { btn_carrinho } from "./Carrinho.js";
import { rendLista } from "./pizzas.js";
import { sectionPrevia } from "./previa.js";

// Criar o header
const header = document.createElement("header");
export const comprarMais = maisBtn();

// Imagem de destaque
const imagemDestaque = document.createElement("img");
imagemDestaque.id = "imagem_destaque";
imagemDestaque.src = "./imagens/pizza.png";
header.appendChild(imagemDestaque);

// Título principal
const titulo = document.createElement("h1");
titulo.textContent = "Papadelli";
header.appendChild(titulo);

// Div endereço
const endereco = document.createElement("div");
endereco.id = "endereco";

// Link do Maps
const mapsLink = document.createElement("a");
mapsLink.id = "maps";
mapsLink.href = "https://maps.app.goo.gl/vvwzj1gebsCKTkAu8";
mapsLink.textContent = "Rua Tuiuti, 1270, Iririu, Joinville - SC, 89227-473";
endereco.appendChild(mapsLink);

// Seção interna do header
const sectionHeader = document.createElement("section");
sectionHeader.id = "header";

// Formas de pagamento
const divPagamento = document.createElement("div");
const h4Pagamento = document.createElement("h4");
h4Pagamento.textContent = "formas de pagamento";
const prevPagamentosBtn = document.createElement("button");
prevPagamentosBtn.id = "prevPagamentos";
const cartaoImg = document.createElement("img");
cartaoImg.id = "cartao";
cartaoImg.src = "./imagens/cartao.png";
prevPagamentosBtn.appendChild(cartaoImg);
divPagamento.appendChild(h4Pagamento);
divPagamento.appendChild(prevPagamentosBtn);
sectionHeader.appendChild(divPagamento);

// Estimativa de entrega
const divEntrega = document.createElement("div");
const h4Entrega = document.createElement("h4");
h4Entrega.textContent = "Estimativa de entrega";
const pEntrega = document.createElement("p");
pEntrega.textContent = "30min - 40min";
divEntrega.appendChild(h4Entrega);
divEntrega.appendChild(pEntrega);
sectionHeader.appendChild(divEntrega);

// Estimativa de retirada
const divRetirada = document.createElement("div");
const h4Retirada = document.createElement("h4");
h4Retirada.textContent = "Estimativa de retirada";
const pRetirada = document.createElement("p");
pRetirada.textContent = "30min";
divRetirada.appendChild(h4Retirada);
divRetirada.appendChild(pRetirada);
sectionHeader.appendChild(divRetirada);

// Espaço vazio
const divVazio = document.createElement("div");
sectionHeader.appendChild(divVazio);

// Funcionamento
const divFuncionamento = document.createElement("div");
export const h4Funcionamento = document.createElement("h4");
h4Funcionamento.textContent = "Funcionamento";
divFuncionamento.appendChild(h4Funcionamento);
divFuncionamento.append("terça - domingo");
const pFuncionamento = document.createElement("p");
pFuncionamento.id = "funcionamento";
divFuncionamento.appendChild(pFuncionamento);
sectionHeader.appendChild(divFuncionamento);

// Adicionar section dentro do endereço
endereco.appendChild(sectionHeader);

// Adicionar endereço dentro do header
header.appendChild(endereco);

export const divCarrinhoHeader = document.createElement("div");
divCarrinhoHeader.id = "divCarrinhoHeader";

header.appendChild(divCarrinhoHeader);

prevPagamentosBtn.addEventListener("click", () => {
    sectionPrevia.style.display = "block";
})

export function renderHeader() {
    root.innerText = "";
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