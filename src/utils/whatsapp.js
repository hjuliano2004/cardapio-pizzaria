import { carrinho } from "../models/carrinho.js";
import { cliente, comentario } from "../models/cliente.js";
import { endereco } from "../models/endereco.js";
import { chavePix } from "./chave.js";
import { espera } from "./horas.js";
import { formatCoins } from "./utils.js";

function whatsapp(mensagem = null) {

    if (!mensagem) {
        window.alert("mensagem não encontrada");
        return 0
    }

    let numero = "5547997779964"
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    try {
        window.location.href = url;
        return true;
    } catch {
        window.alert("Não foi possível abrir o WhatsApp. Tente novamente.");
        return false;
    }

}

function mensagemBase(obj) {

    console.clear();

    let msg = `
Novo pedido

Pizzas: ${pizzas(obj)}


Bebidas: ${bebidas()}

------------------------------------------------
CLIENTE: ${cliente}
Forma de retirada: ${obj.retirada.metodo}`

    return msg;
}

export function mensagem(obj) {
    let msg = `
${mensagemBase(obj)}
${entrega(obj)}
${total(obj)}
${pix(obj)}
    
Observações: ${comentario}
Resumo: ${carrinho.pizzas.length} pizzas, ${carrinho.bebidas.length} bebidas`;
    /*TODO preciso implementar uma variavel  com observações do cliente*/

    // whatsapp(msg);

    return msg;
}

function bebidas() {
    let string = "";
    let lista = carrinho.bebidas;
    let quantidades = []; //valores esperados como exemplo: {nome: "", quantidade: 0}

    for (let i = 0; i < lista.length; i++) {
        if (!repetida(lista[i], quantidades)) {
            const c = contagem(lista[i]);
            quantidades.push({nome: lista[i].getNome(), quantidade: c})
            
            string = `${string}
            x${c} ${lista[i].getNome()},`
        }
    }

    return string;
}

function contagem(bebida) {//conta quantas vezes a bebida aparece no carrinho

    const nome = bebida.getNome();
    let lista = carrinho.bebidas;
    let c = 0;

    for (let i = 0; i < lista.length; i++) {
        if (nome === lista[i].getNome()) {
            c++;
        }
    }

    return c;
}

function repetida(bebida, lista) {//verifica se a bebida já existe na lista evitando duplicar o texto
    const nome = bebida.getNome();

    for (let i = 0; i < lista.length; i++) {
        if (lista[i]) {//antes de avaliar os valores, garanto que eles existem
            if (nome === lista[i].nome) {
                return true;
            }
        }
    }

    return false;

}



function entrega() {
    if (carrinho.retirada.metodo.toUpperCase() === "PESSOALMENTE") {
        return `Horário previsto para retirada: ${espera(30)}`;
    }

    return `Taxa de entrega: R$${formatCoins(carrinho.retirada.acressimo)}
Horário previsto para entrega: ${espera(40)}

Endereço:
    Rua: ${endereco.rua} ${endereco.numero}
    Bairro: ${endereco.bairro}
    cep: ${endereco.cep}
    Complemento: ${endereco.complemento}`;
}

function total(obj) {
    let string = `
------------------------------------------------
TOTAL: R$${formatCoins(obj.total)}
Forma de pagamento: ${obj.pagamento}`;

    return string;
}

function pix(obj) {

    if (obj.pagamento.toUpperCase() === "PIX") {
        return `chave pix: ${chavePix}
beneficiário: Papadelli Ltda`;
    }

    return "";
}


function pizzas(obj) {
    let lista = obj.pizzas;

    let string = ``;

    for (let i = 0; i < lista.length; i++) {
        let pizza = `
    ${lista[i].tipo} R$${formatCoins(lista[i].preco)}.
    sabores: ${espacamento(lista[i].sabores)}
    borda: ${lista[i].borda} R$${formatCoins(lista[i].precoBorda)}`;

        string = `${string}
         ${pizza}`;
    }

    return string;
}

function espacamento(lista) {
    let string = "";

    for (let i = 0; i < lista.length; i++) {
        string = `${string}${lista[i]}, `;
    }
    return string;
}
