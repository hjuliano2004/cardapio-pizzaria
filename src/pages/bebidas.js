import { root, router } from "../../script.js";
import { Bebida, listaBebidas } from "../models/bebida.js";
import { carrinho, saveState } from "../models/carrinho.js";
import { adotar, dom } from "../utils/adotar.js";
import { Proximo } from "../utils/proximo.js";
import { btn_retorno } from "../utils/Retorno.js";
import { navigate } from "../utils/Router.js";
import { formatCoins } from "../utils/utils.js";
import { btn_carrinho } from "./Carrinho.js";
import { atualizarTotal, divProximo, sectionInferior } from "./inferior.js";
import { barraSuperior, btnRetorno, div_carrinho, tipoPizza } from "./superior.js";

const classe = "bebida";
const proximo = Proximo();
const retorno = btn_retorno("/");

let lista = listaBebidas;

function bebidas() {
    const section = dom("section", "", { id: "section-bebidas" });
    const ul = ulBebidas();


    return adotar(section, [ul]);
}


export function rendBebidas() {
    root.innerText = "";
    adotar(root, [barraSuperior, bebidas(), sectionInferior]);

    btnRetorno.innerText = "";
    adotar(btnRetorno, [retorno]);

    divProximo.innerText = ""
    adotar(divProximo, [proximo]);
    atualizarTotal();
    div_carrinho.innerText = "";
    adotar(div_carrinho, [btn_carrinho])
    tipoPizza.innerText = "Bebidas"; //não vou mexer na extrutura toda do codigo pra resolver isso
}

function ulBebidas() {//lista <ul> html
    const ul = dom("ul", "", { id: "ul-bebidas" })
    for (let i = 0; i < lista.length; i++) {
        adotar(ul, [liBebida(lista[i])]);
    }

    return ul;
}

function liBebida(obj) {
    let bebida = Bebida(obj.nome, obj.vol, obj.valor, obj.imagem);

    const li = dom("li", "", { class: "bebida" });
    const div = dom("div", "", { class: "container1" });
    const div2 = acoesBebida(bebida);

    const info = infoBebida(bebida);

    // Monta container1 com imagem + informações
    adotar(div, [img(bebida.getSrc()), info]);

    return adotar(li, [div, div2]);
}

export function acoesBebida(bebida){

    const div = dom("div", "", { class: "container2" });

    const subt = dom("button", "-");
    const num = dom("p", `${conta(bebida)}`);
    const soma = dom("button", "+");

    soma.addEventListener("click", ()=>{
        carrinho.bebidas.push(bebida);
        num.innerText = conta(bebida);

        atualizarTotal();
        saveState()
    })

    subt.addEventListener("click", ()=>{

        for(let i=0;i<carrinho.bebidas.length;i++){
            if(carrinho.bebidas[i].getNome() === bebida.getNome()){
                carrinho.bebidas.splice( i, 1);
                num.innerText = conta(bebida)

                atualizarTotal();
                saveState()
                return null;
            }
        }

        
    })
    
    return adotar(div, [subt, num, soma]);
}

function conta(bebida){

    const nome = bebida.getNome();
    let lista = carrinho.bebidas;

    let quant = 0;

    for(let i =0;i<lista.length;i++){
        if(lista[i].getNome() === nome){
            quant++;
        }
    }

    return quant;
}

export function infoBebida(bebida){//cria o container de informações de cada bebida que aparecerá no <li>

    const div = dom("div", "", {class: "bebida-info"});

    // Informações da bebida
    const infoNome = dom("p", bebida.getNome(), { class: "bebida-nome" });
    const infoVol = dom("p", bebida.getVolume(), { class: "volume" });
    const infoPreco = dom("p", `R$ ${formatCoins(bebida.getPreco())}`, { class: "preco" });

    return adotar(div, [infoNome, infoVol, infoPreco]);
}


export function img(imagem) {
    const figure = dom("figure");
    return adotar(figure, [dom("img", "", { src: `${imagem}` })]);
}


proximo.addEventListener("click", ()=>{
    navigate(router, "/#carrinho")
})