import { root } from "../../script.js";
import { adotar, dom } from "../utils/adotar.js";
import { Proximo } from "../utils/proximo.js";
import { btn_retorno } from "../utils/Retorno.js";
import { atualizarTotal, divProximo, sectionInferior } from "./inferior.js";
import { barraSuperior, btnRetorno, tipoPizza } from "./superior.js";

const classe = "bebida";
const proximo = Proximo();
const retorno = btn_retorno("/");

 function bebidas(){

    const section = dom("section", "", {class: "secao-bebidas"})
    const ul = dom("ul");

    return adotar(section, [ul]);
}

export function rendBebidas(){
    root.innerText = "";
    adotar(root, [barraSuperior, bebidas(), sectionInferior]);

    btnRetorno.innerText = "";
    adotar(btnRetorno, [retorno]);

    divProximo.innerText = ""
    adotar(divProximo, [proximo]);
    atualizarTotal();

    tipoPizza.innerText = "Bebidas"; //não vou mexer na extrutura toda do codigo pra resolver isso
}